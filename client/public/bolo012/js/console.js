document.addEventListener('DOMContentLoaded', () => {
  const consoleInput = document.getElementById('console-input');
  const consoleOutput = document.getElementById('console-output');

  if (!consoleInput || !consoleOutput) return;

  const printCommand = (cmd) => {
    const cmdDiv = document.createElement('div');
    cmdDiv.className = 'cmd-line';
    cmdDiv.innerHTML = `<span class="prompt-user">bolo012@sys</span><span class="prompt-colon">:</span><span class="prompt-dir">~</span><span class="prompt-symbol">$</span> <span style="margin-left:5px;">${cmd}</span>`;
    consoleOutput.appendChild(cmdDiv);
  };

  const printResponse = (text, type = 'normal') => {
    const resDiv = document.createElement('div');
    resDiv.className = type === 'error' ? 'cmd-error' : 'cmd-response';
    resDiv.textContent = text;
    consoleOutput.appendChild(resDiv);
    // Scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  };

  // Focus input when clicking anywhere on the monitor
  const crtMonitor = document.querySelector('.crt-monitor');
  if (crtMonitor) {
    crtMonitor.addEventListener('click', () => {
      consoleInput.focus();
    });
  }

  consoleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = consoleInput.value.trim();
      consoleInput.value = ''; // clear input

      if (rawCmd === '') return;

      // Print what the user typed
      printCommand(rawCmd);
      
      // We will parse the command (case insensitive)
      const cmd = rawCmd.toLowerCase();

      // Basic Logic Switch
      switch (cmd) {
        case 'help':
          printResponse(
            "COMANDOS DISPONIBLES:\n" +
            "  help    - Muestra este menú de ayuda\n" +
            "  clear   - Limpia el historial de la terminal\n" +
            "  ping    - Revisa la latencia del servidor central\n" +
            "  whoami  - Muestra la identidad actual\n" +
            "  date    - Muestra la fecha del sistema\n\n" +
            "NOTA DEL SISTEMA: Algunos comandos clasificados no se muestran en esta lista."
          );
          break;
        case 'clear':
          consoleOutput.innerHTML = '';
          break;
        case 'ping':
          printResponse("Haciendo ping a localhost... \nRespuesta: 0ms. Todo en orden.");
          break;
        case 'whoami':
          printResponse("Identidad actual: BOLO012\nNivel de acceso: USUARIO_ESTANDAR\nNota: El acceso a ROOT está restringido.");
          break;
        case 'date':
          printResponse(new Date().toString());
          break;
        default:
          printResponse(`bash: ${rawCmd}: comando no encontrado`, 'error');
          break;
      }
      
      // Scroll to bottom just in case
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
  });
});
