 // Global front-end logic for navbar, mobile menu, back-to-top and booking pages
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (navbar) {
      if (scrollY > 20) {
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

  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
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

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ====== CONFIG：在这里改成你自己的 WhatsApp 和付款链接 ======
  const CONFIG = {
    // 把 1234567890 换成你的 WhatsApp 手机号（只数字，带国家代码，不要加 +）
    // 例如：+1 234 567 8901  写成 "12345678901"
    whatsappNumber: '1234567890',

    // 命理三个套餐的付款链接（用户会在网页点击付款）
    fortunePayments: {
      single: 'https://your-payment-link-single.com',  // 单个问题
      three: 'https://your-payment-link-three.com',    // 三个问题（推荐）
      full:  'https://your-payment-link-full.com'      // 完整解析
    },

    // 风水三个套餐的付款链接
    fengshuiPayments: {
      marriage: 'https://your-payment-link-marriage.com',
      health:   'https://your-payment-link-health.com',
      money:    'https://your-payment-link-money.com'
    }
  };
  // ====== CONFIG 结束 ======

  const pageType = document.body.dataset.page;

  // ----------------- 命理：预定页面逻辑 -----------------
  if (pageType === 'fortune-booking') {
    const cards = document.querySelectorAll('[data-package-card]');
    const hiddenInput = document.getElementById('selected-package');
    const nameEl = document.getElementById('selected-package-name');
    const priceEl = document.getElementById('selected-package-price');
    const descEl = document.getElementById('selected-package-desc');
    const qSingle = document.getElementById('question-group-single');
    const qThree = document.getElementById('question-group-three');
    const qFull = document.getElementById('question-group-full');
    const payBtn = document.getElementById('fortune-pay-btn');
    const waBtn = document.getElementById('fortune-wa-btn');

    function selectPackage(key) {
      if (!hiddenInput) return;
      hiddenInput.value = key;

      // 视觉选择效果
      cards.forEach(card => {
        const cKey = card.getAttribute('data-package-card');
        if (cKey === key) {
          card.classList.add('ring-2', 'ring-primary');
        } else {
          card.classList.remove('ring-2', 'ring-primary');
        }
      });

      // 控制不同问题区域显示
      if (qSingle && qThree && qFull) {
        qSingle.classList.add('hidden');
        qThree.classList.add('hidden');
        qFull.classList.add('hidden');
        if (key === 'single') qSingle.classList.remove('hidden');
        if (key === 'three') qThree.classList.remove('hidden');
        if (key === 'full') qFull.classList.remove('hidden');
      }

      // 右侧“已选套餐”信息
      if (nameEl && priceEl && descEl) {
        const selCard = document.querySelector('[data-package-card="' + key + '"]');
        if (selCard) {
          const textName = selCard.querySelector('h3')?.textContent?.trim();
          const textPrice = selCard.querySelector('p.text-primary')?.textContent?.trim();
          const textDesc = selCard.querySelector('p.text-xs.text-gray-600')?.textContent?.trim();
          if (textName) nameEl.textContent = textName;
          if (textPrice) priceEl.textContent = textPrice;
          if (textDesc) descEl.textContent = textDesc;
        }
      }

      // 根据套餐更新付款链接
      if (payBtn && CONFIG.fortunePayments[key]) {
        payBtn.href = CONFIG.fortunePayments[key];
      }
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-package-card');
        selectPackage(key);
      });
      const btn = card.querySelector('[data-select-btn]');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const key = card.getAttribute('data-package-card');
          selectPackage(key);
        });
      }
    });

    // 根据 URL ?package=single / three / full 初始选中，默认 three
    const urlParams = new URLSearchParams(window.location.search);
    const initial = urlParams.get('package') || 'three';
    selectPackage(initial);

    function buildFortuneMessage() {
      const pkg = hiddenInput ? hiddenInput.value : 'three';
      const name = document.getElementById('fr-name')?.value || '';
      const email = document.getElementById('fr-email')?.value || '';
      const wa = document.getElementById('fr-whatsapp')?.value || '';
      const tz = document.getElementById('fr-timezone')?.value || '';
      const dob = document.getElementById('fr-dob')?.value || '';
      const tob = document.getElementById('fr-birthtime')?.value || '';
      const place = document.getElementById('fr-birthplace')?.value || '';
      const q1 = document.getElementById('fr-q1')?.value || '';
      const q2 = document.getElementById('fr-q2')?.value || '';
      const q3 = document.getElementById('fr-q3')?.value || '';
      const qSingleText = document.getElementById('fr-single-q')?.value || '';
      const qFullText = document.getElementById('fr-full-focus')?.value || '';
      const notes = document.getElementById('fr-notes')?.value || '';

      let title = 'Destiny reading booking';
      if (pkg === 'single') title += ' (Single Question)';
      if (pkg === 'three') title += ' (3 Questions)';
      if (pkg === 'full')  title += ' (Full Chart Breakdown)';

      let msg = title + '\n\n';

      msg += 'Name: ' + name + '\n';
      msg += 'Email: ' + email + '\n';
      msg += 'WhatsApp (client): ' + wa + '\n';
      msg += 'Time zone / city: ' + tz + '\n\n';

      msg += 'Date of birth: ' + dob + '\n';
      msg += 'Time of birth: ' + tob + '\n';
      msg += 'City / country of birth: ' + place + '\n\n';

      if (pkg === 'single') {
        msg += 'Question:\n' + qSingleText + '\n\n';
      } else if (pkg === 'three') {
        msg += 'Question 1:\n' + q1 + '\n\n';
        msg += 'Question 2:\n' + q2 + '\n\n';
        msg += 'Question 3:\n' + q3 + '\n\n';
      } else if (pkg === 'full') {
        msg += 'Main focus areas:\n' + qFullText + '\n\n';
      }

      if (notes) {
        msg += 'Extra notes:\n' + notes + '\n\n';
      }

      msg += 'Package key: ' + pkg;

      return msg;
    }

    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const text = buildFortuneMessage();
        const phone = CONFIG.whatsappNumber;
        const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      });
    }
  }

  // ----------------- 风水：预定页面逻辑 -----------------
  if (pageType === 'fengshui-booking') {
    const cards = document.querySelectorAll('[data-fs-package-card]');
    const hiddenInput = document.getElementById('fs-selected-package');
    const nameEl = document.getElementById('fs-selected-package-name');
    const priceEl = document.getElementById('fs-selected-package-price');
    const descEl = document.getElementById('fs-selected-package-desc');
    const mainIssue = document.getElementById('main-issue');
    const payBtn = document.getElementById('fs-pay-btn');
    const waBtn = document.getElementById('fs-wa-btn');

    function selectFsPackage(key) {
      if (!hiddenInput) return;
      hiddenInput.value = key;

      cards.forEach(card => {
        const cKey = card.getAttribute('data-fs-package-card');
        if (cKey === key) {
          card.classList.add('ring-2', 'ring-primary');
        } else {
          card.classList.remove('ring-2', 'ring-primary');
        }
      });

      if (nameEl && priceEl && descEl) {
        const selCard = document.querySelector('[data-fs-package-card="' + key + '"]');
        if (selCard) {
          const textName = selCard.querySelector('h3')?.textContent?.trim();
          const textPrice = selCard.querySelector('p.text-primary')?.textContent?.trim();
          const textDesc = selCard.querySelector('p.text-xs.text-gray-600')?.textContent?.trim();
          if (textName) nameEl.textContent = textName;
          if (textPrice) priceEl.textContent = textPrice;
          if (textDesc) descEl.textContent = textDesc;
        }
      }

      if (mainIssue) {
        if (key === 'marriage') {
          mainIssue.placeholder = 'Tell me briefly what is happening in your marriage or love life right now.';
        } else if (key === 'health') {
          mainIssue.placeholder = 'Tell me briefly how your body and energy feel at home. Where do you feel most tired or restless?';
        } else if (key === 'money') {
          mainIssue.placeholder = 'Tell me briefly about your work and money situation, and how your workspace / home feels around it.';
        }
      }

      if (payBtn && CONFIG.fengshuiPayments[key]) {
        payBtn.href = CONFIG.fengshuiPayments[key];
      }
    }

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-fs-package-card');
        selectFsPackage(key);
      });
      const btn = card.querySelector('[data-select-btn]');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const key = card.getAttribute('data-fs-package-card');
          selectFsPackage(key);
        });
      }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initial = urlParams.get('package') || 'health';
    selectFsPackage(initial);

    function buildFsMessage() {
      const pkg = hiddenInput ? hiddenInput.value : 'health';
      const name = document.getElementById('fs-name')?.value || '';
      const email = document.getElementById('fs-email')?.value || '';
      const wa = document.getElementById('fs-whatsapp')?.value || '';
      const tz = document.getElementById('fs-timezone')?.value || '';
      const type = document.getElementById('fs-space-type')?.value || '';
      const duration = document.getElementById('fs-duration')?.value || '';
      const own = document.getElementById('fs-own')?.value || '';
      const issue = mainIssue?.value || '';
      const layout = document.getElementById('fs-layout')?.value || '';
      const notes = document.getElementById('fs-notes')?.value || '';

      let title = 'Feng Shui booking';
      if (pkg === 'marriage') title += ' (Marriage & Bedroom Reset)';
      if (pkg === 'health')   title += ' (Health & Energy Home Reset)';
      if (pkg === 'money')    title += ' (Money & Career Space Upgrade)';

      let msg = title + '\n\n';

      msg += 'Name: ' + name + '\n';
      msg += 'Email: ' + email + '\n';
      msg += 'WhatsApp (client): ' + wa + '\n';
      msg += 'City & time zone: ' + tz + '\n\n';

      msg += 'Space type: ' + type + '\n';
      msg += 'How long in this space: ' + duration + '\n';
      msg += 'Rent/own: ' + own + '\n\n';

      msg += 'Main issue:\n' + issue + '\n\n';
      msg += 'Layout notes:\n' + layout + '\n\n';

      if (notes) {
        msg += 'Extra notes:\n' + notes + '\n\n';
      }

      msg += 'Program key: ' + pkg;

      return msg;
    }

    if (waBtn) {
      waBtn.addEventListener('click', () => {
        const text = buildFsMessage();
        const phone = CONFIG.whatsappNumber;
        const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      });
    }
  }
});
