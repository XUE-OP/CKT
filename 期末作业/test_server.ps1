$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://localhost:8000/')
$listener.Start()
Write-Host '服务器已启动在 http://localhost:8000/'
Write-Host '访问 http://localhost:8000/resources.html 查看修改效果'

while ($true) {
    $context = $listener.GetContext()
    $response = $context.Response
    $content = [System.Text.Encoding]::UTF8.GetBytes('<!DOCTYPE html><html><head><title>Test</title></head><body><h1>服务器运行正常</h1><p>访问 /resources.html 查看修改效果</p></body></html>')
    $response.ContentType = 'text/html'
    $response.ContentLength64 = $content.Length
    $response.OutputStream.Write($content, 0, $content.Length)
    $response.Close()
}