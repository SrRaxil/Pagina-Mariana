/* ==========================================================
   PARA TI, MARIANA ♡ — DARK ROMANTIC EDITION
   Lógica interactiva, microinteracciones, reproductor y contador
   ========================================================== */

// ==========================================================
// ⚙️ VARIABLES PERSONALIZABLES — PUEDES EDITAR ESTOS VALORES
// ==========================================================
const CONFIG = {
  // 1. PRIMER CONTADOR: Cuando empezó nuestra historia (26 de Septiembre de 2025)
  fechaInicio: '2025-09-26T00:00:00',

  // 2. SEGUNDO CONTADOR: Cuando le dije para volver a intentarlo (6 de Marzo de 2026 a las 4:00 PM)
  fechaReintento: '2026-03-06T16:00:00',

  // 3. PLAYLIST DE SPOTIFY (9 canciones oficiales seleccionadas)
  playlist: [
    {
      id: '790xAaylcgzyKm40GM95Gl',
      titulo: 'missin something',
      artista: 'Zach Templar',
      url: 'https://open.spotify.com/track/790xAaylcgzyKm40GM95Gl',
      embedUrl: 'https://open.spotify.com/embed/track/790xAaylcgzyKm40GM95Gl?utm_source=generator&theme=0'
    },
    {
      id: '0myRViRgmQ3J8izICXEAVO',
      titulo: 'I Thought I Saw Your Face Today',
      artista: 'She & Him',
      url: 'https://open.spotify.com/track/0myRViRgmQ3J8izICXEAVO',
      embedUrl: 'https://open.spotify.com/embed/track/0myRViRgmQ3J8izICXEAVO?utm_source=generator&theme=0'
    },
    {
      id: '77f34xmpcW0IeNsjrkbrkZ',
      titulo: 'Just Monika: A Doki Doki Literature Club Song',
      artista: 'Random Encounters',
      url: 'https://open.spotify.com/track/77f34xmpcW0IeNsjrkbrkZ',
      embedUrl: 'https://open.spotify.com/embed/track/77f34xmpcW0IeNsjrkbrkZ?utm_source=generator&theme=0'
    },
    {
      id: '11xvUU40hy2hCVLrNjQFjt',
      titulo: "Don't You Feel",
      artista: 'Snow Strippers',
      url: 'https://open.spotify.com/track/11xvUU40hy2hCVLrNjQFjt',
      embedUrl: 'https://open.spotify.com/embed/track/11xvUU40hy2hCVLrNjQFjt?utm_source=generator&theme=0'
    },
    {
      id: '0tGqk0HlYMQ16aj7yJwleF',
      titulo: 'Pretend',
      artista: 'alex_g_offline',
      url: 'https://open.spotify.com/track/0tGqk0HlYMQ16aj7yJwleF',
      embedUrl: 'https://open.spotify.com/embed/track/0tGqk0HlYMQ16aj7yJwleF?utm_source=generator&theme=0'
    },
    {
      id: '0UW8NAGwGkEFsDjZXRnkfV',
      titulo: "Ain't Nobody Else Like You",
      artista: 'Cass Elliot',
      url: 'https://open.spotify.com/track/0UW8NAGwGkEFsDjZXRnkfV',
      embedUrl: 'https://open.spotify.com/embed/track/0UW8NAGwGkEFsDjZXRnkfV?utm_source=generator&theme=0'
    },
    {
      id: '6BjDS1tNSBjposp5j9a3g4',
      titulo: 'Loverboy',
      artista: 'A-Wall',
      url: 'https://open.spotify.com/track/6BjDS1tNSBjposp5j9a3g4',
      embedUrl: 'https://open.spotify.com/embed/track/6BjDS1tNSBjposp5j9a3g4?utm_source=generator&theme=0'
    },
    {
      id: '1otG6j1WHNvl9WgXLWkHTo',
      titulo: 'After The Storm (feat. Tyler, The Creator & Bootsy Collins)',
      artista: 'Kali Uchis',
      url: 'https://open.spotify.com/track/1otG6j1WHNvl9WgXLWkHTo',
      embedUrl: 'https://open.spotify.com/embed/track/1otG6j1WHNvl9WgXLWkHTo?utm_source=generator&theme=0'
    },
    {
      id: '50gchdAhBUnVOLqQRyKE9L',
      titulo: 'Race',
      artista: 'Alex G',
      url: 'https://open.spotify.com/track/50gchdAhBUnVOLqQRyKE9L',
      embedUrl: 'https://open.spotify.com/embed/track/50gchdAhBUnVOLqQRyKE9L?utm_source=generator&theme=0'
    }
  ],

  // 3. FRASES DIVERTIDAS PARA EL BOTÓN ESQUIVO "NO"
  frasesNo: [
    '¿Segura? 👀',
    'Piénsalo bien...',
    '¡Esa no vale! 😂',
    '¡Ups, se te resbaló el dedo!',
    '¿En serio vas a decir que no? 🥺',
    'El botón "No" está dañado 🛠️',
    '¡Error 404: Rechazo no admitido!',
    '¡Mira qué bonito está el botón "Sí"! 😉',
    'Mariana, ese botón no funciona 🤭',
    '¡Ríndete, tienes que decir que sí! 💖'
  ]
};

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SISTEMA DE AUDIO (Web Audio API)
  // ==========================================
  let soundEnabled = true;
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Campana suave para botones y clics
  function playChime(freq = 587.33, type = 'sine', duration = 0.45) {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // Ronroneo / Maullido suave para los gaticos
  function playMeow() {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      const now = audioCtx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.35);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  // Fanfarria romántica para cuando dice que sí o sella la carta
  function playCelebrationFanfare() {
    if (!soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Do, Mi, Sol, Do alto
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playChime(freq, 'sine', 0.6);
      }, idx * 120);
    });
  }

  // Alternador de sonido en la barra superior
  const soundToggle = document.getElementById('sound-toggle');
  if (soundToggle) {
    const soundIcon = soundToggle.querySelector('.sound-icon');
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundIcon) soundIcon.textContent = soundEnabled ? '🔊' : '🔇';
      if (soundEnabled) {
        initAudio();
        playChime(659.25);
      }
    });
  }

  window.addEventListener('click', () => {
    initAudio();
  }, { once: true });

  // ==========================================
  // 2. PARTÍCULAS FLOTANTES DE AMOR
  // ==========================================
  function createHeartParticle(x, y, emoji = '♡') {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = emoji;
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    const randomOffset = (Math.random() - 0.5) * 90;
    heart.style.setProperty('--tx', `${randomOffset}px`);
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 1400);
  }

  document.addEventListener('click', (e) => {
    // Ignorar si se hace clic en inputs o áreas de texto
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      const symbols = ['♡', '✨', '🐾', '🌸', '💖'];
      const chosen = symbols[Math.floor(Math.random() * symbols.length)];
      createHeartParticle(e.clientX, e.clientY, chosen);
    }
  });

  // ==========================================
  // 3. BARRA DE PROGRESO DE LECTURA
  // ==========================================
  const progressBar = document.getElementById('reading-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    });
  }

  // ==========================================
  // 4. NAVEGACIÓN Y RESALTADO SUAVE
  // ==========================================
  const navLinks = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id], header[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 160;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });

  const btnEmpezar = document.getElementById('btn-empezar');
  if (btnEmpezar) {
    btnEmpezar.addEventListener('click', () => {
      playChime(523.25);
    });
  }

  // ==========================================
  // 5. CONTADORES EN TIEMPO REAL (DUAL COUNTER)
  // ==========================================
  // ==========================================
  // 5. CONTADORES EN TIEMPO REAL (DETENIDOS AHORA)
  // ==========================================
  const timerDays1 = document.getElementById('timer-days');
  const timerHours1 = document.getElementById('timer-hours');
  const timerMinutes1 = document.getElementById('timer-minutes');
  const timerSeconds1 = document.getElementById('timer-seconds');

  const timerDays2 = document.getElementById('timer-days-2');
  const timerHours2 = document.getElementById('timer-hours-2');
  const timerMinutes2 = document.getElementById('timer-minutes-2');
  const timerSeconds2 = document.getElementById('timer-seconds-2');

  function calculateTimeDiff(targetDateStr) {
    const targetDate = new Date(targetDateStr);
    
    // 🛑 CONGELADO EN ESTE INSTANTE:
    const now = new Date('2026-11-07T13:45:49'); 
    const diff = Math.max(0, now - targetDate);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      days,
      hours: hours < 10 ? '0' + hours : hours,
      minutes: minutes < 10 ? '0' + minutes : minutes,
      seconds: seconds < 10 ? '0' + seconds : seconds
    };
  }

  function updateAllCounters() {
    // 1. Primer contador: El Comienzo
    if (timerDays1) {
      const t1 = calculateTimeDiff(CONFIG.fechaInicio);
      timerDays1.textContent = t1.days;
      timerHours1.textContent = t1.hours;
      timerMinutes1.textContent = t1.minutes;
      timerSeconds1.textContent = t1.seconds;
    }

    // 2. Segundo contador: Volver a Intentarlo
    if (timerDays2) {
      const t2 = calculateTimeDiff(CONFIG.fechaReintento);
      timerDays2.textContent = t2.days;
      timerHours2.textContent = t2.hours;
      timerMinutes2.textContent = t2.minutes;
      timerSeconds2.textContent = t2.seconds;
    }
  }

  // Muestra el tiempo congelado y ya no se repite cada segundo:
  updateAllCounters();
  // setInterval(updateAllCounters, 1000); // <-- DETENIDO;

  // ==========================================
  // 6. MICROINTERACCIÓN: POLAROIDS 3D FLIP CARDS
  // ==========================================
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      playChime(659.25, 'sine', 0.25);
    });
  });

  // ==========================================
  // REVELADO SUAVE DE LA LÍNEA DE TIEMPO (Scroll Reveal)
  // ==========================================
  const timelineEntries = document.querySelectorAll('.timeline-entry');
  if ('IntersectionObserver' in window && timelineEntries.length > 0) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    timelineEntries.forEach(entry => {
      timelineObserver.observe(entry);
    });
  } else {
    timelineEntries.forEach(entry => entry.classList.add('in-view'));
  }

  // ==========================================
  // 7. GATICOS INTERACTIVOS 🐈 (Frases + Maullido)
  // ==========================================
  const catCards = document.querySelectorAll('.cat-dossier-card');
  const catQuotes = {
    1: [
      "«Miau... Mariana tiene la razón en todo y tú lo sabes 😂»",
      "«Te estoy vigilando. Más te vale cuidar a Mariana.»",
      "«Mariana manda aquí, acéptalo.»",
      "«Si me miras feo te araño las medias.»"
    ],
    2: [
      "«Zzz... 5 minutitos más y me levanto.»",
      "«No molestar, estoy ocupado durmiendo entre las cobijas.»",
      "«Mi trabajo de tiempo completo es dormir 18 horas.»",
      "«Miau... déjame acurrucarme.»"
    ],
    3: [
      "«¡Modo turbo activado a las 3 de la mañana!»",
      "«Derribé algo pero fue sin culpa, te lo juro.»",
      "«Tú me caes bien, pero Mariana es mi favorita.»",
      "«¿Alguien dijo jugar? ¡Ya voy!»"
    ],
    4: [
      "«Ronroneo de pura felicidad ♡»",
      "«Pongo cara tierna y consigo comida al instante.»",
      "«Un masajito en la cabeza y somos amigos para siempre.»",
      "«Miau... dale un beso a Mariana de mi parte.»"
    ]
  };

  const catIndices = { 1: 0, 2: 0, 3: 0, 4: 0 };

  catCards.forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.getAttribute('data-cat');
      const bubble = document.getElementById(`bubble-cat-${catId}`);
      
      playMeow();

      if (bubble && catQuotes[catId]) {
        catIndices[catId] = (catIndices[catId] + 1) % catQuotes[catId].length;
        bubble.textContent = catQuotes[catId][catIndices[catId]];
        bubble.classList.add('active');
        
        card.style.transform = 'scale(1.03) translateY(-6px)';
        setTimeout(() => {
          card.style.transform = '';
        }, 200);
      }
    });
  });

  // ==========================================
  // 8. MINIJUEGO: ¿QUÉ TANTO ME QUIERES? 👀
  // ==========================================
  const loveSlider = document.getElementById('love-slider');
  const sliderEmoji = document.getElementById('slider-emoji');

  if (loveSlider && sliderEmoji) {
    loveSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      let emoji = "🙂";

      if (val === 0) {
        emoji = "💀";
      } else if (val <= 15) {
        emoji = "🤨";
      } else if (val <= 30) {
        emoji = "😐";
      } else if (val <= 45) {
        emoji = "🙂";
      } else if (val <= 65) {
        emoji = "😊";
      } else if (val <= 80) {
        emoji = "🥰";
      } else if (val <= 95) {
        emoji = "😍";
      } else {
        emoji = "💖";
        playChime(783.99);
      }

      sliderEmoji.textContent = emoji;
      sliderEmoji.style.transform = 'scale(1.3)';
      setTimeout(() => {
        sliderEmoji.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // ==========================================
  // 9. MINIJUEGO: DATO CURIOSO 👀
  // ==========================================
  const triviaBox = document.getElementById('trivia-box');
  const btnTrivia = document.getElementById('btn-trivia');

  const curiosidades = [
    "📖 El trabajo de filosofía sobre el epicureísmo fue la mejor excusa para empezar a hablar contigo todos los días.",
    "🏀 Cuando me preguntaron en la cancha el 26 de septiembre de 2025 si me gustabas, el 'sí' me salió automático sin dudarlo.",
    "🎮 En Roblox pasábamos horas en '99 noches' y 'Roba un brainrot', riéndonos de cualquier bobada.",
    "💬 En febrero de 2026 cuando te acercaste a preguntar sobre intentar algo, sentí una alegría inmensa.",
    "✨ El 6 de marzo de 2026 fue cuando decidí preguntarte si querías que lo intentáramos de nuevo.",
    "🪑 El primer beso en la mecedora de tu sala: me puse un poco nervioso con mi reacción, pero sé que tengo una segunda oportunidad para cuando nos demos un verdadero beso.",
    "🌸 Verte con el cabello suelto me reinicia el sistema por completo cada vez.",
    "☕ Respeto mucho tu espacio y tu tranquilidad; cada momento simple contigo vale oro."
  ];

  let triviaIndex = 0;
  if (btnTrivia && triviaBox) {
    btnTrivia.addEventListener('click', () => {
      playChime(659.25);
      triviaIndex = (triviaIndex + 1) % curiosidades.length;
      triviaBox.style.opacity = '0';
      setTimeout(() => {
        triviaBox.textContent = curiosidades[triviaIndex];
        triviaBox.style.opacity = '1';
      }, 150);
    });
  }

  // ==========================================
  // 10. MINIJUEGO: BOTÓN "NO TOCAR" ⚠️
  //     (Pantalla en negro durante 5 segundos)
  // ==========================================
  const btnNoTocar = document.getElementById('btn-no-tocar');
  const blackoutScreen = document.getElementById('blackout-screen');

  if (btnNoTocar && blackoutScreen) {
    btnNoTocar.addEventListener('click', () => {
      blackoutScreen.classList.remove('hidden');
      setTimeout(() => {
        blackoutScreen.classList.add('hidden');
      }, 5000);
    });
  }

  // ==========================================
  // 11. BUZÓN DE QUEJITAS 😂
  // ==========================================
  const btnDejarQueja = document.getElementById('btn-dejar-queja');
  const btnPerdonar = document.getElementById('btn-perdonar');
  const complaintResult = document.getElementById('complaint-result');
  const modalQuejita = document.getElementById('modal-quejita');
  const btnEnviarQuejita = document.getElementById('btn-enviar-quejita');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const textoQuejita = document.getElementById('texto-quejita');

  if (btnDejarQueja && modalQuejita) {
    btnDejarQueja.addEventListener('click', () => {
      playChime(587.33);
      modalQuejita.classList.remove('hidden');
    });
  }

  if (btnCerrarModal && modalQuejita) {
    btnCerrarModal.addEventListener('click', () => {
      modalQuejita.classList.add('hidden');
    });
  }

  if (btnEnviarQuejita && modalQuejita) {
    btnEnviarQuejita.addEventListener('click', () => {
      playChime(659.25);
      modalQuejita.classList.add('hidden');
      if (complaintResult) {
        complaintResult.classList.remove('hidden');
        complaintResult.innerHTML = `
          <strong>Queja recibida con éxito:</strong><br>
          La voy a tener muy en cuenta para consentirte más y corregirlo. Cero rencores ♡
        `;
      }
      textoQuejita.value = '';
    });
  }

  if (btnPerdonar && complaintResult) {
    btnPerdonar.addEventListener('click', () => {
      playChime(783.99);
      complaintResult.classList.remove('hidden');
      complaintResult.innerHTML = `
        <strong>¡Gracias por la paciencia! 😇</strong><br>
        Has ganado <strong>+100 puntos</strong> conmigo para canjear por besos o comida rica.
      `;
    });
  }

  // ==========================================
  // 12. MECÁNICA DEL BOTÓN "NO" ESQUIVO & PROPUESTA
  // ==========================================
  const btnNo = document.getElementById('btn-no');
  const btnYes = document.getElementById('btn-yes');
  const proposalArena = document.getElementById('proposal-arena');
  const proposalHint = document.getElementById('proposal-hint-text');
  const modalSuccess = document.getElementById('modal-proposal-success');
  const btnCloseProposalModal = document.getElementById('btn-close-proposal-modal');

  let noAttempts = 0;

  function moveNoButton() {
    if (!btnNo || !proposalArena) return;

    noAttempts++;

    // Cambiar texto del botón No
    const phraseIndex = (noAttempts - 1) % CONFIG.frasesNo.length;
    btnNo.textContent = CONFIG.frasesNo[phraseIndex];

    // Hacer crecer progresivamente el botón "Sí"
    const scale = 1 + Math.min(noAttempts * 0.12, 1.6);
    btnYes.style.transform = `scale(${scale})`;
    btnYes.style.boxShadow = `0 0 ${16 + noAttempts * 5}px rgba(232, 93, 142, 0.7)`;

    // Sonido sutil de esquiva
    playChime(440 + noAttempts * 30, 'triangle', 0.2);

    // Calcular posición segura dentro del contenedor sin salirse
    const arenaRect = proposalArena.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const padding = 16;
    const maxX = Math.max(0, arenaRect.width - btnRect.width - padding * 2);
    const maxY = Math.max(0, arenaRect.height - btnRect.height - padding * 2);

    const randomX = Math.floor(Math.random() * maxX) + padding;
    const randomY = Math.floor(Math.random() * maxY) + padding;

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;

    // Actualizar pista divertida
    if (proposalHint) {
      if (noAttempts >= 6) {
        proposalHint.innerHTML = "<span>¡Mariana, es evidente que el destino quiere que toques el 'Sí'! 😂💖</span>";
      } else {
        proposalHint.innerHTML = `<span>Intentos de escapar: ${noAttempts} / El botón "Sí" se hace irresistible...</span>`;
      }
    }
  }

  if (btnNo) {
    // Evadir en mouseover (computadora) y touchstart (celular)
    btnNo.addEventListener('mouseenter', moveNoButton);
    btnNo.addEventListener('touchstart', (e) => {
      e.preventDefault();
      moveNoButton();
    });
    btnNo.addEventListener('click', (e) => {
      e.preventDefault();
      moveNoButton();
    });
  }

  // Lanzador de Confetti con corazones usando Canvas Confetti
  function launchConfettiCelebration() {
    if (typeof confetti === 'function') {
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 70, zIndex: 99999 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 55 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.1, y: Math.random() - 0.2 },
          colors: ['#E85D8E', '#F7B6C8', '#FCE4EC', '#B83263', '#FFF8FA', '#7A2946']
        }));
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: Math.random() * 0.4 + 0.5, y: Math.random() - 0.2 },
          colors: ['#E85D8E', '#F7B6C8', '#FCE4EC', '#B83263', '#FFF8FA', '#7A2946']
        }));
      }, 250);
    }
  }

  if (btnYes) {
    btnYes.addEventListener('click', () => {
      playCelebrationFanfare();
      launchConfettiCelebration();

      if (modalSuccess) {
        modalSuccess.classList.remove('hidden');
      }
    });
  }

  if (btnCloseProposalModal && modalSuccess) {
    btnCloseProposalModal.addEventListener('click', () => {
      modalSuccess.classList.add('hidden');
    });
  }

  // ==========================================
  // 13. SELLO DE LA CARTA 💌
  // ==========================================
  const btnSeal = document.getElementById('btn-seal');
  if (btnSeal) {
    btnSeal.addEventListener('click', () => {
      playCelebrationFanfare();
      btnSeal.innerHTML = `
        <span class="seal-icon">💖</span>
        <span class="seal-text">¡Sellada con todo mi amor!</span>
      `;
      btnSeal.style.background = 'linear-gradient(135deg, #15803d, #166534)';

      // Disparar confeti
      launchConfettiCelebration();

      // Lluvia de corazones desde el botón
      for (let i = 0; i < 28; i++) {
        setTimeout(() => {
          const rect = btnSeal.getBoundingClientRect();
          const startX = rect.left + rect.width / 2 + (Math.random() - 0.5) * 140;
          const startY = rect.top + (Math.random() - 0.5) * 50;
          createHeartParticle(startX, startY, i % 2 === 0 ? '❤️' : '♡');
        }, i * 40);
      }
    });
  }

  // ==========================================
  // 14. MINI-PLAYER FLOTANTE DE MÚSICA (SPOTIFY OFFICIAL IFRAME API)
  // ==========================================
  const miniPlayer = document.getElementById('mini-music-player');
  const spotifyTrackCounter = document.getElementById('spotify-track-counter');
  const btnPrevTrack = document.getElementById('btn-prev-track');
  const btnPlayPauseSpotify = document.getElementById('btn-play-pause-spotify');
  const btnNextTrack = document.getElementById('btn-next-track');
  const btnPlaylistToggle = document.getElementById('btn-playlist-toggle');
  const btnClosePlaylist = document.getElementById('btn-close-playlist');
  const playlistMenu = document.getElementById('player-playlist-menu');
  const drawerList = document.getElementById('spotify-drawer-list');
  const btnToggleCollapse = document.getElementById('btn-toggle-collapse');
  const btnOpenPlayer = document.getElementById('btn-open-player');
  const spotifyAutoplayBanner = document.getElementById('spotify-autoplay-banner');
  const btnContinueNext = document.getElementById('btn-continue-next');

  const playlist = CONFIG.playlist || [];
  let currentTrackIndex = 0;
  let embedController = null;
  let isPlaybackActive = false;
  let trackFinishedHandled = false;
  let autoplayPromptTimer = null;
  let currentPlayingUri = '';

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Renderizar la lista de las 9 canciones en el cajón desplegable
  function renderPlaylistDrawer() {
    if (!drawerList) return;
    drawerList.innerHTML = '';
    playlist.forEach((track, idx) => {
      const item = document.createElement('div');
      item.className = `spotify-drawer-item ${idx === currentTrackIndex ? 'active' : ''}`;
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.setAttribute('title', `Reproducir ${track.titulo} de ${track.artista}`);
      item.innerHTML = `
        <span class="spotify-item-num">${idx + 1}</span>
        <div class="spotify-item-info">
          <span class="spotify-item-title">${escapeHTML(track.titulo)}</span>
          <span class="spotify-item-artist">${escapeHTML(track.artista)}</span>
        </div>
        ${idx === currentTrackIndex ? '<span class="spotify-item-indicator">▶</span>' : ''}
      `;
      item.addEventListener('click', () => {
        hideAutoplayBanner();
        loadSpotifyTrack(idx, true, false);
        if (playlistMenu) playlistMenu.classList.add('hidden');
      });
      drawerList.appendChild(item);
    });
  }

  // Actualizar indicadores visuales de pista
  function updateTrackUI(index) {
    if (spotifyTrackCounter) {
      spotifyTrackCounter.textContent = `${index + 1} de ${playlist.length}`;
    }
    renderPlaylistDrawer();
  }

  // Actualizar estado del botón Play/Pause en la barra
  function updatePlayPauseUI(isPlaying) {
    isPlaybackActive = isPlaying;
    if (btnPlayPauseSpotify) {
      btnPlayPauseSpotify.innerHTML = isPlaying ? '⏸' : '▶';
      btnPlayPauseSpotify.title = isPlaying ? 'Pausar música' : 'Reproducir música';
      if (isPlaying) {
        btnPlayPauseSpotify.classList.add('active-playing');
      } else {
        btnPlayPauseSpotify.classList.remove('active-playing');
      }
    }
  }

  // Mostrar el botón de interacción si el navegador bloquea el autoplay al terminar una canción
  function showAutoplayBanner(trackTitle) {
    if (spotifyAutoplayBanner) {
      if (btnContinueNext) {
        btnContinueNext.innerHTML = `<span class="play-triangle">▶</span> Continuar con la siguiente: <strong>${escapeHTML(trackTitle)}</strong>`;
      }
      spotifyAutoplayBanner.classList.remove('hidden');
    }
  }

  // Ocultar el banner de autoplay cuando ya se está reproduciendo o se cambia manualmente
  function hideAutoplayBanner() {
    if (autoplayPromptTimer) {
      clearTimeout(autoplayPromptTimer);
      autoplayPromptTimer = null;
    }
    if (spotifyAutoplayBanner) {
      spotifyAutoplayBanner.classList.add('hidden');
    }
  }

  // Cargar una pista dinámicamente en el único controlador oficial de Spotify
  function loadSpotifyTrack(index, autoPlay = false, isAutoAdvance = false) {
    if (!playlist || playlist.length === 0) return;
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;

    currentTrackIndex = index;
    trackFinishedHandled = false;
    const track = playlist[currentTrackIndex];

    updateTrackUI(currentTrackIndex);

    if (embedController) {
      // Usar URI oficial de Spotify
      const spotifyUri = `spotify:track:${track.id}`;
      embedController.loadEntity(spotifyUri);

      if (autoPlay) {
        // Intentar reproducción a través de la API oficial
        try {
          embedController.play();
        } catch (err) {
          console.warn('Spotify play() warning:', err);
        }
      }

      if (isAutoAdvance) {
        // Políticas de autoplay del navegador:
        // Si el navegador bloquea el autoplay sin interacción directa del usuario,
        // esperamos 1.6s. Si no arrancó la reproducción activa, mostramos el botón claro de continuar.
        if (autoplayPromptTimer) clearTimeout(autoplayPromptTimer);
        autoplayPromptTimer = setTimeout(() => {
          if (!isPlaybackActive) {
            showAutoplayBanner(track.titulo);
          }
        }, 1600);
      } else {
        hideAutoplayBanner();
      }
    }
  }

  // Cuando se detecta que la canción actual terminó
  function onTrackEnded() {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    loadSpotifyTrack(nextIndex, true, true);
  }

  // Configuración de los eventos oficiales del Spotify iFrame API
  function setupSpotifyEvents(controller) {
    // 1. Evento 'ready': El controlador está listo
    controller.addListener('ready', () => {
      updateTrackUI(currentTrackIndex);
    });

    // 2. Evento 'playback_started': Se inició la reproducción de una URI
    controller.addListener('playback_started', (e) => {
      const data = e.data || e;
      if (data && data.uri) {
        currentPlayingUri = data.uri;
      }
      updatePlayPauseUI(true);
      hideAutoplayBanner();
    });

    // 3. Evento 'playback_update': Estado en tiempo real (position, duration, isPaused, isBuffering)
    controller.addListener('playback_update', (e) => {
      const data = e.data || e;
      if (!data) return;

      const { position, duration, isPaused } = data;

      if (typeof isPaused === 'boolean') {
        updatePlayPauseUI(!isPaused);
        if (!isPaused) {
          hideAutoplayBanner();
        }
      }

      // Detección precisa de fin de canción oficial:
      // duration y position están en milisegundos en Spotify Embeds.
      // Evitamos falsos positivos en los primeros 2.5 segundos.
      if (!trackFinishedHandled && duration > 0 && position > 2500) {
        const remainingMs = duration - position;
        const reachedEnd = (remainingMs <= 1200 && isPaused) || (position >= duration - 400);

        if (reachedEnd) {
          trackFinishedHandled = true;
          onTrackEnded();
        }
      }
    });

    // 4. Evento 'error'
    controller.addListener('error', (e) => {
      console.warn('Spotify EmbedController error:', e);
    });
  }

  // Inicializar el controlador oficial cuando la API esté lista
  function initializeSpotifyController(IFrameAPI) {
    const targetElement = document.getElementById('spotify-embed-target');
    if (!targetElement) return;

    const initialTrack = playlist[0];
    const options = {
      uri: `spotify:track:${initialTrack.id}`,
      width: '100%',
      height: '152'
    };

    IFrameAPI.createController(targetElement, options, (controller) => {
      embedController = controller;
      setupSpotifyEvents(controller);
    });
  }

  // Conectar con el callback global oficial de Spotify
  window.onSpotifyIframeApiReady = (IFrameAPI) => {
    initializeSpotifyController(IFrameAPI);
  };

  // Fallback de seguridad: si la API ya cargó antes o tras timeout
  setTimeout(() => {
    if (!embedController && window.SpotifyIframeApi) {
      initializeSpotifyController(window.SpotifyIframeApi);
    } else if (!embedController) {
      // Respaldo de iframe estándar si la red externa tarda
      const container = document.getElementById('spotify-embed-container');
      const target = document.getElementById('spotify-embed-target');
      if (container && target) {
        target.innerHTML = `
          <iframe 
            id="spotify-embed-fallback-frame"
            src="https://open.spotify.com/embed/track/${playlist[0].id}?utm_source=generator&theme=0" 
            width="100%" 
            height="152" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            title="Spotify Embed">
          </iframe>
        `;
      }
    }
  }, 4000);

  // ==========================================
  // EVENT LISTENERS DE CONTROLES
  // ==========================================

  // Botón "Anterior"
  if (btnPrevTrack) {
    btnPrevTrack.addEventListener('click', () => {
      hideAutoplayBanner();
      loadSpotifyTrack(currentTrackIndex - 1, true, false);
    });
  }

  // Botón "Siguiente"
  if (btnNextTrack) {
    btnNextTrack.addEventListener('click', () => {
      hideAutoplayBanner();
      loadSpotifyTrack(currentTrackIndex + 1, true, false);
    });
  }

  // Botón "Play / Pause"
  if (btnPlayPauseSpotify) {
    btnPlayPauseSpotify.addEventListener('click', () => {
      hideAutoplayBanner();
      if (embedController) {
        embedController.togglePlay();
      }
    });
  }

  // Botón "Continuar con la siguiente" (cuando autoplay fue bloqueado por política del navegador)
  if (btnContinueNext) {
    btnContinueNext.addEventListener('click', () => {
      hideAutoplayBanner();
      if (embedController) {
        embedController.play();
      }
    });
  }

  // Desplegable de playlist (drawer)
  if (btnPlaylistToggle && playlistMenu) {
    btnPlaylistToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      playlistMenu.classList.toggle('hidden');
    });
  }

  if (btnClosePlaylist && playlistMenu) {
    btnClosePlaylist.addEventListener('click', () => {
      playlistMenu.classList.add('hidden');
    });
  }

  // Cerrar cajón de canciones al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (playlistMenu && !playlistMenu.contains(e.target) && e.target !== btnPlaylistToggle && !btnPlaylistToggle?.contains(e.target)) {
      playlistMenu.classList.add('hidden');
    }
  });

  // Minimizar / Reabrir reproductor flotante
  if (btnToggleCollapse && miniPlayer && btnOpenPlayer) {
    btnToggleCollapse.addEventListener('click', () => {
      miniPlayer.classList.add('minimized');
      btnOpenPlayer.classList.remove('hidden');
      if (playlistMenu) playlistMenu.classList.add('hidden');
      hideAutoplayBanner();
    });
  }

  if (btnOpenPlayer && miniPlayer) {
    btnOpenPlayer.addEventListener('click', () => {
      miniPlayer.classList.remove('minimized');
      btnOpenPlayer.classList.add('hidden');
    });
  }

  // Inicializar UI visual y cajón de canciones
  updateTrackUI(0);

});
