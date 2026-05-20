document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.mi-menu-toggle');
  var menu = document.querySelector('.mi-menu');

  if (toggle && menu) {
    toggle.onclick = function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
  }

  document.querySelectorAll('.mi-reveal').forEach(function (item) {
    item.classList.add('is-visible');
  });

  var flow = document.querySelector('[data-reading-flow]');
  if (!flow) return;

  var state = {
    step: 1,
    topic: 'Love',
    question: '',
    package: 'Two Questions',
    price: '$18.90'
  };

  var panels = flow.querySelectorAll('[data-step-panel]');
  var progress = flow.querySelector('[data-progress]');
  var stepText = flow.querySelector('[data-step-text]');
  var summaryTopic = flow.querySelector('[data-summary-topic]');
  var summaryPackage = flow.querySelector('[data-summary-package]');
  var summaryQuestion = flow.querySelector('[data-summary-question]');
  var finalLink = flow.querySelector('[data-final-link]');
  var questionInput = flow.querySelector('[data-question-input]');

  function showStep(step) {
    state.step = step;
    panels.forEach(function (panel) {
      panel.hidden = Number(panel.getAttribute('data-step-panel')) !== step;
    });
    if (progress) progress.style.width = step === 1 ? '33%' : step === 2 ? '66%' : '100%';
    if (stepText) stepText.textContent = 'Step ' + step + ' of 3';
    renderSummary();
  }

  function renderSummary() {
    if (summaryTopic) summaryTopic.textContent = state.topic;
    if (summaryPackage) summaryPackage.textContent = state.package + ' · ' + state.price;
    if (summaryQuestion) summaryQuestion.textContent = state.question || 'Your question will appear here.';
    if (finalLink) {
      var body = 'Topic: ' + state.topic + '\nPackage: ' + state.package + ' ' + state.price + '\nQuestion: ' + (state.question || '');
      finalLink.href = 'mailto:hello@example.com?subject=' + encodeURIComponent('New Mystic Reading Order') + '&body=' + encodeURIComponent(body);
    }
  }

  flow.querySelectorAll('[data-topic]').forEach(function (button) {
    button.addEventListener('click', function () {
      flow.querySelectorAll('[data-topic]').forEach(function (item) { item.classList.remove('is-active'); });
      button.classList.add('is-active');
      state.topic = button.getAttribute('data-topic');
      showStep(2);
    });
  });

  flow.querySelectorAll('[data-package]').forEach(function (button) {
    button.addEventListener('click', function () {
      flow.querySelectorAll('[data-package]').forEach(function (item) { item.classList.remove('is-active'); });
      button.classList.add('is-active');
      state.package = button.getAttribute('data-package');
      state.price = button.getAttribute('data-price');
      showStep(3);
    });
  });

  flow.querySelectorAll('[data-next-step]').forEach(function (button) {
    button.addEventListener('click', function () {
      if (questionInput) state.question = questionInput.value.trim();
      var next = Number(button.getAttribute('data-next-step'));
      showStep(next);
    });
  });

  flow.querySelectorAll('[data-prev-step]').forEach(function (button) {
    button.addEventListener('click', function () {
      showStep(Number(button.getAttribute('data-prev-step')));
    });
  });

  if (questionInput) {
    questionInput.addEventListener('input', function () {
      state.question = questionInput.value.trim();
      renderSummary();
    });
  }

  showStep(1);
});
