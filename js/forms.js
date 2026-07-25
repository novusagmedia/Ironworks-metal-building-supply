/* IRONWORKS — Formspree submit handling */
async function submitToFormspree(form, successId, endpoint) {
  const btn = form.querySelector('[type="submit"]');
  const original = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    });
    if (res.ok) {
      form.style.display = 'none';
      const msg = document.getElementById(successId);
      if (msg) { msg.style.display = 'block'; window.scrollTo({ top: msg.offsetTop - 110, behavior: 'smooth' }); }
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  } catch {
    btn.textContent = 'Network error — try again';
    btn.disabled = false;
  }
}

function bindForm(formId, successId, endpoint) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => { e.preventDefault(); submitToFormspree(form, successId, endpoint); });
}

bindForm('quote-form', 'success-msg', 'https://formspree.io/f/xzdqvnlk');
bindForm('contractor-form', 'contractor-success', 'https://formspree.io/f/xzdqvnlk');
bindForm('designer-form', 'designer-success', 'https://formspree.io/f/xzdqvnlk');
bindForm('hail-form', 'hail-success', 'https://formspree.io/f/xojojqrr');
