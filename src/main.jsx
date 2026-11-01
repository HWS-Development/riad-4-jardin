import './index.css';

history.scrollRestoration = 'manual';
scrollTo({ top: 0, left: 0, behavior: 'instant' });

// All reading, navigation, language links and booking links work from static HTML.
// Hydrate interactive enhancements after critical media has painted, or immediately
// on form/gallery intent. Do not compete with the LCP for bandwidth/CPU.
let pending;
function enhance() {
  if (!pending) pending = import('./client.jsx').then(module => module.hydrate()).then(() => {
    document.documentElement.dataset.hydrated = 'true';
    document.removeEventListener('click', onClick, true);
    document.removeEventListener('submit', onSubmit, true);
    document.removeEventListener('focusin', onFocus, true);
  }).catch(error => {
    console.error('Unable to initialize interactive controls', error);
    throw error;
  });
  return pending;
}
function onClick(event) {
  const control = event.target.closest('button,[role="button"],a[data-photo]');
  if (!control) return;
  event.preventDefault(); event.stopImmediatePropagation();
  enhance().then(() => { if (control.isConnected) control.click(); }).catch(() => {
    if (control.matches('a[data-photo]')) location.assign(control.href);
    else if (control.closest('form')) showFailure(control.closest('form'));
  });
}
function onSubmit(event) {
  event.preventDefault(); event.stopImmediatePropagation();
  const form = event.target;
  enhance().then(() => { if (form.isConnected) form.requestSubmit(); }).catch(() => showFailure(form));
}
function showFailure(form) {
  let status = form.querySelector('[role="status"], [role="alert"]');
  if (!status) { status = document.createElement('p'); status.setAttribute('role', 'alert'); form.appendChild(status); }
  status.textContent = document.documentElement.lang === 'fr' ? 'Le formulaire n’a pas pu démarrer. Contactez le riad par e-mail ou téléphone.' : 'The form could not load. Please contact the riad by email or phone.';
}
function onFocus(event) {
  if (event.target.matches('input,textarea,select')) enhance().catch(() => {});
}
document.addEventListener('click', onClick, true);
document.addEventListener('submit', onSubmit, true);
document.addEventListener('focusin', onFocus, true);
const idle = async () => {
  const critical = document.querySelector('img[fetchpriority="high"]');
  try { await critical?.decode(); } catch { /* Keep controls usable even if an image fails. */ }
  if (critical && critical.getBoundingClientRect().top < innerHeight &&
      'PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('largest-contentful-paint')) {
    // Decoding is not painting: wait for the browser's actual image-paint signal
    // before starting non-critical hydration. Visitor intent still bypasses this.
    await new Promise(resolve => {
      let observer;
      const done = () => { clearTimeout(timer); observer?.disconnect(); resolve(); };
      const timer = setTimeout(done, 1000);
      observer = new PerformanceObserver(list => {
        if (list.getEntries().some(entry => entry.element === critical)) done();
      });
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    });
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if ('requestIdleCallback' in window) requestIdleCallback(() => enhance().catch(() => {}), { timeout: 1000 });
    else setTimeout(() => enhance().catch(() => {}), 0);
  }));
};
if (document.readyState === 'complete') idle();
else window.addEventListener('load', idle, { once: true });
