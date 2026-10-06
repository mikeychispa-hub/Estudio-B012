document.addEventListener('DOMContentLoaded', () => {
  // Tabs Navigation
  const tabs = document.querySelectorAll('.mascot-tab');
  const panels = document.querySelectorAll('.mascot-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs and panels
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // Add active to clicked tab and corresponding panel
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Wardrobe Carousel Logic
  const skins = [
    { id: 'base', name: 'Skin Base', file: 'Skin_Base.png', locked: false, req: '' },
    { id: 'baguet', name: 'Baguet', file: 'Skin_Baguet.png', locked: false, req: 'Requiere logro: Panadero' },
    { id: 'jojos', name: 'Jojos', file: 'Skin_Jojos.jpg', locked: false, req: 'Requiere logro: Stand User' },
    { id: 'kirby', name: 'Kirby', file: 'Skin_Kirby.png', locked: false, req: 'Requiere logro: Glotón' },
    { id: 'papel', name: 'Papel', file: 'Skin_Papel.png', locked: false, req: 'Requiere logro: Origami' },
    { id: 'sus', name: 'Sus', file: 'Skin_Sus.png', locked: false, req: 'Requiere logro: Impostor' },
    { id: 'susbug', name: 'Sus Bug', file: 'Skin_SusBug.jpg', locked: false, req: 'Requiere logro: Glitch' },
    { id: 'tacos', name: 'Tacos', file: 'Skin_Tacos.png', locked: false, req: 'Requiere logro: Taquero' },
    { id: 'binary', name: 'Comando 666', file: 'Skin_01000011 01101111 01101101 01100001 01101110 01100100 01101111 00100000 00110110 00110110 00110110 01110011 01110101 01110011.jpg', locked: false, req: 'Requiere logro: Hacker' }
  ];

  let currentSkinIndex = 0;
  let equippedSkin = skins[0]; // Start with Base Skin

  const skinNameEl = document.getElementById('wardrobe-skin-name');
  const skinPreviewEl = document.getElementById('wardrobe-skin-preview');
  const equipBtn = document.getElementById('wardrobe-equip-btn');
  const reqTextEl = document.getElementById('wardrobe-req-text');
  const entityDisplay = document.getElementById('mascot-entity-display');
  
  const btnPrev = document.getElementById('wardrobe-prev');
  const btnNext = document.getElementById('wardrobe-next');

  // Function to render the equipped skin in the viewport
  const renderEquipped = () => {
    entityDisplay.innerHTML = `<img src="assets/img/${equippedSkin.file}" alt="${equippedSkin.name}" style="width: 100%; height: 100%; object-fit: contain;">`;
  };

  const updateWardrobe = () => {
    const skin = skins[currentSkinIndex];
    skinNameEl.textContent = skin.name;

    if (skin.locked) {
      skinPreviewEl.innerHTML = '<i class="fa-solid fa-lock"></i>';
      skinPreviewEl.classList.add('locked');
      equipBtn.classList.add('disabled');
      equipBtn.disabled = true;
      reqTextEl.textContent = skin.req;
    } else {
      // Temporarily unlocked: show the actual image in the mini preview
      skinPreviewEl.innerHTML = `<img src="assets/img/${skin.file}" alt="${skin.name}" style="width: 80%; height: 80%; object-fit: contain;">`;
      skinPreviewEl.classList.remove('locked');
      equipBtn.classList.remove('disabled');
      equipBtn.disabled = false;
      reqTextEl.textContent = '';
      
      // If already equipped, say equipped
      if (skin.id === equippedSkin.id) {
         equipBtn.textContent = 'EQUIPADO';
         equipBtn.classList.add('disabled');
      } else {
         equipBtn.textContent = 'EQUIPAR';
      }
    }
  };

  btnPrev.addEventListener('click', () => {
    currentSkinIndex = (currentSkinIndex - 1 + skins.length) % skins.length;
    updateWardrobe();
  });

  btnNext.addEventListener('click', () => {
    currentSkinIndex = (currentSkinIndex + 1) % skins.length;
    updateWardrobe();
  });
  
  equipBtn.addEventListener('click', () => {
    const skin = skins[currentSkinIndex];
    if (!skin.locked) {
       equippedSkin = skin;
       renderEquipped();
       updateWardrobe();
    }
  });

  // Initialize
  renderEquipped();
  updateWardrobe();
});
