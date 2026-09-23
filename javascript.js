(function () {
  var stored = localStorage.getItem('theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var isDark = stored ? stored === 'dark' : prefersDark;
  document.documentElement.classList.toggle('dark', isDark);
})();

document.querySelectorAll('.js-year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

document.querySelector('.grid-toggle').addEventListener('click', function () {
  var overlay = document.getElementById('gridOverlay');
  overlay.classList.toggle('visible');
});

document.addEventListener('keydown', function (e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'g') {
    e.preventDefault();
    document.getElementById('gridOverlay').classList.toggle('visible');
  }
});

function updateThemeTooltip() {
  var isDark = document.documentElement.classList.contains('dark');
  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.setAttribute('data-tooltip', isDark ? 'Light mode' : 'Dark mode');
  });
}
updateThemeTooltip();

document.querySelector('.theme-toggle').addEventListener('click', function () {
  var isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeTooltip();
});

var ndaModalOverlay = document.getElementById('ndaModalOverlay');
if (ndaModalOverlay) {
  function openNdaModal() {
    ndaModalOverlay.classList.add('visible');
    document.documentElement.classList.add('modal-open');
  }
  function closeNdaModal() {
    ndaModalOverlay.classList.remove('visible');
    document.documentElement.classList.remove('modal-open');
  }
  document.querySelectorAll('.js-nda-modal').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openNdaModal();
    });
  });
  ndaModalOverlay.addEventListener('click', function (e) {
    if (e.target === ndaModalOverlay) {
      closeNdaModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNdaModal();
    }
  });
}
