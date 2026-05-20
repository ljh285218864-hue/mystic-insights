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
});
