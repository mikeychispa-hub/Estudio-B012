const CONFIG_BIRTHDATE = '2006-08-19T00:00:00';

document.addEventListener('DOMContentLoaded', () => {
  const sysTimeEl = document.getElementById('sys-time');
  if (sysTimeEl) {
    const updateTime = () => {
      const d = new Date();
      sysTimeEl.textContent = d.toLocaleTimeString('en-US', { hour12: false });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }
});
