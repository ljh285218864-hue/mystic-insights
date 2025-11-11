document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (navbar) {
      if (scrollY > 40) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    if (backToTop) {
      if (scrollY > 300) {
        backToTop.classList.remove('opacity-0', 'invisible', 'translate-y-4');
      } else {
        backToTop.classList.add('opacity-0', 'invisible', 'translate-y-4');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('invisible');
      if (isHidden) {
        mobileMenu.classList.remove('invisible', 'opacity-0', '-translate-y-full');
        mobileMenu.classList.add('opacity-100', 'translate-y-0');
      } else {
        mobileMenu.classList.add('opacity-0', '-translate-y-full');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
        setTimeout(() => {
          mobileMenu.classList.add('invisible');
        }, 250);
      }
    });
  }
});