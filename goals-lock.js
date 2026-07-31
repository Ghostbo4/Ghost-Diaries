// Ghost Diaries — Goals page passcode gate
//
// IMPORTANT HONESTY NOTE: this is a soft gate, not real security.
// The encoded goal content ships inside this page's HTML/JS either
// way — anyone who opens devtools and decodes the base64 payload in
// window.__goalsPayload can read it without the passcode. This is
// fine for keeping casual visitors out, but don't put anything here
// you actually need to keep secret. Real protection would require a
// server that only sends the content after checking the passcode.

document.addEventListener('DOMContentLoaded', () => {
  const PASSCODE = 'dreams without goals are just dreams';

  const lockSection = document.getElementById('goalsLockSection');
  const contentSection = document.getElementById('goalsContentSection');
  const contentEl = document.getElementById('goalsContent');
  const form = document.getElementById('goalsLockForm');
  const input = document.getElementById('goalsPasscode');
  const error = document.getElementById('goalsLockError');

  if (!form || !window.__goalsPayload) return;

  function normalize(s) {
    return s.trim().toLowerCase().replace(/\s+/g, ' ');
  }

  function unlock() {
    const decoded = decodeURIComponent(escape(atob(window.__goalsPayload)));
    contentEl.innerHTML = decoded;
    lockSection.hidden = true;
    contentSection.hidden = false;
    sessionStorage.setItem('goalsUnlocked', '1');

    // Re-run reveal-on-scroll for the newly injected content
    const revealables = contentEl.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && revealables.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealables.forEach(el => io.observe(el));
    } else {
      revealables.forEach(el => el.classList.add('is-visible'));
    }
  }

  if (sessionStorage.getItem('goalsUnlocked') === '1') {
    unlock();
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (normalize(input.value) === PASSCODE) {
      error.hidden = true;
      unlock();
    } else {
      error.hidden = false;
      input.value = '';
      input.focus();
    }
  });
});
