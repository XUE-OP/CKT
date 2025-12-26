const fs = require('fs');
const path = require('path');

// 读取首页导航栏作为模板
const indexContent = fs.readFileSync('index.html', 'utf8');
const navRegex = /<nav class="navbar">[\s\S]*?<\/nav>/;
const homeNav = navRegex.exec(indexContent)[0];

// 修改其他页面的导航栏
const pages = ['courses.html', 'forum.html', 'activities.html', 'resources.html', 'profile.html'];

pages.forEach(page => {
    try {
        const content = fs.readFileSync(page, 'utf8');
        const updatedContent = content.replace(navRegex, homeNav);
        fs.writeFileSync(page, updatedContent, 'utf8');
        console.log(`Updated navigation for ${page}`);
    } catch (error) {
        console.error(`Error updating ${page}:`, error);
    }
});

console.log('All pages updated with consistent navigation!');