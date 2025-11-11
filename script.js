document.addEventListener('DOMContentLoaded', function () {
  // ========== 1. 配置区：这里要改成你的真实信息 ==========
  const CONFIG = {
    // 把 1234567890 换成你的 WhatsApp 手机号（只数字，含国家区号，不带 +）
    // 例如 +1 234 567 8901 写成 "12345678901"
    whatsappNumber: '1234567890',

    // 命理三个套餐的付款链接（用户在网页上付款）
    fortunePayments: {
      single: 'https://your-payment-link-single.com',  // 单个问题
      three:  'https://your-payment-link-three.com',   // 三个问题（推荐）
      full:   'https://your-payment-link-full.com'     // 完整解析
    },

    // 风水三个套餐的付款链接
    fengshuiPayments: {
      marriage: 'https://your-payment-link-marriage.com', // 婚姻卧室重置
      health:   'https://your-payment-link-health.com',   // 健康能量
      money:    'https://your-payment-link-money.com'     // 金钱事业
    }
  };
  // ====================================================

  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const mobileBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const pageType = document.body.dataset.page || '';

  // ========== 2. 导航栏滚动效果 + 回到顶部 ==========
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

  // ========== 3. 手机端菜单 ==========
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

  // ========== 4. 首页 contact 表单基础校验 ==========
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const form = contactSection.querySelector('form');
    if (form) {
      form.addEventListener('submit', function (e) {
        // 暂时阻止真正提交（还没有后端）
        e.preventDefault();

        const nameInput = form.querySelector('#name');
        const emailInput = form.querySelector('#email');
        const messageInput = form.querySelector('#message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !email || !message) {
          alert('Please fill in your name, email and a short message so I know how to help.');
          return;
        }

        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) {
          alert('Please enter a valid email address.');
          return;
        }

        alert('Thank you for your message. This contact form is a preview – until online forms are fully set up, please also contact me directly by WhatsApp or email.');
      });
    }
  }

  // ========== 5. 命理预定页逻辑（fortune-booking.html） ==========
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

      // 视觉选中效果
      cards.forEach(card => {
        const cKey = card.getAttribute('data-package-card');
        if (cKey === key) {
          card.classList.add('ring-2', 'ring-primary');
        } else {
          card.classList.remove('ring-2', 'ring-primary');
        }
      });

      // 不同问题区域显示
      if (qSingle && qThree && qFull) {
        qSingle.classList.add('hidden');
        qThree.classList.add('hidden');
        qFull.classList.add('hidden');
        if (key === 'single') qSingle.classList.remove('hidden');
        if (key === 'three') qThree.classList.remove('hidden');
        if (key === 'full')  qFull.classList.remove('hidden');
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

      // 更新付款链接
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

    // 根据 URL 参数 ?package=single/three/full 预选，默认 three
    const urlParams = new URLSearchParams(window.location.search);
    const initial = urlParams.get('package') || 'three';
    selectPackage(initial);

    function buildFortuneMessage() {
      const pkg = hiddenInput ? hiddenInput.value : 'three';
      const name = document.getElementById('fr-name')?.value.trim() || '';
      const email = document.getElementById('fr-email')?.value.trim() || '';
      const wa = document.getElementById('fr-whatsapp')?.value.trim() || '';
      const tz = document.getElementById('fr-timezone')?.value.trim() || '';
      const dob = document.getElementById('fr-dob')?.value.trim() || '';
      const tob = document.getElementById('fr-birthtime')?.value.trim() || '';
      const place = document.getElementById('fr-birthplace')?.value.trim() || '';
      const q1 = document.getElementById('fr-q1')?.value.trim() || '';
      const q2 = document.getElementById('fr-q2')?.value.trim() || '';
      const q3 = document.getElementById('fr-q3')?.value.trim() || '';
      const qSingleText = document.getElementById('fr-single-q')?.value.trim() || '';
      const qFullText = document.getElementById('fr-full-focus')?.value.trim() || '';
      const notes = document.getElementById('fr-notes')?.value.trim() || '';

      // 基础必填校验（前端）
      if (!name || !email || !wa) {
        alert('Please fill in your name, email and your own WhatsApp number.');
        return null;
      }
      if (!dob) {
        alert('Please add your date of birth so I can read your chart.');
        return null;
      }
      if (pkg === 'single' && !qSingleText) {
        alert('Please write your question.');
        return null;
      }
      if (pkg === 'three' && (!q1 || !q2 || !q3)) {
        alert('Please write all 3 questions, even if short.');
        return null;
      }
      if (pkg === 'full' && !qFullText) {
        alert('Please write the main areas you want the full breakdown to focus on.');
        return null;
      }

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
        if (!text) return; // 校验不通过
        const phone = CONFIG.whatsappNumber;
        const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      });
    }
  }

  // ========== 6. 风水预定页逻辑（feng-shui-booking.html） ==========
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
      const name = document.getElementById('fs-name')?.value.trim() || '';
      const email = document.getElementById('fs-email')?.value.trim() || '';
      const wa = document.getElementById('fs-whatsapp')?.value.trim() || '';
      const tz = document.getElementById('fs-timezone')?.value.trim() || '';
      const type = document.getElementById('fs-space-type')?.value.trim() || '';
      const duration = document.getElementById('fs-duration')?.value.trim() || '';
      const own = document.getElementById('fs-own')?.value.trim() || '';
      const issue = mainIssue?.value.trim() || '';
      const layout = document.getElementById('fs-layout')?.value.trim() || '';
      const notes = document.getElementById('fs-notes')?.value.trim() || '';

      if (!name || !email || !wa) {
        alert('Please fill in your name, email and your own WhatsApp number.');
        return null;
      }
      if (!issue) {
        alert('Please tell me briefly what feels wrong right now.');
        return null;
      }

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
        if (!text) return;
        const phone = CONFIG.whatsappNumber;
        const url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      });
    }
  }
});