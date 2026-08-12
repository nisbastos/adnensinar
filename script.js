/* ==========================================================================
   ADN Ensinar — script.js (limpo, modular e tolerante a elementos opcionais)
   ========================================================================== */

(() => {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================
     1) Carrossel (opcional)
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

  /* =========================
     4) Menu de navegação (mobile)
     ========================= */
  function initNavToggle() {
    const toggle = $("[data-nav-toggle]");
    const nav = $("[data-site-nav]");
    if (!toggle || !nav) return;

    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Fecha o menu ao escolher uma ligação
    $$("a", nav).forEach((link) => link.addEventListener("click", closeMenu));

    // Fecha o menu com a tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* =========================
     5) Sombra do cabeçalho ao fazer scroll
     ========================= */
  function initHeaderShadow() {
    const header = $("[data-header]");
    if (!header) return;

    const threshold = 10;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =========================
     6) Ano no rodapé
     ========================= */
  function initFooterYear() {
    $$("[data-ano]").forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initCarousels();
    initAlertBar();
    initCountdown();
    initNavToggle();
    initHeaderShadow();
    initFooterYear();
  });
})();
