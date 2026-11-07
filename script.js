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

  // 🛑 FECHA EXACTA DE DETENCIÓN (Congelado justo ahora)
  fechaDetencion: '2026-11-07T13:49:50',

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
    const notes = [523.25, 659.25, 783.99, 1046.50];
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
  // 5. CONTADORES DETENIDOS (CONGELADOS EN ESTE INSTANTE)
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
    // Usamos la fecha fija de detención (no avanza más):
    const now = new Date(CONFIG.fechaDetencion);
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
    // 1. Primer contador
    if (timerDays1) {
      const t1 = calculateTimeDiff(CONFIG.fechaInicio);
      timerDays1.textContent = t1.days;
      timerHours1.textContent = t1.hours;
      timerMinutes1.textContent = t1.minutes;
      timerSeconds1.textContent = t1.seconds;
    }

    // 2. Segundo contador
    if (timerDays2) {
      const t2 = calculateTimeDiff(CONFIG.fechaReintento);
      timerDays2.textContent = t2.days;
      timerHours2.textContent = t2.hours;
      timerMinutes2.textContent = t2.minutes;
      timerSeconds2.textContent = t2.seconds;
    }
  }

  // Se calculan una sola vez y quedan fijos:
  updateAllCounters();
  // setInterval(updateAllCounters, 1000); // <-- DETENIDO

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
      if (textoQuejita) textoQuejita.value = '';
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
  const modalSuccess = document.getElementById('modal-proposal-success');
  const btnCloseProposalModal = document.getElementById('btn-close-proposal-modal');

  let noAttempts = 0;

  function moveNoButton() {
    if (!btnNo || !proposalArena) return;

    noAttempts++;

    // Cambiar texto del botón No
    const phraseIndex = (noAttempts - 1) % CONFIG.frasesNo.length;
    btnNo.textContent = CONFIG.frasesNo[phraseIndex];

    // Hacer crecer progresivamente el botón Sí
    if (btnYes
