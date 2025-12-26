// 完整的DOMContentLoaded事件监听器
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeApp();
    });
} else {
    initializeApp();
}

function initializeApp() {
    // 首页登录/注册模态框功能
    const loginModal = document.getElementById('loginModal'); // 改回正确的ID
    const loginRegisterBtn = document.querySelector('.btn-login-register');
    const userAvatar = document.querySelector('.user-avatar');
    const modalCloseBtn = document.querySelector('#loginModal .close'); // 改回正确的关闭按钮选择器
    const loginMethodBtns = document.querySelectorAll('.btn-method');
    const phoneLoginForm = document.getElementById('phoneLoginForm');
    const emailLoginForm = document.getElementById('emailLoginForm');
    const studentLoginForm = document.getElementById('studentLoginForm');
    const loginMethods = document.getElementById('loginMethods');
    const togglePasswordLogin = document.getElementById('togglePasswordLogin');
    const toggleVerificationLogin = document.getElementById('toggleVerificationLogin');
    const verificationLogin = document.getElementById('verificationLogin');
    const passwordLogin = document.getElementById('passwordLogin');
    
    // 显示登录方式选择
    function showLoginMethods() {
        loginMethods.style.display = 'block';
        phoneLoginForm.style.display = 'none';
        emailLoginForm.style.display = 'none';
        studentLoginForm.style.display = 'none';
    }
    
    // 切换到手机号登录
    if (loginMethodBtns) {
        loginMethodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const method = this.getAttribute('data-method');
                loginMethods.style.display = 'none';
                
                // 显示对应的登录表单
                if (method === 'phone') {
                    phoneLoginForm.style.display = 'block';
                } else if (method === 'email') {
                    emailLoginForm.style.display = 'block';
                } else if (method === 'student') {
                    studentLoginForm.style.display = 'block';
                }
            });
        });
    }
    
    // 切换验证码/密码登录
    if (togglePasswordLogin) {
        togglePasswordLogin.addEventListener('click', function(e) {
            e.preventDefault();
            verificationLogin.style.display = 'none';
            passwordLogin.style.display = 'block';
            togglePasswordLogin.style.display = 'none';
            toggleVerificationLogin.style.display = 'inline';
        });
    }
    
    if (toggleVerificationLogin) {
        toggleVerificationLogin.addEventListener('click', function(e) {
            e.preventDefault();
            passwordLogin.style.display = 'none';
            verificationLogin.style.display = 'block';
            toggleVerificationLogin.style.display = 'none';
            togglePasswordLogin.style.display = 'inline';
        });
    }
    
    // 获取验证码按钮点击事件
    const sendCodeBtn = document.getElementById('sendCode');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', function() {
            // 这里可以添加发送验证码的逻辑
            let countdown = 60;
            sendCodeBtn.disabled = true;
            sendCodeBtn.textContent = `${countdown}秒后重试`;
            
            const timer = setInterval(() => {
                countdown--;
                if (countdown <= 0) {
                    clearInterval(timer);
                    sendCodeBtn.disabled = false;
                    sendCodeBtn.textContent = '获取验证码';
                } else {
                    sendCodeBtn.textContent = `${countdown}秒后重试`;
                }
            }, 1000);
            
            // 模拟发送验证码
            console.log('发送验证码');
            alert('验证码已发送，请注意查收');
        });
    }
    
    // 表单提交处理
    const loginForms = [phoneLoginForm, emailLoginForm, studentLoginForm];
    loginForms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 简单的表单验证
                const inputs = this.querySelectorAll('input[required]');
                let isValid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        // 添加错误样式
                        input.style.borderColor = '#ef4444';
                        setTimeout(() => {
                            input.style.borderColor = '';
                        }, 2000);
                    }
                });
                
                if (!isValid) {
                    alert('请填写完整的登录信息');
                    return;
                }
                
                // 模拟登录请求
                console.log('登录成功');
                
                // 这里可以添加实际的登录API调用
                alert('登录成功！');
                if (loginModal) {
                    loginModal.classList.remove('show'); // 使用正确的方式隐藏模态框
                }
            });
        }
    });
    
    // 点击登录/注册按钮打开模态框
    if (loginRegisterBtn) {
        loginRegisterBtn.addEventListener('click', function() {
            if (loginModal) {
                loginModal.classList.add('show'); // 使用正确的方式显示模态框
                // 默认显示登录方式选择
                showLoginMethods();
            }
        });
    }
    
    // 点击用户头像也打开相同的登录模态框
    if (userAvatar) {
        userAvatar.addEventListener('click', function() {
            if (loginModal) {
                loginModal.classList.add('show'); // 使用正确的方式显示模态框
                // 默认显示登录方式选择
                showLoginMethods();
            }
        });
    }
    
    // 关闭模态框
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function() {
            if (loginModal) {
                loginModal.classList.remove('show'); // 使用正确的方式隐藏模态框
            }
        });
    }
    
    // 点击模态框外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            loginModal.classList.remove('show'); // 使用正确的方式隐藏模态框
        }
    });
    
    // 初始化轮播图
    initBannerCarousel();
}

// 轮播图初始化函数
function initBannerCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const bannerCarousel = document.querySelector('.banner-carousel');
    let currentSlide = 0;
    const slideInterval = 5000; // 5秒切换一次
    let autoPlayInterval;
    
    // 检查元素是否存在
    if (!slides || slides.length === 0) {
        console.error('轮播图幻灯片不存在');
        return;
    }
    if (!indicators || indicators.length === 0) {
        console.error('轮播图指示器不存在');
        return;
    }
    
    // 显示指定幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            indicators[i].classList.remove('active');
        });
        
        // 显示当前幻灯片
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }
    
    // 下一张幻灯片
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // 上一张幻灯片
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // 开始自动播放
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, slideInterval);
    }
    
    // 停止自动播放
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });
    
    // 左右箭头点击事件
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });
    }
    
    // 鼠标悬停时暂停自动播放
    if (bannerCarousel) {
        bannerCarousel.addEventListener('mouseenter', stopAutoPlay);
        bannerCarousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // 为轮播图添加点击事件，点击跳转到课程中心
    if (bannerCarousel) {
        bannerCarousel.addEventListener('click', (e) => {
            // 检查点击的目标是否是控制按钮或指示器，如果是则不执行跳转
            const target = e.target;
            if (!target.classList.contains('carousel-prev') && !target.classList.contains('carousel-next') && !target.classList.contains('indicator')) {
                window.location.href = 'courses.html';
            }
        });
    }
    
    // 开始自动播放
    startAutoPlay();
    console.log('轮播图初始化成功！');
    console.log('轮播图点击事件已添加，点击将跳转到课程中心！');
}