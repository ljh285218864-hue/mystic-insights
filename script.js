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

  // ===== TESTIMONIAL SLIDER（如果页面上不存在 .testimonial-slider 就不会生效） =====
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.testimonial-dot');

    if (slides.length > 0 && dots.length === slides.length) {
      let current = 0;
      let timer = null;

      const showSlide = (index) => {
        slides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        current = index;
      };

      const nextSlide = () => {
        const nextIndex = (current + 1) % slides.length;
        showSlide(nextIndex);
      };

      const startAutoPlay = () => {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 6000);
      };

      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
          showSlide(index);
          startAutoPlay();
        });
      });

      showSlide(0);
      startAutoPlay();
    }
  }

  // ===== PACKAGE CARD CLICK (fortune 页面) =====
  const packageCards = document.querySelectorAll('.package-card[data-package]');
  if (packageCards.length > 0) {
    packageCards.forEach((card) => {
      card.addEventListener('click', () => {
        const pkg = card.getAttribute('data-package') || 'single';
        // 跳转到预约页面，并带上 ?package=single/three/full
        window.location.href = 'fortune-booking.html?package=' + encodeURIComponent(pkg);
      });
    });
  }
});
