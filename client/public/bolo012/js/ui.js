document.addEventListener('DOMContentLoaded', () => {
  const entryOverlay = document.getElementById('entry-overlay');
  const entryBtn = document.getElementById('entry-btn');
  if (entryOverlay && entryBtn) {
    entryBtn.addEventListener('click', () => {
      entryOverlay.classList.add('hidden');
      initAudioContext();
      if (trackItems && trackItems.length > 0 && playTrack) {
        const randomIndex = Math.floor(Math.random() * trackItems.length);
        playTrack(trackItems[randomIndex]);
      }
      setTimeout(() => { entryOverlay.style.display = 'none'; }, 500);
    });
  }

  const glitchTitle = document.querySelector('.glitch-title');
  if (glitchTitle) {
    glitchTitle.addEventListener('click', () => {
      playTone(440, 'triangle', 0.3);
      glitchTitle.style.animation = 'none';
      void glitchTitle.offsetWidth;
      glitchTitle.style.animation = '';
    });
  }

  document.querySelectorAll('.crt-link-btn, .social-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      playTone(880, 'sine', 0.04);
    });
  });
});
