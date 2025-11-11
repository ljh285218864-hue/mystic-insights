 // 导航栏：滚动时切换样式
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled', 'bg-blur');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.remove('navbar-scrolled', 'bg-blur');
    navbar.classList.add('bg-transparent');
  }
});

// 移动端菜单
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  let menuOpen = false;

  mobileMenuButton.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
      mobileMenu.classList.remove('invisible', '-translate-y-full', 'opacity-0');
      mobileMenu.classList.add('translate-y-0', 'opacity-100');
    } else {
      mobileMenu.classList.add('-translate-y-full', 'opacity-0');
      mobileMenu.classList.remove('translate-y-0', 'opacity-100');
      setTimeout(() => mobileMenu.classList.add('invisible'), 300);
    }
  });

  // 点击菜单项后自动收起
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.add('-translate-y-full', 'opacity-0');
      mobileMenu.classList.remove('translate-y-0', 'opacity-100');
      setTimeout(() => mobileMenu.classList.add('invisible'), 300);
    });
  });
}

// 区块淡入动画（fade-in）
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach(el => observer.observe(el));
} else {
  // 老浏览器直接全部显示
  fadeEls.forEach(el => el.classList.add('fade-in-visible'));
}

// 回到顶部按钮
const backToTopButton = document.getElementById('back-to-top');

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.remove('opacity-0', 'invisible');
      backToTopButton.classList.add('opacity-100', 'visible');
    } else {
      backToTopButton.classList.add('opacity-0', 'invisible');
      backToTopButton.classList.remove('opacity-100', 'visible');
    }
  });

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 首页评价弹幕：复制一遍内容，让它无缝滚动
const ticker = document.querySelector('.testimonial-ticker');
if (ticker) {
  const items = Array.from(ticker.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    ticker.appendChild(clone);
  });
}
