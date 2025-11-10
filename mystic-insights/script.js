// 导航栏滚动效果
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-dark/90', 'bg-blur', 'shadow-lg');
    navbar.classList.remove('bg-transparent');
  } else {
    navbar.classList.add('bg-transparent');
    navbar.classList.remove('bg-dark/90', 'bg-blur', 'shadow-lg');
  }
});

// 移动端菜单
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
let menuOpen = false;

mobileMenuButton.addEventListener('click', () => {
  if (menuOpen) {
    mobileMenu.classList.add('-translate-y-full', 'opacity-0', 'invisible');
    mobileMenuButton.innerHTML = '<i class="fa fa-bars"></i>';
  } else {
    mobileMenu.classList.remove('-translate-y-full', 'opacity-0', 'invisible');
    mobileMenuButton.innerHTML = '<i class="fa fa-times"></i>';
  }
  menuOpen = !menuOpen;
});

// 滚动动画
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
  fadeInObserver.observe(element);
});

// 回到顶部按钮
const backToTopButton = document.getElementById('back-to-top');

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