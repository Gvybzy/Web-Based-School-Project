/* Rosales National High School — shared site behavior
   Handles: loading screen, mobile nav + dropdowns, scroll reveal,
   active nav highlighting, and (non-backend) form validation. */

document.body.classList.remove('no-js');

/* ---------- Loading screen ----------
   Hides as soon as the page is ready, and never traps the
   user if JS is slow: a hard timeout guarantees it clears. */
(function loader() {
  const el = document.querySelector('.loader-screen');
  if (!el) return;
  const hide = () => el.classList.add('is-hidden');
  window.addEventListener('load', hide);
  setTimeout(hide, 1200); // safety net
})();

/* ---------- Mobile nav + dropdowns ---------- */
(function nav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  document.querySelectorAll('.nav-item.has-dropdown-wrap').forEach((item) => {
    const btn = item.querySelector('.has-dropdown');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.has-dropdown-wrap.open').forEach((o) => {
        if (o !== item) { o.classList.remove('open'); o.querySelector('.has-dropdown')?.setAttribute('aria-expanded', 'false'); }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // Close mobile menu / dropdowns when clicking outside or pressing Escape
  document.addEventListener('click', (e) => {
    if (menu && toggle && !menu.contains(e.target) && !toggle.contains(e.target)) {
      document.querySelectorAll('.nav-item.has-dropdown-wrap.open').forEach((o) => o.classList.remove('open'));
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (menu?.classList.contains('open')) {
        menu.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
      document.querySelectorAll('.nav-item.has-dropdown-wrap.open').forEach((o) => o.classList.remove('open'));
    }
  });

  // Highlight current page in nav
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .strand-pill').forEach((a) => {
    const href = a.getAttribute('href') || '';
    if (href.endsWith(path) && path !== '') a.setAttribute('aria-current', 'page');
  });
})();

/* ---------- Scroll reveal ---------- */
(function reveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((el) => io.observe(el));
})();

/* ---------- Contact form (front-end only) ----------
   There is no backend/email service wired up yet, so this
   validates input and shows a clear, honest confirmation
   instead of pretending an email was sent. */
(function contactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const successBox = document.getElementById('contactSuccess');

  const showError = (field, msg) => {
    const err = form.querySelector(`[data-error-for="${field.id}"]`);
    if (err) err.textContent = msg;
    field.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');

    if (!name.value.trim()) { showError(name, 'Please enter your name.'); valid = false; }
    else showError(name, '');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { showError(email, 'Please enter a valid email address.'); valid = false; }
    else showError(email, '');

    if (subject && !subject.value.trim()) { showError(subject, 'Please add a short subject.'); valid = false; }
    else if (subject) showError(subject, '');

    if (!message.value.trim() || message.value.trim().length < 10) {
      showError(message, 'Please write a message of at least 10 characters.');
      valid = false;
    } else showError(message, '');

    if (!valid) return;

    if (successBox) {
      successBox.classList.add('show');
      successBox.focus?.();
    }
    form.reset();
  });
})();
