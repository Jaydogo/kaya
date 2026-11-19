/* Défilement doux et lent (Lenis) pour le sommaire et les pistes Kaya.
   Molette / trackpad amortis ; sur écran tactile, défilement natif du doigt. */
(function () {
  if (!window.Lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const css = document.createElement('style');
  css.textContent = 'html.lenis,html.lenis body{height:auto}.lenis.lenis-smooth{scroll-behavior:auto!important}.lenis.lenis-stopped{overflow:hidden}';
  document.head.appendChild(css);

  const lenis = new Lenis({
    duration: 1.6,                                   // amorti long
    easing: (t) => 1 - Math.pow(1 - t, 4),           // sortie douce
    wheelMultiplier: 0.8,                            // défilement plus lent
    smoothWheel: true,
    syncTouch: false,                                // tactile : natif
    prevent: (node) => !!(node.closest && node.closest('.strip,.testis-list,.steps,.prail,.rail,.opts2,.mmenu,.nmenu')),
  });
  window.lenis = lenis;
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);

  // Changement d'écran dans une piste : on repart du haut sans animation
  document.addEventListener('kaya:view', () => lenis.scrollTo(0, { immediate: true, force: true }));
  // Menu plein écran ouvert : on fige le défilement de la page
  new MutationObserver(() => (document.body.classList.contains('menu') ? lenis.stop() : lenis.start()))
    .observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
