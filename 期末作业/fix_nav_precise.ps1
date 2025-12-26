# 读取首页导航栏作为模板
$indexContent = Get-Content -Path "index.html" -Encoding UTF8 -Raw
$navRegex = [regex]'<nav class="navbar">[\s\S]*?</nav>'
$homeNav = $navRegex.Match($indexContent).Value

# 修复所有页面的导航栏
$pages = @('courses.html', 'forum.html', 'activities.html', 'resources.html', 'profile.html')

foreach ($page in $pages) {
    $content = Get-Content -Path $page -Encoding UTF8 -Raw
    
    # 确保页面有导航栏
    if ($content -notmatch '<nav class="navbar">') {
        # 如果导航栏缺失，在body标签后添加
        $content = $content -replace '<body[^>]*>', "`$0`n$homeNav"
    } else {
        # 如果导航栏存在，替换为首页的导航栏
        $content = $navRegex.Replace($content, $homeNav)
    }
    
    # 保存修改后的内容（使用正确的编码）
    Set-Content -Path $page -Value $content -Encoding UTF8
    Write-Host "Updated navigation for $page"
}

Write-Host "All pages updated with consistent navigation!"