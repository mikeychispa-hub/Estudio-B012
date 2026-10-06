document.addEventListener('DOMContentLoaded', () => {
  const avatarImg = document.querySelector('.avatar-img');
  const modalOverlay = document.getElementById('avatar-modal');
  const modalImg = document.getElementById('avatar-modal-img');
  const modalCloseBtn = document.getElementById('avatar-modal-close');

  if (avatarImg && modalOverlay && modalImg) {
    avatarImg.addEventListener('click', () => {
      modalImg.src = avatarImg.src;
      modalOverlay.classList.add('is-active');
      playTone(660, 'sine', 0.1);
    });

    const closeModal = () => {
      if (modalOverlay.classList.contains('is-active')) {
        modalOverlay.classList.remove('is-active');
        playTone(440, 'triangle', 0.1);
      }
    };

    modalCloseBtn.addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }
});
