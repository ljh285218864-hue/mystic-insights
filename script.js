 /* ========== Nav basic mobile toggle ========== */
(function () {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', () => {
      const open = !menu.classList.contains('invisible');
      if (open) {
        menu.classList.add('-translate-y-full', 'opacity-0', 'invisible');
      } else {
        menu.classList.remove('-translate-y-full', 'opacity-0', 'invisible');
      }
    });
  }

  // 背景是浅色时，导航自动加白底和深色文字（简单判断滚动）
  const navbar = document.getElementById('navbar');
  const brandText = document.querySelector('.brand-text');
  const navLinks = document.querySelectorAll('.nav-link');
  const navCta = document.querySelector('.nav-cta');
  function restyleNav(solid) {
    if (!navbar) return;
    if (solid) {
      navbar.classList.remove('bg-transparent');
      navbar.classList.add('bg-white/95', 'backdrop-blur');
      brandText && (brandText.style.color = '#0f172a');
      navLinks.forEach(a => a.classList.add('!text-slate-800'));
      navCta && navCta.classList.add('!text-white', '!bg-secondary');
    } else {
      navbar.classList.add('bg-transparent');
      navbar.classList.remove('bg-white/95', 'backdrop-blur');
      brandText && (brandText.style.color = '#fff');
      navLinks.forEach(a => a.classList.remove('!text-slate-800'));
      navCta && navCta.classList.remove('!bg-secondary');
    }
  }
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    restyleNav(y > 40);
    lastY = y;
  });
  // 初始
  restyleNav(window.scrollY > 40);
})();

/* ========== Card whole clickable ========== */
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', (e) => {
    // 避免重复点击按钮时再次触发
    if (e.target.closest('a')) return;
    const href = card.getAttribute('data-link');
    if (href) window.location.href = href;
  });
});

/* ========== Helpers ========== */
function qs(p) {
  const url = new URL(window.location.href);
  return url.searchParams.get(p);
}
function enc(s) { return encodeURIComponent(s || ''); }

/* ========== Destiny booking ========== */
(function destinyBooking() {
  const root = document.getElementById('fortune-booking');
  if (!root) return;

  const pkg = (qs('package') || 'single').toLowerCase(); // single | three | full
  const questionsWrap = document.getElementById('dr_questions');
  const hint = document.getElementById('dr_pkg_hint');

  const map = {
    single: { count: 1, price: 79, btn: 'pay_single', label: 'Single question' },
    three:  { count: 3, price: 149, btn: 'pay_three', label: '3 questions' },
    full:   { count: 0, price: 289, btn: 'pay_full', label: 'Full chart breakdown' }
  };
  const meta = map[pkg] || map.single;
  hint.textContent = meta.count === 0
    ? 'Full breakdown: no fixed question boxes—describe your situation and focus areas in WhatsApp later.'
    : `This package includes ${meta.count} question${meta.count>1?'s':''}. Please write clearly.`;

  // render questions
  questionsWrap.innerHTML = '';
  if (meta.count > 0) {
    for (let i = 1; i <= meta.count; i++) {
      const div = document.createElement('div');
      div.innerHTML = `
        <label class="form-label">Question ${i}</label>
        <textarea id="dr_q${i}" rows="3" class="form-input" placeholder="Your question ${i}"></textarea>
      `;
      questionsWrap.appendChild(div);
    }
  } else {
    const info = document.createElement('p');
    info.className = 'text-sm text-gray-600';
    info.textContent = 'Use the WhatsApp message to describe your situation and 2–3 focus areas you want me to read.';
    questionsWrap.appendChild(info);
  }

  // show pay button
  ['pay_single','pay_three','pay_full'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) {
      if (id === meta.btn) el.classList.remove('hidden');
      else el.classList.add('hidden');
    }
  });

  // WhatsApp compose
  const waBtn = document.getElementById('dr_whatsapp');
  const phone = 'YOUR_WHATSAPP_NUMBER'; // e.g. 15551234567
  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('dr_name').value.trim();
    const email = document.getElementById('dr_email').value.trim();
    const dob = document.getElementById('dr_dob').value;
    const gender = document.getElementById('dr_gender').value;
    const time = document.getElementById('dr_time').value.trim();
    const city = document.getElementById('dr_city').value.trim();
    const tz = document.getElementById('dr_tz').value.trim();
    if (!name || !email || !dob) {
      alert('Please fill your name, email and date of birth.');
      return;
    }
    let qsText = '';
    if (meta.count > 0) {
      for (let i=1; i<=meta.count; i++) {
        const val = (document.getElementById(`dr_q${i}`)?.value || '').trim();
        if (val) qsText += `\nQ${i}: ${val}`;
      }
    } else {
      qsText = '\n(Full breakdown: I will describe my situation and focus areas.)';
    }

    const text =
`Destiny Reading – ${meta.label}
Name: ${name}
Gender: ${gender || 'N/A'}
Email: ${email}
DOB: ${dob}
Birth time: ${time || 'unknown'}
Birth city/country: ${city}
Time zone: ${tz}${qsText ? '\n' + qsText : ''}

(I have paid on the website. Please confirm and let me know timing.)`;

    const url = `https://wa.me/${phone}?text=${enc(text)}`;
    window.open(url, '_blank');
  });
})();

/* ========== Feng Shui booking (with Gender) ========== */
(function fengshuiBooking() {
  const root = document.getElementById('fengshui-booking');
  if (!root) return;

  // 根据 URL 预选 program
  const program = (qs('program') || 'marriage').toLowerCase(); // marriage|health|money
  const select = document.getElementById('fs_program');
  if (select) select.value = program;

  // 显示对应支付按钮
  const showPay = (val) => {
    const ids = ['pay_marriage','pay_health','pay_money'];
    ids.forEach(id => document.getElementById(id)?.classList.add('hidden'));
    if (val === 'marriage') document.getElementById('pay_marriage')?.classList.remove('hidden');
    if (val === 'health') document.getElementById('pay_health')?.classList.remove('hidden');
    if (val === 'money') document.getElementById('pay_money')?.classList.remove('hidden');
  };
  showPay(program);
  select?.addEventListener('change', e => showPay(e.target.value));

  // WhatsApp compose
  const waBtn = document.getElementById('fs_whatsapp');
  const phone = 'YOUR_WHATSAPP_NUMBER'; // e.g. 15551234567
  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('fs_name').value.trim();
    const email = document.getElementById('fs_email').value.trim();
    const gender = document.getElementById('fs_gender').value;
    const tz = document.getElementById('fs_tz').value.trim();
    const space = document.getElementById('fs_space').value;
    const prog = document.getElementById('fs_program').value;
    const desc = document.getElementById('fs_desc').value.trim();

    if (!name || !email) {
      alert('Please fill your name and email.');
      return;
    }

    const label = prog === 'marriage' ? 'Marriage & Bedroom Reset'
                 : prog === 'health' ? 'Health & Energy Home Reset'
                 : 'Money & Career Space Upgrade';

    const text =
`Feng Shui – ${label}
Name: ${name}
Gender: ${gender}
Email: ${email}
City/Time zone: ${tz}
Space type: ${space}
Goal / What feels wrong:
${desc || '(I will send details/photos by WhatsApp)'}
(I have paid on the website. Please confirm next steps.)`;

    const url = `https://wa.me/${phone}?text=${enc(text)}`;
    window.open(url, '_blank');
  });
})();
