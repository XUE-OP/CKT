# 设置工作目录
$webRoot = "c:/Users/20168/Desktop/1/1"
Set-Location $webRoot

# 创建HttpListener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()

Write-Host "Web server started at http://localhost:8080/"
Write-Host "Press Ctrl+C to stop the server"

# 处理请求
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    # 获取请求的文件路径
    $filePath = Join-Path $webRoot $request.Url.LocalPath
    if ($filePath -eq $webRoot -or $filePath -eq "$webRoot/") {
        $filePath = Join-Path $webRoot "index.html"
    }

    # 检查文件是否存在
    if (Test-Path $filePath -PathType Leaf) {
        # 获取文件扩展名并设置MIME类型
        $extension = [System.IO.Path]::GetExtension($filePath)
        $contentType = "text/html"
        switch ($extension) {
            ".css"  { $contentType = "text/css" }
            ".js"   { $contentType = "application/javascript" }
            ".png"  { $contentType = "image/png" }
            ".jpg"  { $contentType = "image/jpeg" }
            ".gif"  { $contentType = "image/gif" }
            ".ico"  { $contentType = "image/x-icon" }
        }

        # 读取文件内容并发送响应
        $buffer = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $buffer.Length
        $response.ContentType = $contentType
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } else {
        # 文件不存在，返回404
        $response.StatusCode = 404
        $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    }

    $response.Close()
}