// === Bottom Island ===
document.addEventListener('DOMContentLoaded', function () {
  const island = document.getElementById('js-bottom-island');
  const hero   = document.querySelector('.card') || document.querySelector('.cs-hero');
  if (!island || !hero) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      island.classList.toggle('visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });

  observer.observe(hero);
});

// === Sticky Island Header ===
document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.site-header');
  if (header && !header.dataset.noScroll) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
});

// === Image Zoom ===
document.addEventListener('DOMContentLoaded', function () {
  if (typeof mediumZoom !== 'undefined' && window.innerWidth > 490) {
    const imageZoom = mediumZoom('.zoomable', {
      margin: 48,
      background: getComputedStyle(document.documentElement).getPropertyValue('--overlay-bg').trim() || 'rgba(245, 246, 250, 0.95)',
      scrollOffset: 40
    });

    imageZoom.on('open', event => {
      const img = event.target;
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      const viewportWidth = window.innerWidth - 48 * 2;
      const viewportHeight = window.innerHeight - 48 * 2;

      if (naturalWidth < viewportWidth && naturalHeight < viewportHeight) {
        img.style.maxWidth = naturalWidth + 'px';
        img.style.maxHeight = naturalHeight + 'px';
      }
    });

    imageZoom.on('close', event => {
      event.target.style.maxWidth = '';
      event.target.style.maxHeight = '';
    });

    const showMoreBtn = document.querySelector('.standout-toggle');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        setTimeout(() => {
          imageZoom.attach('.zoomable');
        }, 100);
      });
    }
  } else {
    console.error('medium-zoom library not loaded');
  }
});

// === Password Modal ===
document.addEventListener('DOMContentLoaded', function () {
  const openBtn  = document.getElementById('open-case-modal');
  const overlay  = document.getElementById('pw-overlay');
  const input    = document.getElementById('pw-input');
  const submit   = document.getElementById('pw-submit');
  const error    = document.getElementById('pw-error');
  if (!openBtn || !overlay) return;

  openBtn.addEventListener('click', function () {
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    input.value = '';
    error.hidden = true;
    setTimeout(() => input.focus(), 50);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.hidden = true;
      document.body.style.overflow = '';
    }
  });

  function checkPassword() {
    if (input.value === 'revolut') {
      window.location.href = 'casestudy_1.html';
    } else {
      error.hidden = false;
      input.value = '';
      input.focus();
    }
  }

  submit.addEventListener('click', checkPassword);

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkPassword();
    if (e.key === 'Escape') { overlay.hidden = true; document.body.style.overflow = ''; }
  });
});

// === Copy Email ===
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('copy-email');
  if (!btn) return;

  btn.addEventListener('click', function () {
    navigator.clipboard.writeText('max.berinbeyn@gmail.com').then(function () {
      const original = btn.innerHTML;
      btn.textContent = 'Copied!';
      setTimeout(function () { btn.innerHTML = original; }, 2000);
    });
  });
});

// === Show More Testimonials ===
document.addEventListener('DOMContentLoaded', function () {
  const btn   = document.querySelector('.standout-toggle');
  const extra = document.querySelector('.standout-extra');
  if (!btn || !extra) return;

  extra.hidden = true;

  btn.addEventListener('click', function () {
    const isHidden = extra.hidden;
    extra.hidden   = !isHidden;
    btn.textContent = isHidden ? 'Show less' : 'Show more';
  });
});

// === Testimonial Dots ===
document.addEventListener('DOMContentLoaded', function () {
  const container  = document.querySelector('.standout-cards');
  const dotsWrapper = document.querySelector('.standout-dots');
  if (!container || !dotsWrapper) return;

  const cards = Array.from(container.querySelectorAll('.standout-card'));

  // Build dots
  cards.forEach(function (_, i) {
    const dot = document.createElement('button');
    dot.className = 'standout-dot' + (i === 0 ? ' standout-dot--active' : '');
    dot.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    dotsWrapper.appendChild(dot);

    dot.addEventListener('click', function () {
      cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
  });

  const dots = Array.from(dotsWrapper.querySelectorAll('.standout-dot'));

  // Update active dot on scroll
  container.addEventListener('scroll', function () {
    const containerLeft = container.getBoundingClientRect().left;
    let minDist = Infinity, activeIndex = 0;
    cards.forEach(function (card, i) {
      const dist = Math.abs(card.getBoundingClientRect().left - containerLeft);
      if (dist < minDist) { minDist = dist; activeIndex = i; }
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('standout-dot--active', i === activeIndex);
    });
  }, { passive: true });
});

// === Before / After Sliders ===
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.ba-viewer').forEach(function (viewer) {
    const divider  = viewer.querySelector('.ba-divider');
    const imgAfter = viewer.querySelector('.ba-img-after');

    let dragging = false;

    function setPos(clientX) {
      const rect = viewer.getBoundingClientRect();
      const pos  = Math.min(Math.max((clientX - rect.left) / rect.width * 100, 0), 100);
      divider.style.left      = pos + '%';
      imgAfter.style.clipPath = `inset(0 ${(100 - pos).toFixed(2)}% 0 0)`;
    }

    viewer.addEventListener('mousedown',  e => { dragging = true;  setPos(e.clientX); });
    window.addEventListener('mousemove',  e => { if (dragging) setPos(e.clientX); });
    window.addEventListener('mouseup',    () => dragging = false);

    viewer.addEventListener('touchstart', e => { dragging = true;  setPos(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove',  e => { if (dragging) { e.preventDefault(); setPos(e.touches[0].clientX); } }, { passive: false });
    window.addEventListener('touchend',   () => dragging = false);

    setPos(viewer.getBoundingClientRect().left + viewer.offsetWidth / 2);
  });
});
