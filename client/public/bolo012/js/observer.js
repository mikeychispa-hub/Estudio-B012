document.addEventListener('DOMContentLoaded', () => {
  const options = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('paused-anim');
      } else {
        entry.target.classList.add('paused-anim');
      }
    });
  }, options);

  const heavyElements = document.querySelectorAll(
    '.crt-monitor, .mascot-widget, .discord-widget, .audio-logs-section, .coming-soon-widget, .crt-bio-block, .glitch-title'
  );

  heavyElements.forEach(el => observer.observe(el));
});
