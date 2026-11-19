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

/* Transitions entre pages : sortie en fondu, photos en fondu au chargement */
(function () {
  document.querySelectorAll('.card>img').forEach((im) => {
    const ok = () => im.classList.add('ok');
    im.complete && im.naturalWidth ? ok() : im.addEventListener('load', ok, { once: true });
  });
  if (document.startViewTransition && CSS.supports && CSS.supports('selector(::view-transition)')) return; // fondu natif
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return; // liens internes à la page : routeur
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(() => (location.href = u.href), 420);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) document.body.classList.remove('leaving'); });
})();
