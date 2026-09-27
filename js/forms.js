/* IRONWORKS — Formspree submit handling */
async function submitToFormspree(form, successId, endpoint, thanksUrl) {
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
      if (typeof gtag === 'function') gtag('event', 'generate_lead', { form_id: form.id });
      if (thanksUrl) { window.location.href = thanksUrl; return; }
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

function bindForm(formId, successId, endpoint, thanksUrl) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener('submit', (e) => { e.preventDefault(); submitToFormspree(form, successId, endpoint, thanksUrl); });
}

bindForm('quote-form', 'success-msg', 'https://formspree.io/f/xzdqvnlk', 'thanks-fit-check.html');
bindForm('contractor-form', 'contractor-success', 'https://formspree.io/f/xzdqvnlk', 'thanks-contractor.html');
bindForm('designer-form', 'designer-success', 'https://formspree.io/f/xzdqvnlk', 'thanks-3d.html');
bindForm('hail-form', 'hail-success', 'https://formspree.io/f/xojojqrr');
