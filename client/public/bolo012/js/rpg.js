document.addEventListener('DOMContentLoaded', () => {
  const xpText = document.getElementById('xp-text');
  const xpFill = document.getElementById('xp-fill');
  
  const birthDate = new Date(CONFIG_BIRTHDATE);
  const now = new Date();
  
  let age = now.getFullYear() - birthDate.getFullYear();
  let currentYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  if (now < currentYearBirthday) {
    age--;
    currentYearBirthday = new Date(now.getFullYear() - 1, birthDate.getMonth(), birthDate.getDate());
  }
  
  const nextYearBirthday = new Date(currentYearBirthday.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  const msInYear = nextYearBirthday.getTime() - currentYearBirthday.getTime();
  const msPassed = now.getTime() - currentYearBirthday.getTime();
  const progressRatio = Math.max(0, Math.min(1, msPassed / msInYear));
  
  const levelEl = document.querySelector('.rpg-stat-row:first-child dd');
  if (levelEl) levelEl.textContent = 'LVL ' + age;

  const totalXP = 10000;
  const targetXP = Math.floor(progressRatio * totalXP);
  const targetPercent = progressRatio * 100;
  
  const totalSteps = 70;
  let currentStep = 0;

  if (!xpFill || !xpText) return;

  const xpInterval = setInterval(() => {
    currentStep++;
    const progress = Math.min(currentStep / totalSteps, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentXP = Math.floor(eased * targetXP);
    const currentWidth = eased * targetPercent;
    xpFill.style.width = currentWidth + '%';
    xpText.textContent = currentXP.toLocaleString() + ' / ' + totalXP.toLocaleString() + ' XP';
    if (currentStep >= totalSteps) {
      clearInterval(xpInterval);
      xpFill.style.width = targetPercent + '%';
      xpText.textContent = targetXP.toLocaleString() + ' / ' + totalXP.toLocaleString() + ' XP';
    }
  }, 28);
});
