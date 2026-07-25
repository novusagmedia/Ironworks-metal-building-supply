/* IRONWORKS — Panhandle Steel · interactions */

/* nav solidify on scroll */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* mobile menu */
const hbg = document.getElementById('hbg');
const mob = document.getElementById('mob');
if (hbg && mob) {
  const close = () => { hbg.classList.remove('open'); mob.classList.remove('open'); document.body.style.overflow = ''; };
  hbg.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    hbg.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (mob.classList.contains('open') && !mob.contains(e.target) && !hbg.contains(e.target)) close();
  });
}

/* scroll reveal */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.rv').forEach(el => revealObs.observe(el));

/* count-up stats */
function animateCounter(el) {
  const target = parseFloat(el.dataset.to);
  const suffix = el.dataset.sfx || '';
  const dur = 1700, start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.firstChild.textContent = Math.floor(target * ease);
    if (p < 1) requestAnimationFrame(tick);
    else el.firstChild.textContent = target;
  }
  requestAnimationFrame(tick);
}
const counters = document.querySelectorAll('[data-to]');
if (counters.length) {
  let done = false;
  const cObs = new IntersectionObserver((entries) => {
    if (!done && entries.some(e => e.isIntersecting)) { done = true; counters.forEach(animateCounter); }
  }, { threshold: 0.4 });
  counters.forEach(el => cObs.observe(el));
}
