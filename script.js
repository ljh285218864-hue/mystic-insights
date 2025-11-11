 // ========== 导航栏：下滑时加深阴影 ==========
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  if (window.scrollY > 20) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// ========== 移动端菜单 ==========
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

  // 点菜单后自动收起
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.add('-translate-y-full', 'opacity-0');
      mobileMenu.classList.remove('translate-y-0', 'opacity-100');
      setTimeout(() => mobileMenu.classList.add('invisible'), 300);
    });
  });
}

// ========== 回到顶部按钮 ==========
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

// ========== 区块淡入动画 ==========
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
  fadeEls.forEach(el => el.classList.add('fade-in-visible'));
}

// ========== 首页评价弹幕：复制内容形成无缝滚动 ==========
const ticker = document.querySelector('.testimonial-ticker');
if (ticker) {
  const items = Array.from(ticker.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    ticker.appendChild(clone);
  });
}

// ========== 通用：获取 URL 参数 ==========
function getQueryParam(name) {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  } catch (e) {
    return null;
  }
}

// ========== 命理解读预约页逻辑 ==========
(function () {
  if (!document.body || document.body.dataset.page !== 'fortune-booking') return;

  const cards = document.querySelectorAll('[data-package-card]');
  const hiddenInput = document.getElementById('selected-package');
  const summaryName = document.getElementById('selected-package-name');
  const summaryPrice = document.getElementById('selected-package-price');
  const summaryDesc = document.getElementById('selected-package-desc');

  const questionSingle = document.getElementById('question-group-single');
  const questionThree = document.getElementById('question-group-three');
  const questionFull = document.getElementById('question-group-full');

  const packageConfig = {
    single: {
      name: 'Single Question Reading',
      price: '$XX',
      desc: 'One clear question about love, work, money, health, moving or another topic that is stuck in your mind.',
      group: 'single'
    },
    three: {
      name: '3 Question Reading',
      price: '$XX',
      desc: 'Three connected questions, for example about a relationship, career move and timing for real change.',
      group: 'three'
    },
    full: {
      name: 'Full Chart Breakdown',
      price: '$XX',
      desc: 'A complete written breakdown of your chart plus answers to your main focus areas.',
      group: 'full'
    }
  };

  function applySelection(key) {
    const config = packageConfig[key];
    if (!config) return;

    cards.forEach(card => {
      if (card.dataset.packageCard === key) {
        card.classList.add('ring-2', 'ring-primary', 'shadow-xl', 'bg-white');
      } else {
        card.classList.remove('ring-2', 'ring-primary', 'shadow-xl', 'bg-white');
      }
    });

    hiddenInput.value = key;
    summaryName.textContent = config.name;
    summaryPrice.textContent = config.price;
    summaryDesc.textContent = config.desc;

    questionSingle.classList.add('hidden');
    questionThree.classList.add('hidden');
    questionFull.classList.add('hidden');

    if (config.group === 'single') questionSingle.classList.remove('hidden');
    if (config.group === 'three') questionThree.classList.remove('hidden');
    if (config.group === 'full') questionFull.classList.remove('hidden');
  }

  cards.forEach(card => {
    card.addEventListener('click', () => applySelection(card.dataset.packageCard));
    const btn = card.querySelector('[data-select-btn]');
    if (btn) {
      btn.addEventListener('click', e => {
        e.preventDefault();
        applySelection(card.dataset.packageCard);
        const formSection = document.getElementById('booking-form-section');
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  const initial = getQueryParam('package') || 'three';
  applySelection(initial);
})();

// ========== 风水预约页逻辑 ==========
(function () {
  if (!document.body || document.body.dataset.page !== 'fengshui-booking') return;

  const cards = document.querySelectorAll('[data-fs-package-card]');
  const hiddenInput = document.getElementById('fs-selected-package');
  const summaryName = document.getElementById('fs-selected-package-name');
  const summaryPrice = document.getElementById('fs-selected-package-price');
  const summaryDesc = document.getElementById('fs-selected-package-desc');
  const mainIssueField = document.getElementById('main-issue');

  const packageConfig = {
    marriage: {
      name: 'Marriage & Bedroom Reset',
      price: '$XX',
      desc: 'Focused on your bedroom and key relationship areas. For “I want to fix my marriage” or “I want my love life to stop feeling stuck”.',
      placeholder: 'Tell me briefly what is happening in your relationship or love life right now.'
    },
    health: {
      name: 'Health & Energy Home Reset',
      price: '$XX',
      desc: 'For “I’m tired of feeling this exhausted”. We look at the whole home with a focus on sleep and long-term energy.',
      placeholder: 'Tell me how your body and energy feel at home. Sleep, stress, and what feels heavy.'
    },
    money: {
      name: 'Money & Career Space Upgrade',
      price: '$XX',
      desc: 'For “I work hard but money still feels unstable”. We focus on your workspace and money areas at home.',
      placeholder: 'Tell me about your work, income and what feels unstable or stuck right now.'
    }
  };

  function applySelection(key) {
    const config = packageConfig[key];
    if (!config) return;

    cards.forEach(card => {
      if (card.dataset.fsPackageCard === key) {
        card.classList.add('ring-2', 'ring-primary', 'shadow-xl', 'bg-white');
      } else {
        card.classList.remove('ring-2', 'ring-primary', 'shadow-xl', 'bg-white');
      }
    });

    hiddenInput.value = key;
    summaryName.textContent = config.name;
    summaryPrice.textContent = config.price;
    summaryDesc.textContent = config.desc;

    if (mainIssueField && config.placeholder) {
      mainIssueField.placeholder = config.placeholder;
    }
  }

  cards.forEach(card => {
    card.addEventListener('click', () => applySelection(card.dataset.fsPackageCard));
    const btn = card.querySelector('[data-select-btn]');
    if (btn) {
      btn.addEventListener('click', e => {
        e.preventDefault();
        applySelection(card.dataset.fsPackageCard);
        const formSection = document.getElementById('fs-booking-form-section');
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

  const initial = getQueryParam('package') || 'marriage';
  applySelection(initial);
})();
