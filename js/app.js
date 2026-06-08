/* ── NAV SCROLL ── */
const nav = document.getElementById('site-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── HAMBURGER ── */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob-menu');
if (hbg && mob) {
  hbg.addEventListener('click', () => {
    hbg.classList.toggle('open');
    mob.classList.toggle('open');
    document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
  });
  function closeMob() {
    hbg.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMob));
  document.addEventListener('click', e => {
    if (mob.classList.contains('open') && !nav.contains(e.target) && !mob.contains(e.target)) closeMob();
  });
}

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));

/* ── COUNTER ANIMATION ── */
function animateCounter(el) {
  const target = parseFloat(el.dataset.to);
  const suffix = el.dataset.sfx || '';
  const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const current = target * ease;
    el.textContent = (decimals > 0 ? current.toFixed(decimals) : Math.floor(current)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

let countersDone = false;
const counterEls = document.querySelectorAll('[data-to]');
if (counterEls.length) {
  const counterObs = new IntersectionObserver(entries => {
    if (!countersDone && entries.some(e => e.isIntersecting)) {
      countersDone = true;
      counterEls.forEach(el => animateCounter(el));
    }
  }, { threshold: 0.3 });
  counterEls.forEach(el => counterObs.observe(el));
}

/* ── QUOTE FORM ── */
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();
    quoteForm.style.display = 'none';
    const msg = document.getElementById('success-msg');
    if (msg) msg.style.display = 'block';
    window.scrollTo({ top: msg ? msg.offsetTop - 100 : 0, behavior: 'smooth' });
  });
}

/* ── DESIGNER FORM ── */
const designerForm = document.getElementById('designer-form');
if (designerForm) {
  designerForm.addEventListener('submit', e => {
    e.preventDefault();
    designerForm.style.display = 'none';
    const msg = document.getElementById('designer-success');
    if (msg) msg.style.display = 'block';
    window.scrollTo({ top: msg ? msg.offsetTop - 100 : 0, behavior: 'smooth' });
  });
}
