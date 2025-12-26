# 简单的HTTP服务器脚本
$webRoot = Resolve-Path -Path "." -ErrorAction Stop
Set-Location $webRoot

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()

Write-Host "Server started at http://localhost:8080/"
Write-Host "Press Ctrl+C to stop server"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $filePath = Join-Path $webRoot $request.Url.LocalPath
        
        # 默认访问index.html
        if ($filePath -eq $webRoot -or $filePath -eq "$webRoot/") {
            $filePath = Join-Path $webRoot "index.html"
        }
        
        # 设置MIME类型映射
        $mimeTypes = @{
            ".html" = "text/html"
            ".css"  = "text/css"
            ".js"   = "application/javascript"
            ".png"  = "image/png"
            ".jpg"  = "image/jpeg"
            ".gif"  = "image/gif"
            ".ico"  = "image/x-icon"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $extension = [System.IO.Path]::GetExtension($filePath)
            $contentType = $mimeTypes[$extension] -or "text/plain"
            
            $response.ContentType = $contentType
            $buffer = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Dispose()
    Write-Host "Server stopped"
}