// 资源工具箱页面交互功能

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签切换功能
    initTabSwitching();
    
    // 初始化轮播图功能
    initSlider();
    
    // 初始化分页功能
    initPagination();
    
    // 初始化资源卡片点击效果
    initResourceCards();
    
    // 初始化搜索功能
    initSearch();
});

// 标签切换功能
function initTabSwitching() {
    const levelTabs = document.querySelectorAll('[data-level]');
    const typeTabs = document.querySelectorAll('[data-type]');
    const yearTabs = document.querySelectorAll('[data-year]');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    // 当前选中的筛选条件
    let currentLevel = 'all';
    let currentType = 'all';
    let currentYear = 'all';
    
    // 级别标签点击事件
    levelTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 更新当前选中的级别
            currentLevel = this.getAttribute('data-level');
            
            // 更新标签状态
            levelTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选资源卡片
            filterResourceCards();
        });
    });
    
    // 类型标签点击事件
    typeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 更新当前选中的类型
            currentType = this.getAttribute('data-type');
            
            // 更新标签状态
            typeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选资源卡片
            filterResourceCards();
        });
    });
    
    // 年份标签点击事件
    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 更新当前选中的年份
            currentYear = this.getAttribute('data-year');
            
            // 更新标签状态
            yearTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // 筛选资源卡片
            filterResourceCards();
        });
    });
    
    // 筛选资源卡片函数
    function filterResourceCards() {
        resourceCards.forEach(card => {
            const cardLevel = card.getAttribute('data-level');
            const cardType = card.getAttribute('data-type');
            const cardYear = card.getAttribute('data-year') || 'all';
            
            // 检查是否符合筛选条件
            const levelMatch = currentLevel === 'all' || cardLevel === currentLevel;
            const typeMatch = currentType === 'all' || cardType === currentType;
            const yearMatch = currentYear === 'all' || cardYear === currentYear;
            
            // 显示或隐藏卡片
            if (levelMatch && typeMatch && yearMatch) {
                card.style.display = 'block';
                // 添加淡入动画
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                // 使用setTimeout确保动画完成后再隐藏
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// 轮播图功能
function initSlider() {
    const sliderItems = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;
    
    // 初始化显示第一个轮播项
    sliderItems.forEach((item, index) => {
        if (index === 0) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
    
    // 上一张按钮点击事件
    prevBtn.addEventListener('click', function() {
        // 隐藏当前轮播项
        sliderItems[currentSlide].style.display = 'none';
        
        // 更新当前轮播项索引
        currentSlide = (currentSlide - 1 + sliderItems.length) % sliderItems.length;
        
        // 显示新的轮播项
        sliderItems[currentSlide].style.display = 'flex';
    });
    
    // 下一张按钮点击事件
    nextBtn.addEventListener('click', function() {
        // 隐藏当前轮播项
        sliderItems[currentSlide].style.display = 'none';
        
        // 更新当前轮播项索引
        currentSlide = (currentSlide + 1) % sliderItems.length;
        
        // 显示新的轮播项
        sliderItems[currentSlide].style.display = 'flex';
    });
    
    // 自动轮播功能（可选）
    // let autoSlideInterval = setInterval(() => {
    //     nextBtn.click();
    // }, 5000);
    
    // 鼠标悬停时暂停自动轮播
    // const slider = document.querySelector('.featured-slider');
    // slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    // slider.addEventListener('mouseleave', () => {
    //     autoSlideInterval = setInterval(() => nextBtn.click(), 5000);
    // });
}

// 分页功能
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn');
    
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 如果是上一页或下一页按钮，不处理具体页面逻辑
            if (this.classList.contains('prev') || this.classList.contains('next')) {
                return;
            }
            
            // 更新按钮状态
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 这里可以添加实际的分页加载逻辑
            // 例如：loadPage(this.textContent);
            
            // 模拟页面加载效果
            const resourcesGrid = document.querySelector('.resources-grid');
            resourcesGrid.style.opacity = '0.5';
            resourcesGrid.style.pointerEvents = 'none';
            
            setTimeout(() => {
                resourcesGrid.style.opacity = '1';
                resourcesGrid.style.pointerEvents = 'auto';
            }, 500);
        });
    });
}

// 资源卡片点击效果
function initResourceCards() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('click', function() {
            // 这里可以添加资源详情页面的跳转逻辑
            // 例如：window.location.href = '/resource-details.html?id=' + this.dataset.id;
            
            // 模拟点击效果
            this.style.transform = 'translateY(-2px) scale(0.98)';
            
            setTimeout(() => {
                this.style.transform = 'translateY(0) scale(1)';
            }, 100);
            
            // 显示点击提示（可选）
            showNotification('资源详情页面开发中...');
        });
    });
}

// 搜索功能 - 增强版（实时搜索）
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    const resourceCards = document.querySelectorAll('.resource-card');
    let searchTimeout;
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', function() {
        performSearch();
    });
    
    // 输入框回车键事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 实时搜索功能
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = searchInput.value.trim().toLowerCase();
            if (searchTerm.length > 1) {
                performRealTimeSearch(searchTerm);
            } else if (searchTerm === '') {
                // 显示所有资源
                resourceCards.forEach(card => {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }
        }, 300);
    });
    
    // 执行搜索函数
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            showNotification('请输入搜索关键词');
            return;
        }
        
        performRealTimeSearch(searchTerm);
        showNotification(`搜索 "${searchTerm}" 的结果...`);
        
        // 清空搜索框
        searchInput.value = '';
    }
    
    // 实时搜索函数
    function performRealTimeSearch(searchTerm) {
        resourceCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const matches = cardTitle.includes(searchTerm);
            
            if (matches) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
}

// 显示通知函数
function showNotification(message) {
    // 检查是否已经存在通知元素
    let notification = document.querySelector('.notification');
    
    if (!notification) {
        // 创建通知元素
        notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: rgba(37, 99, 235, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            font-size: 0.95rem;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(notification);
    }
    
    // 设置通知消息
    notification.textContent = message;
    
    // 显示通知
    notification.style.transform = 'translateX(0)';
    
    // 3秒后自动隐藏通知
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
    }, 3000);
}

// 窗口大小变化时调整布局
window.addEventListener('resize', function() {
    // 可以在这里添加响应式布局调整逻辑
});

// 平滑滚动功能（可选）
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});