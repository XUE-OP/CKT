# 读取首页导航栏作为模板
$indexContent = Get-Content -Path "index.html" -Raw
$navRegex = [regex]'<nav class="navbar">[\s\S]*?</nav>'
$homeNav = $navRegex.Match($indexContent).Value

# 修改其他页面的导航栏
$pages = @('courses.html', 'forum.html', 'activities.html', 'resources.html', 'profile.html')

foreach ($page in $pages) {
    $content = Get-Content -Path $page -Raw
    $updatedContent = $navRegex.Replace($content, $homeNav)
    Set-Content -Path $page -Value $updatedContent -Encoding UTF8
    Write-Host "Updated navigation for $page"
}

Write-Host "All pages updated with consistent navigation!"