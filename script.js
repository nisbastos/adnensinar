/* ==========================================================================
   ADN Ensinar — script.js (limpo, modular e tolerante a elementos opcionais)
   ========================================================================== */

(() => {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================
     1) Carrossel (Sobre Nós)
     - Suporta múltiplos carrosseis: basta usar data-carousel
     ========================= */
  function initCarousels() {
    const carousels = $$("[data-carousel]");

    carousels.forEach((carousel) => {
      const imagens = $$("img", carousel);
      const btnPrev = $("[data-carousel-prev]", carousel);
      const btnNext = $("[data-carousel-next]", carousel);

      if (!imagens.length) return;

      let indexAtual = imagens.findIndex((img) => img.classList.contains("active"));
      if (indexAtual < 0) indexAtual = 0;

      const mostrar = (idx) => {
        imagens.forEach((img, i) => img.classList.toggle("active", i === idx));
      };

      const proxima = () => {
        indexAtual = (indexAtual + 1) % imagens.length;
        mostrar(indexAtual);
      };

      const anterior = () => {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        mostrar(indexAtual);
      };

      btnPrev?.addEventListener("click", anterior);
      btnNext?.addEventListener("click", proxima);

      // autoplay (pausa ao passar o rato)
      let timer = window.setInterval(proxima, 4000);

      carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
      carousel.addEventListener("mouseleave", () => (timer = window.setInterval(proxima, 4000)));

      mostrar(indexAtual);
    });
  }

  /* =========================
     2) Alerta (opcional)
     - Usa data-alert-close
     ========================= */
  function initAlertBar() {
    const closeBtn = $("[data-alert-close]");
    const alerta = $("#alerta");
    if (!closeBtn || !alerta) return;

    closeBtn.addEventListener("click", () => {
      alerta.style.display = "none";
    });
  }

  /* =========================
     3) Countdown (opcional)
     - Marca o elemento com id="contador" e data-deadline="YYYY-MM-DDTHH:mm:ss"
     Ex: <span id="contador" class="contador" data-deadline="2026-06-30T23:59:59"></span>
     ========================= */
  function initCountdown() {
    const contador = $("#contador");
    if (!contador) return;

    const raw = contador.getAttribute("data-deadline");
    if (!raw) return;

    const deadline = new Date(raw).getTime();
    if (Number.isNaN(deadline)) return;

    const tick = () => {
      const agora = Date.now();
      const restante = deadline - agora;

      if (restante <= 0) {
        contador.textContent = "O tempo acabou!";
        window.clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
      const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((restante % (1000 * 60)) / 1000);

      contador.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
    };

    tick();
    const intervalo = window.setInterval(tick, 1000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCarousels();
    initAlertBar();
    initCountdown();
  });
})();


// Logo (barra fixa): voltar à homepage / refresh
document.addEventListener("DOMContentLoaded", () => {
  const homeLogo = document.querySelector(".floating-top__logo");
  if (!homeLogo) return;
  homeLogo.addEventListener("click", (e) => {
    const home = `${window.location.origin}/`;
    if (window.location.href === home || window.location.href === home + "#") {
      e.preventDefault();
      window.location.reload();
    }
  });
});
