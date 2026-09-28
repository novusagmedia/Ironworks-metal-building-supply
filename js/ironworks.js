/* IRONWORKS — Panhandle Steel · interactions */

/* nav solidify on scroll */
const nav = document.getElementById('nav');
if (nav && !nav.hasAttribute('data-solid')) { /* data-solid: page keeps the dark bar at all times */
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
    hbg.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('click', e => {
    if (mob.classList.contains('open') && !mob.contains(e.target) && !hbg.contains(e.target)) close();
  });
}

/* nav dropdowns: hover/focus via CSS; click/tap and Escape here */
document.querySelectorAll('.sub-btn').forEach(btn => {
  const li = btn.parentElement;
  const set = (v) => { li.classList.toggle('open', v); btn.setAttribute('aria-expanded', v); };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const v = !li.classList.contains('open');
    document.querySelectorAll('.has-sub.open').forEach(o => { if (o !== li) { o.classList.remove('open'); o.querySelector('.sub-btn').setAttribute('aria-expanded', false); } });
    set(v);
  });
  li.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); btn.focus(); } });
});
document.addEventListener('click', () => document.querySelectorAll('.has-sub.open').forEach(li => { li.classList.remove('open'); li.querySelector('.sub-btn').setAttribute('aria-expanded', false); }));

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

/* GA4 conversion events. Sends only the event type, funnel, and where on the page: no personal data. */
(function () {
  const send = (name, params) => { if (typeof gtag === 'function') gtag('event', name, params); };
  const funnel = document.body.dataset.funnel || 'general';
  const where = (el) => el.closest('#nav') ? 'nav' : el.closest('#mob') ? 'mobile_menu' : el.closest('footer') ? 'footer' : 'body';
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    const page = href.replace(/^\//, '').replace(/\.html(?=$|#)/, ''); // '/contractors' and 'contractors.html' both → 'contractors'
    const p = { funnel, link_location: where(a) };
    if (href.startsWith('tel:')) send('phone_click', p);
    else if (href.startsWith('mailto:')) send('email_click', p);
    else if (href.includes('google.com/maps')) send('directions_click', p);
    else if (href.includes('g.page/r/')) send('review_click', p);
    else if (page.startsWith('3d-designer') || page === '#designer' || page === 'index#designer') send('designer_open', p);
    else if (page.startsWith('contractors')) send('offer_click', { ...p, offer: 'contractor' });
    else if (page.startsWith('get-a-quote')) send('offer_click', { ...p, offer: 'building' });
  });
})();
