// custom_Musica.js
const audio = document.getElementById("musica");
const boton = document.getElementById("boton");
const icono = document.getElementById("reproductor");

let alreadyPlayed = false;

// ---- BOTÓN PAUSAR / REPRODUCIR ----
boton.addEventListener("click", () => {

    // Si está pausado → reproducir
    if (audio.paused) {
        audio.muted = false;
        audio.play();
        icono.classList.remove("fa-volume-mute");
        icono.classList.add("fa-volume-up");
    } 
    
    // Si está reproduciendo → pausar
    else {
        audio.pause();
        icono.classList.remove("fa-volume-up");
        icono.classList.add("fa-volume-mute");
    }
});

(function(){
  // helper: espera hasta que exista el elemento audio
  function waitForAudio(cb, maxMs = 5000) {
    const start = Date.now();
    const poll = setInterval(() => {
      const audio = document.getElementById('musica') || document.querySelector('audio');
      if (audio) {
        clearInterval(poll);
        cb(audio);
      } else if (Date.now() - start > maxMs) {
        clearInterval(poll);
        console.warn('Audio no apareció en DOM dentro de', maxMs, 'ms');
        cb(null);
      }
    }, 100);
  }

  waitForAudio(function(audio){
    if (!audio) {
      console.error('No se encontró elemento <audio>. Revisa que el HTML tenga <audio id="musica">.');
      return;
    }

    console.log('audio encontrado:', audio);

    // botón fallback
    const btn = document.getElementById('play-fallback');

    // estado
    let alreadyTried = false;
    let played = false;

    function fadeIn(target = 0.4, step = 0.02, intervalMs = 120) {
      try { audio.volume = 0; } catch (e) {}
      let vol = 0;
      const h = setInterval(() => {
        vol = Math.min(target, vol + step);
        try { audio.volume = vol; } catch(e) {}
        if (vol >= target) clearInterval(h);
      }, intervalMs);
    }

    function tryPlay(evt) {
      if (played) return;
      alreadyTried = true;
      console.log('Intentando play() por evento:', evt && evt.type ? evt.type : 'manual');

      // asegurar no muted
      try { audio.muted = false; } catch (e) { console.warn('No se pudo cambiar muted:', e); }

      const p = audio.play();
      if (p && typeof p.then === 'function') {
        p.then(() => {
          console.log('play() aceptado -> reproducido');
          played = true;
          fadeIn(0.4, 0.02, 120);
          hideFallback();
          removeAllListeners();
        }).catch(err => {
          console.warn('play() rechazado:', err);
          showFallback();
        });
      } else {
        // navegadores antiguos
        console.log('play() sin promesa, asumiendo reproducción');
        played = true;
        fadeIn(0.4, 0.02, 120);
        hideFallback();
        removeAllListeners();
      }
    }

    function showFallback() {
      if (!btn) return;
      btn.style.display = 'inline-block';
    }
    function hideFallback() {
      if (!btn) return;
      btn.style.display = 'none';
    }

    // listeners que cuentan como interacción
    const events = ['scroll','touchstart','click','pointerdown','wheel','keydown','touchmove'];

    function addAllListeners() {
      events.forEach(ev => window.addEventListener(ev, tryPlay, { passive: true }));
      // también intentar cuando la pestaña se vuelve visible
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') tryPlay({type:'visibilitychange'});
      });
    }

    function removeAllListeners() {
      events.forEach(ev => window.removeEventListener(ev, tryPlay));
    }

    // fallback: si botón existe, activar la música cuando lo presionen
    if (btn) {
      btn.addEventListener('click', function(){
        console.log('play fallback: click en botón');
        tryPlay({type:'fallback-button'});
      });
    }

    // check básico de la carga del audio (Network)
    try {
      const sources = audio.querySelectorAll('source');
      sources.forEach(s => {
        console.log('source:', s.src || s.getAttribute('src'));
      });
    } catch(e){}

    // intentamos reproducir inmediatamente por si el navegador lo permite
    tryPlay({type:'initial-attempt'});

    // si no se reprodujo, añadimos listeners de interacción
    if (!played) {
      addAllListeners();
      // si tras 2 segundos no hay interacción y no se reprodujo, mostramos fallback
      setTimeout(() => {
        if (!played && !alreadyTried) {
          console.log('Sin interacción detectada en 2s: mostrando botón fallback');
          showFallback();
        }
      }, 2000);
    }
  });
})();

// --- Pausar música cuando el usuario cambia de pestaña ---
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Si el usuario sale de la pestaña → pausar
      audio.pause();
    } else {
      // Si regresa a la pestaña → opcional: volver a reproducir
      audio.play();   // ← si NO quieres que reproduzca solo al volver, quítalo
    }
  });


