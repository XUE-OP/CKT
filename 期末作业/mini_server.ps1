# 极简HTTP服务器
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8000/")
$listener.Start()

Write-Host "服务器正在运行: http://localhost:8000"
Write-Host "按 Ctrl+C 停止服务器"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
        # 获取请求的文件路径
        $filePath = $request.Url.LocalPath
        if ($filePath -eq "/") {
            $filePath = "/index.html"
        }
        $filePath = Join-Path -Path (Get-Location) -ChildPath $filePath.Substring(1)

        # 检查文件是否存在
        if (Test-Path -Path $filePath -PathType Leaf) {
            # 读取文件内容
            $content = Get-Content -Path $filePath -Raw
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)

            # 设置响应头
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        } else {
            # 404 响应
            $response.StatusCode = 404
            $content = "404 Not Found"
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
    } catch {
        # 500 响应
        $response.StatusCode = 500
        $content = "500 Internal Server Error"
        $buffer = [System.Text.Encoding]::UTF8.GetBytes($content)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
    } finally {
        $response.Close()
    }
}

# 清理资源
$listener.Stop()
$listener.Close()