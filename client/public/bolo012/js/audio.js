let audioCtx = null;
let globalAudio = new Audio();
globalAudio.volume = 0.10;

const initAudioContext = () => {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) audioCtx = new AC();
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
};

const playTone = (freq, type, duration) => {
  try {
    initAudioContext();
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    return;
  }
};

let trackItems = [];
let playTrack = null;

document.addEventListener('DOMContentLoaded', () => {
  trackItems = document.querySelectorAll('.audio-track-item');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeIcon = document.getElementById('volume-icon');

  if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      globalAudio.volume = val;
      
      if (volumeIcon) {
        if (val === 0) {
          volumeIcon.className = 'fa-solid fa-volume-xmark volume-icon';
        } else if (val < 0.5) {
          volumeIcon.className = 'fa-solid fa-volume-low volume-icon';
        } else {
          volumeIcon.className = 'fa-solid fa-volume-high volume-icon';
        }
      }
    });
  }

  playTrack = (track) => {
    const src = track.getAttribute('data-src');
    if (!src) return;
    
    initAudioContext();
    
    trackItems.forEach(t => {
      t.classList.remove('is-playing');
      const ico = t.querySelector('.track-play-button i');
      if (ico) ico.className = 'fa-solid fa-play';
    });
    
    track.classList.add('is-playing');
    const ico = track.querySelector('.track-play-button i');
    if (ico) ico.className = 'fa-solid fa-pause';
    
    if (globalAudio.src && globalAudio.src.includes(src) && !globalAudio.paused) {
        globalAudio.currentTime = 0;
    } else {
        globalAudio.src = src;
    }
    
    globalAudio.play().catch(()=>{});
  };

  const pauseTrack = () => {
    trackItems.forEach(t => {
      t.classList.remove('is-playing');
      const ico = t.querySelector('.track-play-button i');
      if (ico) ico.className = 'fa-solid fa-play';
    });
    globalAudio.pause();
  };

  globalAudio.addEventListener('ended', () => {
    const currentTrack = document.querySelector('.audio-track-item.is-playing');
    const allTracks = Array.from(trackItems);
    
    if (allTracks.length > 1) {
      const availableTracks = allTracks.filter(t => t !== currentTrack);
      const randomIndex = Math.floor(Math.random() * availableTracks.length);
      playTrack(availableTracks[randomIndex]);
    } else if (allTracks.length === 1) {
      playTrack(allTracks[0]);
    }
  });

  trackItems.forEach((track) => {
    track.addEventListener('click', () => {
      if (track.classList.contains('is-playing')) {
        pauseTrack();
      } else {
        playTrack(track);
      }
    });
  });
});
