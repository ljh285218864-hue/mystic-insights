 document.addEventListener('DOMContentLoaded', function () {
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  const toggleNavbar = () => {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  toggleNavbar();
  window.addEventListener('scroll', toggleNavbar);

  // ===== MOBILE MENU =====
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  let menuOpen = false;

  if (mobileMenuButton && mobileMenu) {
    const openMenu = () => {
      mobileMenu.classList.remove('opacity-0', 'invisible', '-translate-y-full');
      mobileMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
      menuOpen = true;
    };

    const closeMenu = () => {
      mobileMenu.classList.add('opacity-0', 'invisible', '-translate-y-full');
      mobileMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
      menuOpen = false;
    };

    mobileMenuButton.addEventListener('click', () => {
      if (menuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (menuOpen) closeMenu();
      });
    });
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.add('opacity-0', 'invisible');
        backToTopButton.classList.remove('opacity-100', 'visible');
      }
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ===== FADE-IN ON SCROLL =====
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      fadeEls.forEach((el) => observer.observe(el));
    } else {
      fadeEls.forEach((el) => el.classList.add('visible'));
    }
  }

  // ===== TESTIMONIAL SLIDER (首页评价轮播) =====
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.testimonial-dot');

    if (slides.length > 0 && dots.length === slides.length) {
      let current = 0;
      let timer = null;

      const showSlide = (index) => {
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
        current = index;
      };

      const nextSlide = () => {
        const nextIndex = (current + 1) % slides.length;
        showSlide(nextIndex);
      };

      // 自动轮播：每 6 秒切换一条
      const startAutoPlay = () => {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 6000);
      };

      // 小圆点点击切换
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showSlide(index);
          startAutoPlay(); // 点击之后重新计时
        });
      });

      // 初始化
      showSlide(0);
      startAutoPlay();
    }
  }
});
