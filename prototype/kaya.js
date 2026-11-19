/* KAYA — prototype : données, en-tête / pied de page, fiches et récapitulatif.
   Tout ce qui est entre [crochets] est à fournir par la cliente. */
(function () {
  'use strict';

  var CONFIG = {
    whatsapp: '',            // numéro Kaya au format international sans + ni espaces, ex. 2250700000000
    email: 'contact@kaya.ci' // [À CONFIRMER]
  };

  var DURATIONS = {
    weekend: { label: 'Week-end', sub: '1-2 activités', count: '1 à 2 activités incluses', slots: 2, price: '[PRIX]' },
    mid:     { label: '5-7 jours', sub: '3 activités', count: '3 activités incluses', slots: 3, price: '[PRIX]' },
    long:    { label: '10 jours +', sub: '5-6 activités', count: '5 à 6 activités incluses', slots: 6, price: '[PRIX]' }
  };

  var PACKS = {
    nature:  { name: 'Nature', tone: 't1', lede: "[Description de l'ambiance Nature — deux ou trois phrases à fournir]" },
    culture: { name: 'Culture & Histoire', tone: 't2', lede: "[Description de l'ambiance Culture & Histoire — deux ou trois phrases à fournir]" },
    wild:    { name: 'Wild', tone: 't3', lede: "[Description de l'ambiance Wild — deux ou trois phrases à fournir]" }
  };

  var SELECT = function (id, label, options) { return { id: id, label: label, type: 'select', options: options }; };
  var DATES = [{ id: 'debut', label: 'Date de début', type: 'date' }, { id: 'fin', label: 'Date de fin', type: 'date' }];
  var PEOPLE = { id: 'personnes', label: 'Nombre de personnes', type: 'number' };

  var SERVICES = {
    vehicule: { name: 'Location de véhicule', sub: 'Avec ou sans chauffeur', detail: 'Citadine, berline, 4x4 ou van · avec ou sans chauffeur', tone: 't4',
      fields: [SELECT('type', 'Type de véhicule', ['Citadine', 'Berline', '4x4', 'Van']), DATES, SELECT('chauffeur', 'Chauffeur', ['Avec chauffeur', 'Sans chauffeur'])],
      hint: 'Trajets, horaires, nombre de passagers…' },
    hebergement: { name: 'Hébergement', sub: 'Résidences et hôtels partenaires', detail: 'Résidences privées et hôtels partenaires', tone: 't2',
      fields: [SELECT('type', "Type d'hébergement", ['Résidence privée', 'Hôtel', 'Pas de préférence']), DATES, PEOPLE],
      hint: 'Quartier souhaité, nombre de chambres, budget…' },
    accompagnateurs: { name: 'Accompagnateurs', sub: 'Guides locaux dédiés', detail: 'Un guide local à vos côtés', tone: 't5',
      fields: [DATES, SELECT('langue', 'Langue', ['Français', 'Anglais']), PEOPLE],
      hint: 'Lieux à visiter, centres d’intérêt…' },
    traducteurs: { name: 'Traducteurs', sub: 'Rendez-vous et événements', detail: 'Interprètes pour vos rendez-vous et événements', tone: 't6',
      fields: [SELECT('langues', 'Langues', ['Français ↔ Anglais', 'Autre (préciser)']), DATES, SELECT('cadre', 'Cadre', ['Rendez-vous d’affaires', 'Événement', 'Visite officielle'])],
      hint: 'Nature des échanges, durée, lieu…' },
    securite: { name: 'Sécurité', sub: 'Protection rapprochée', detail: 'Protection rapprochée et escorte', tone: 't3',
      fields: [DATES, SELECT('agents', "Nombre d'agents", ['1', '2', '3 et plus']), PEOPLE],
      hint: 'Contexte, déplacements prévus…' },
    seminaires: { name: 'Séminaires musicaux', sub: 'Événements et animations', detail: 'Événements, séminaires et animations musicales', tone: 't1',
      fields: [{ id: 'date', label: "Date de l'événement", type: 'date' }, { id: 'participants', label: 'Nombre de participants', type: 'number' }, SELECT('format', 'Format', ['Séminaire', 'Soirée', 'Animation'])],
      hint: 'Lieu, ambiance souhaitée, programme…' },
    personnalisable: { name: 'Projet personnalisé', sub: 'Sur devis', detail: 'Un séjour composé entièrement avec vous', tone: 't4',
      fields: [DATES, PEOPLE],
      hint: 'Décrivez votre séjour idéal : envies, rythme, budget…' }
  };

  // Exemples de mise en page : à remplacer par de vrais avis clients (texte, prénom, provenance).
  var TESTIMONIALS = [
    { pack: 'nature', text: 'Tout était prêt à notre arrivée. Nous n’avons eu qu’à profiter, le conseiller a ajusté le programme au jour le jour.', who: '[Prénom N.]', ctx: 'Pack Nature · [Ville, pays]' },
    { pack: 'culture', text: 'Des visites passionnantes et un guide qui connaît chaque histoire d’Abidjan. Une vraie découverte, en toute sérénité.', who: '[Prénom N.]', ctx: 'Pack Culture & Histoire · [Ville, pays]' },
    { pack: 'wild', text: 'Une semaine intense, parfaitement organisée, du vol jusqu’au dernier transfert. On repart déjà avec l’envie de revenir.', who: '[Prénom N.]', ctx: 'Pack Wild · [Ville, pays]' },
    { pack: 'wild', text: 'Réactifs sur WhatsApp à toute heure, des activités hors des sentiers battus : exactement ce que nous cherchions.', who: '[Prénom N.]', ctx: 'Pack Wild · [Ville, pays]' },
    { pack: 'nature', text: 'Un séjour à notre rythme, sans aucune contrainte. Le chauffeur et le guide ont été d’une grande gentillesse.', who: '[Prénom N.]', ctx: 'Pack Nature · [Ville, pays]' },
    { pack: 'culture', text: 'Nous voyagions en famille avec des enfants : chaque détail avait été pensé. Merci à toute l’équipe Kaya.', who: '[Prénom N.]', ctx: 'Pack Culture & Histoire · [Ville, pays]' }
  ];

  var STORE_KEY = 'kaya-recap';
  var page = document.body.getAttribute('data-page');
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var param = function (k) { return new URLSearchParams(location.search).get(k); };

  function save(data) { try { sessionStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {} }
  function load() { try { return JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { return null; } }

  function waLink(text) {
    return 'https://wa.me/' + CONFIG.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  }

  var ICON_WA = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 01-12.4 7.5L3 20l1.1-5.4A8.5 8.5 0 1121 11.5z"/></svg>';
  var ICON_CHECK = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#241510" stroke-width="2.4" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  /* ---------- En-tête & pied de page ---------- */
  function renderNav() {
    var el = $('[data-nav]');
    if (!el) return;
    var active = el.getAttribute('data-nav');
    var cur = function (k) { return active === k ? ' aria-current="page"' : ''; };
    el.innerHTML =
      '<a href="./" class="logo" aria-label="Kaya — accueil">KAYA</a>' +
      '<nav class="nav-links" aria-label="Navigation principale">' +
        '<a href="packs.html" class="navlink"' + cur('packs') + '>Packs découverte</a>' +
        '<a href="prestations.html" class="navlink"' + cur('prestations') + '>Prestations</a>' +
        '<a href="' + waLink() + '" class="navlink" target="_blank" rel="noopener">Contact</a>' +
      '</nav>' +
      '<div class="nav-right">' +
        '<div class="lang" aria-label="Langue"><span>FR</span><span title="Version anglaise à venir">EN</span></div>' +
        '<a href="' + waLink() + '" class="navlink wa" target="_blank" rel="noopener" aria-label="Nous écrire sur WhatsApp">' + ICON_WA + '<span class="wa-label">WhatsApp</span></a>' +
        '<button class="burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><svg width="22" height="10" viewBox="0 0 22 10" aria-hidden="true"><rect width="22" height="1.3" fill="currentColor"/><rect y="8.7" width="14" height="1.3" fill="currentColor"/></svg></button>' +
      '</div>';

    var menu = document.createElement('div');
    menu.className = 'menu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-label', 'Menu');
    menu.innerHTML =
      '<div class="menu-top"><a href="./" class="logo">KAYA</a><button class="menu-close" type="button" aria-label="Fermer le menu"><svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M2 2l14 14M16 2L2 16"/></svg></button></div>' +
      '<nav class="menu-links"><a href="./">Accueil</a><a href="packs.html">Packs découverte</a><a href="prestations.html">Prestations sur-mesure</a><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp &amp; contact</a></nav>' +
      '<div class="menu-foot"><span>La Conciergerie Abidjanaise</span><div class="lang"><span>FR</span><span>EN</span></div></div>';
    document.body.appendChild(menu);
    var burger = $('.burger', el);
    var toggle = function (open) {
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    burger.addEventListener('click', function () { toggle(true); });
    $('.menu-close', menu).addEventListener('click', function () { toggle(false); });
  }

  function renderFoot() {
    var el = $('[data-foot]');
    if (!el) return;
    el.className = 'foot';
    el.innerHTML =
      '<div class="logo">KAYA</div>' +
      '<nav class="foot-links" aria-label="Pied de page"><a href="packs.html">Packs découverte</a><a href="prestations.html">Prestations sur-mesure</a><a href="' + waLink() + '" target="_blank" rel="noopener">WhatsApp &amp; contact</a></nav>' +
      '<small>© Kaya — La Conciergerie Abidjanaise</small>';
  }

  /* ---------- Témoignages ---------- */
  function renderTestimonials(packKey) {
    var el = $('[data-testis]');
    if (!el) return;
    var list = packKey
      ? TESTIMONIALS.filter(function (t) { return t.pack === packKey; })
      : [TESTIMONIALS[0], TESTIMONIALS[1], TESTIMONIALS[2]];
    if (!list.length) { el.hidden = true; return; }
    $('.testis-list', el).innerHTML = list.map(function (t) {
      return '<figure class="testi"><blockquote>« ' + esc(t.text) + ' »</blockquote><figcaption><b>' + esc(t.who) + '</b>' + esc(t.ctx) + '</figcaption></figure>';
    }).join('');
    if (list.length > 1) swipeControls(el, list.length);
    el.insertAdjacentHTML('beforeend', '<p class="testis-note">Exemples de mise en page — à remplacer par de vrais avis clients.</p>');
  }

  // Points + flèches du swipe mobile (masqués sur desktop)
  function swipeControls(el, count) {
    var track = $('.testis-list', el);
    var arrow = function (d) { return '<svg width="16" height="12" viewBox="0 0 20 16" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="' + (d < 0 ? 'M9 2L2 8l7 6M2 8h16' : 'M11 2l7 6-7 6M18 8H2') + '"/></svg>'; };
    var dotsHtml = '';
    for (var k = 0; k < count; k++) dotsHtml += '<span' + (k ? '' : ' class="on"') + '></span>';
    track.insertAdjacentHTML('afterend',
      '<div class="swipe-ctrl"><div class="swipe-dots" aria-hidden="true">' + dotsHtml + '</div>' +
      '<div class="swipe-arrows"><button type="button" data-dir="-1" aria-label="Témoignage précédent" disabled>' + arrow(-1) + '</button>' +
      '<button type="button" data-dir="1" aria-label="Témoignage suivant">' + arrow(1) + '</button></div></div>');
    var dots = el.querySelectorAll('.swipe-dots span');
    var prev = $('[data-dir="-1"]', el);
    var next = $('[data-dir="1"]', el);
    var step = function () { return track.children[1].offsetLeft - track.children[0].offsetLeft; };
    var current = function () { return Math.min(Math.round(track.scrollLeft / step()), count - 1); };
    var sync = function () {
      var i = current();
      dots.forEach(function (d, j) { d.classList.toggle('on', j === i); });
      prev.disabled = i <= 0;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    track.addEventListener('scroll', sync, { passive: true });
    el.querySelectorAll('[data-dir]').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = Math.max(0, Math.min(count - 1, current() + +b.getAttribute('data-dir')));
        track.scrollTo({ left: i * step() });
      });
    });
  }

  /* ---------- Fiche pack ---------- */
  function renderPack() {
    var key = PACKS[param('p')] ? param('p') : 'wild';
    var pack = PACKS[key];
    var state = { duration: 'mid', picks: {}, flight: false };
    document.title = 'Pack ' + pack.name + ' — Kaya';
    $('[data-pack-name]').textContent = pack.name;
    $('[data-pack-lede]').textContent = pack.lede;
    $('.hero').classList.add(pack.tone);

    var tabs = $('[data-tabs]');
    var slots = $('[data-slots]');

    function draw() {
      var d = DURATIONS[state.duration];
      tabs.innerHTML = Object.keys(DURATIONS).map(function (k) {
        return '<button type="button" class="tab" role="tab" aria-selected="' + (k === state.duration) + '" data-dur="' + k + '"><b>' + DURATIONS[k].label + '</b><span>' + DURATIONS[k].sub + '</span></button>';
      }).join('');
      $('[data-count]').textContent = d.count;
      $('[data-price]').textContent = d.price + ' · ' + d.label;
      var html = '';
      for (var i = 1; i <= d.slots; i++) {
        var chosen = state.picks[i] || 0;
        html += '<div class="slot"><div class="slot-label">Catégorie ' + i + '</div><div class="opts">' +
          ['A', 'B', 'C'].map(function (l, j) {
            return '<button type="button" class="opt" aria-pressed="' + (chosen === j) + '" data-slot="' + i + '" data-opt="' + j + '">' +
              '<div class="img t' + (((i + j) % 6) + 1) + '"><span class="check">' + ICON_CHECK + '</span></div>' +
              '<div class="lbl">[Activité ' + String.fromCharCode(64 + (i - 1) * 3 + j + 1) + ']</div></button>';
          }).join('') + '</div></div>';
      }
      slots.innerHTML = html;
    }

    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('[data-dur]');
      if (b) { state.duration = b.getAttribute('data-dur'); draw(); }
    });
    slots.addEventListener('click', function (e) {
      var b = e.target.closest('[data-slot]');
      if (b) { state.picks[b.getAttribute('data-slot')] = +b.getAttribute('data-opt'); draw(); }
    });
    document.querySelectorAll('[data-flight]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.flight = b.getAttribute('data-flight') === 'yes';
        document.querySelectorAll('[data-flight]').forEach(function (x) {
          x.setAttribute('aria-pressed', String((x.getAttribute('data-flight') === 'yes') === state.flight));
        });
        $('[data-flight-fields]').hidden = !state.flight;
      });
    });

    $('[data-go]').addEventListener('click', function () {
      var d = DURATIONS[state.duration];
      var acts = [];
      for (var i = 1; i <= d.slots; i++) {
        acts.push('[Activité ' + String.fromCharCode(64 + (i - 1) * 3 + (state.picks[i] || 0) + 1) + ']');
      }
      var lines = [];
      if (state.flight) {
        var fmt = function (v) { return v ? new Date(v).toLocaleDateString('fr-FR') : 'à définir'; };
        lines.push('Billet d’avion : oui · ' + $('#vol-classe').value);
        lines.push('Vol : départ ' + fmt($('#vol-aller').value) + ' · retour ' + fmt($('#vol-retour').value));
      } else {
        lines.push('Billet d’avion : non');
      }
      save({ kind: 'pack', key: key, title: 'Pack ' + pack.name, sub: d.label + ' · ' + d.slots + ' activités', activities: acts, lines: lines, price: d.price, tone: pack.tone, back: 'pack.html?p=' + key });
      location.href = 'recapitulatif.html';
    });
    draw();
  }

  /* ---------- Fiche prestation ---------- */
  function fieldHtml(f) {
    var id = 'f-' + f.id;
    if (f.type === 'select') {
      return '<div><label for="' + id + '">' + esc(f.label) + '</label><select id="' + id + '" name="' + f.id + '">' +
        f.options.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></div>';
    }
    var extra = f.type === 'number' ? ' min="1" inputmode="numeric" placeholder="—"' : '';
    return '<div><label for="' + id + '">' + esc(f.label) + '</label><input id="' + id + '" name="' + f.id + '" type="' + f.type + '"' + extra + '></div>';
  }

  function renderService() {
    var key = SERVICES[param('s')] ? param('s') : 'vehicule';
    var s = SERVICES[key];
    document.title = s.name + ' — Kaya';
    $('[data-svc-name]').textContent = s.name;
    $('[data-svc-detail]').textContent = s.detail;
    $('.hero').classList.add(s.tone);
    var html = s.fields.map(function (f) {
      return Array.isArray(f) ? '<div class="row2">' + f.map(fieldHtml).join('') + '</div>' : fieldHtml(f);
    }).join('');
    html += '<div><label for="f-msg">Précisions (optionnel)</label><textarea id="f-msg" name="precisions" rows="3" placeholder="' + esc(s.hint) + '"></textarea></div>';
    $('[data-fields]').innerHTML = html;

    $('[data-svc-form]').addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [];
      var flat = [].concat.apply([], s.fields);
      flat.forEach(function (f) {
        var v = this.elements[f.id].value;
        if (v) lines.push(f.label + ' : ' + (f.type === 'date' ? new Date(v).toLocaleDateString('fr-FR') : v));
      }, this);
      var msg = this.elements.precisions.value.trim();
      if (msg) lines.push('Précisions : ' + msg);
      save({ kind: 'service', key: key, title: s.name, sub: 'Prestation sur-mesure · sur devis', lines: lines, price: 'Sur devis', tone: s.tone, back: 'prestation.html?s=' + key });
      location.href = 'recapitulatif.html';
    });
  }

  /* ---------- Récapitulatif & envoi ---------- */
  function renderRecap() {
    var r = load() || { kind: 'pack', title: 'Pack Wild', sub: '5-7 jours · 3 activités', activities: ['[Activité A]', '[Activité D]', '[Activité G]'], price: '[PRIX]', tone: 't3', back: 'pack.html?p=wild' };
    $('[data-r-title]').textContent = r.title;
    $('[data-r-sub]').textContent = r.sub;
    $('[data-r-price]').textContent = r.price;
    $('[data-r-back]').href = r.back;
    $('.recap-photo').classList.add(r.tone);
    if (r.activities) {
      $('[data-r-acts]').innerHTML = r.activities.map(function (a, i) {
        return '<div><div class="img t' + ((i % 6) + 1) + '"></div><div class="lbl">' + esc(a) + '</div></div>';
      }).join('');
    }
    if (r.lines && r.lines.length) {
      $('[data-r-lines]').innerHTML = r.lines.map(function (l) { return '<div>' + esc(l) + '</div>'; }).join('');
    }

    var on = { whatsapp: true, email: false };
    document.querySelectorAll('.chan').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-chan');
        on[k] = !on[k];
        b.setAttribute('aria-pressed', String(on[k]));
        $('#field-' + k).classList.toggle('on', on[k]);
        if (on[k]) $('#field-' + k + ' input').focus();
      });
    });

    $('[data-send]').addEventListener('click', function () {
      var nom = $('#nom').value.trim();
      var err = $('[data-err]');
      var tel = $('#tel').value.trim();
      var mail = $('#mail').value.trim();
      if (!nom) { err.textContent = 'Indiquez votre nom.'; $('#nom').focus(); return; }
      if (!on.whatsapp && !on.email) { err.textContent = 'Choisissez WhatsApp et/ou email.'; return; }
      if (on.whatsapp && !tel) { err.textContent = 'Indiquez votre numéro WhatsApp.'; $('#tel').focus(); return; }
      if (on.email && !/^\S+@\S+\.\S+$/.test(mail)) { err.textContent = 'Indiquez une adresse email valide.'; $('#mail').focus(); return; }
      err.textContent = '';

      var text = 'Bonjour Kaya, je suis ' + nom + '.\nVoici ma demande : ' + r.title + ' — ' + r.sub +
        (r.activities ? '\nActivités : ' + r.activities.join(', ') : '') +
        (r.lines && r.lines.length ? '\n' + r.lines.join('\n') : '') +
        '\nPrix : ' + r.price +
        (on.whatsapp ? '\nWhatsApp : ' + tel : '') + (on.email ? '\nEmail : ' + mail : '');
      $('[data-wa-send]').href = waLink(text);

      var via = [];
      if (on.whatsapp) via.push('WhatsApp');
      if (on.email) via.push('email');
      $('[data-via]').textContent = via.join(' et ');
      $('[data-form-state]').hidden = true;
      $('[data-sent-state]').hidden = false;
      window.scrollTo(0, 0);
    });
    $('[data-edit]').addEventListener('click', function () {
      $('[data-form-state]').hidden = false;
      $('[data-sent-state]').hidden = true;
    });
  }

  renderNav();
  renderFoot();
  if (page === 'home') renderTestimonials();
  if (page === 'pack') { renderPack(); renderTestimonials(PACKS[param('p')] ? param('p') : 'wild'); }
  if (page === 'service') renderService();
  if (page === 'recap') renderRecap();
})();
