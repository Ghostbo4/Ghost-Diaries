// Ghost Diaries — feedback form + live in-session chart
// NOTE: no backend here. Counts live only in this tab's memory and
// reset on refresh. Swap the handleSubmit body for a real fetch()
// to Formspree / your own endpoint to actually collect responses.

document.addEventListener('DOMContentLoaded', () => {
  const stars = document.querySelectorAll('#starRating .star');
  const form = document.getElementById('feedbackForm');
  const thanks = document.getElementById('feedbackThanks');
  if (!form) return;

  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let selected = 0;

  function paintStars() {
    stars.forEach(s => {
      const val = Number(s.dataset.value);
      s.classList.toggle('filled', val <= selected);
    });
  }

  stars.forEach(s => {
    s.addEventListener('click', () => {
      selected = Number(s.dataset.value);
      paintStars();
    });
    s.addEventListener('mouseenter', () => {
      const val = Number(s.dataset.value);
      stars.forEach(inner => {
        inner.classList.toggle('hover', Number(inner.dataset.value) <= val);
      });
    });
    s.addEventListener('mouseleave', () => {
      stars.forEach(inner => inner.classList.remove('hover'));
    });
  });

  function renderChart() {
    const max = Math.max(1, ...Object.values(counts));
    for (let i = 1; i <= 5; i++) {
      const bar = document.querySelector(`.chart-bar[data-bar="${i}"]`);
      const count = document.querySelector(`.chart-count[data-count="${i}"]`);
      if (bar) bar.style.width = `${(counts[i] / max) * 100}%`;
      if (count) count.textContent = counts[i];
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selected) {
      selected = 0;
      stars.forEach(s => s.classList.add('shake'));
      setTimeout(() => stars.forEach(s => s.classList.remove('shake')), 400);
      return;
    }
    counts[selected] += 1;
    renderChart();

    thanks.hidden = false;
    setTimeout(() => { thanks.hidden = true; }, 3000);

    form.reset();
    selected = 0;
    paintStars();
  });

  renderChart();
});
