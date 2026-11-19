/* Moteur commun des pistes Kaya : contenus et parcours du prototype (kaya.dake.studio).
   Chaque piste fournit ses propres écrans [data-view] et son style ;
   ce script gère navigation, durée, billet d'avion, activités, formulaires,
   témoignages, récapitulatif, WhatsApp. Tout ce qui est entre [crochets] est à fournir. */
(function () {
  const CONFIG = {
    whatsapp: '',            // numéro Kaya, format international sans + ni espaces (ex. 2250700000000)
    email: 'contact@kaya.ci' // [À CONFIRMER]
  };
  const P = '/provisoire/';
  const SELECT = (id, label, options) => ({ id, label, type: 'select', options });
  const DATES = [{ id: 'debut', label: 'Date de début', type: 'date' }, { id: 'fin', label: 'Date de fin', type: 'date' }];
  const PEOPLE = { id: 'personnes', label: 'Nombre de personnes', type: 'number' };

  const K = {
    config: CONFIG,
    packs: [
      { slug: 'nature', name: 'Nature', intro: '[Description de l’ambiance Nature · deux ou trois phrases à fournir]', img: P + 'civ-12.jpg' },
      { slug: 'culture-histoire', name: 'Culture & Histoire', intro: '[Description de l’ambiance Culture & Histoire · deux ou trois phrases à fournir]', img: P + 'civ-07.jpg' },
      { slug: 'wild', name: 'Wild', intro: '[Description de l’ambiance Wild · deux ou trois phrases à fournir]', img: P + 'civ-08.jpg' },
    ],
    durations: [
      { key: 'weekend', label: 'Week-end', sub: '1-2 activités', count: '1 à 2 activités incluses', cats: 2, price: '[PRIX]' },
      { key: 'mid', label: '5-7 jours', sub: '3 activités', count: '3 activités incluses', cats: 3, price: '[PRIX]' },
      { key: 'long', label: '10 jours +', sub: '5-6 activités', count: '5 à 6 activités incluses', cats: 6, price: '[PRIX]' },
    ],
    flightClasses: ['Économique', 'Premium économique', 'Affaires', 'Première'],
    prestations: [
      { slug: 'vehicule', name: 'Location de véhicule', teaser: 'Avec ou sans chauffeur', detail: 'Citadine, berline, 4x4 ou van · avec ou sans chauffeur', img: P + 'civ-02.jpg',
        fields: [SELECT('type', 'Type de véhicule', ['Citadine', 'Berline', '4x4', 'Van']), ...DATES, SELECT('chauffeur', 'Chauffeur', ['Avec chauffeur', 'Sans chauffeur'])],
        hint: 'Trajets, horaires, nombre de passagers…' },
      { slug: 'hebergement', name: 'Hébergement', teaser: 'Résidences et hôtels partenaires', detail: 'Résidences privées et hôtels partenaires', img: P + 'civ-04.jpg',
        fields: [SELECT('type', 'Type d’hébergement', ['Résidence privée', 'Hôtel', 'Pas de préférence']), ...DATES, PEOPLE],
        hint: 'Quartier souhaité, nombre de chambres, budget…' },
      { slug: 'accompagnateurs', name: 'Accompagnateurs', teaser: 'Guides locaux dédiés', detail: 'Un guide local à vos côtés', img: P + 'civ-01.jpg',
        fields: [...DATES, SELECT('langue', 'Langue', ['Français', 'Anglais']), PEOPLE],
        hint: 'Lieux à visiter, centres d’intérêt…' },
      { slug: 'traducteurs', name: 'Traducteurs', teaser: 'Rendez-vous et événements', detail: 'Interprètes pour vos rendez-vous et événements', img: P + 'civ-06.jpg',
        fields: [SELECT('langues', 'Langues', ['Français ↔︎ Anglais', 'Autre (préciser)']), ...DATES, SELECT('cadre', 'Cadre', ['Rendez-vous d’affaires', 'Événement', 'Visite officielle'])],
        hint: 'Nature des échanges, durée, lieu…' },
      { slug: 'securite', name: 'Sécurité', teaser: 'Protection rapprochée', detail: 'Protection rapprochée et escorte', img: P + 'civ-13.jpg',
        fields: [...DATES, SELECT('agents', 'Nombre d’agents', ['1', '2', '3 et plus']), PEOPLE],
        hint: 'Contexte, déplacements prévus…' },
      { slug: 'seminaires', name: 'Séminaires musicaux', teaser: 'Événements et animations', detail: 'Événements, séminaires et animations musicales', img: P + 'civ-10.jpg',
        fields: [{ id: 'date', label: 'Date de l’événement', type: 'date' }, { id: 'participants', label: 'Nombre de participants', type: 'number' }, SELECT('format', 'Format', ['Séminaire', 'Soirée', 'Animation'])],
        hint: 'Lieu, ambiance souhaitée, programme…' },
      { slug: 'sur-mesure', name: 'Projet personnalisé', teaser: 'Sur devis', detail: 'Un séjour composé entièrement avec vous', img: P + 'civ-05.jpg',
        fields: [...DATES, PEOPLE],
        hint: 'Décrivez votre séjour idéal : envies, rythme, budget…' },
    ],
    // Exemples de mise en page : à remplacer par de vrais avis clients (texte, prénom, provenance).
    testimonials: [
      { pack: 'nature', text: 'Tout était prêt à notre arrivée. Nous n’avons eu qu’à profiter, le conseiller a ajusté le programme au jour le jour.', who: '[Prénom N.]', ctx: 'Pack Nature · [Ville, pays]' },
      { pack: 'culture-histoire', text: 'Des visites passionnantes et un guide qui connaît chaque histoire d’Abidjan. Une vraie découverte, en toute sérénité.', who: '[Prénom N.]', ctx: 'Pack Culture & Histoire · [Ville, pays]' },
      { pack: 'wild', text: 'Une semaine intense, parfaitement organisée, du vol jusqu’au dernier transfert. On repart déjà avec l’envie de revenir.', who: '[Prénom N.]', ctx: 'Pack Wild · [Ville, pays]' },
      { pack: 'wild', text: 'Réactifs sur WhatsApp à toute heure, des activités hors des sentiers battus : exactement ce que nous cherchions.', who: '[Prénom N.]', ctx: 'Pack Wild · [Ville, pays]' },
      { pack: 'nature', text: 'Un séjour à notre rythme, sans aucune contrainte. Le chauffeur et le guide ont été d’une grande gentillesse.', who: '[Prénom N.]', ctx: 'Pack Nature · [Ville, pays]' },
      { pack: 'culture-histoire', text: 'Nous voyagions en famille avec des enfants : chaque détail avait été pensé. Merci à toute l’équipe Kaya.', who: '[Prénom N.]', ctx: 'Pack Culture & Histoire · [Ville, pays]' },
    ],
    actPhotos: ['civ-12', 'civ-01', 'civ-08', 'civ-05', 'civ-09', 'civ-04', 'civ-06', 'civ-07', 'civ-03', 'civ-13', 'civ-02', 'civ-10'].map((n) => P + n + '.jpg'),
  };
  window.KAYA = K;
  const baseCss = document.createElement('style');
  baseCss.textContent = '.k-toast{position:fixed;z-index:95;left:50%;top:76px;transform:translate(-50%,-14px);display:flex;align-items:center;gap:14px;width:max-content;max-width:calc(100vw - 24px);padding:8px 8px 8px 18px;font-size:14px;line-height:1.3;opacity:0;pointer-events:none;transition:opacity .35s,transform .45s cubic-bezier(.22,.8,.2,1)}.k-toast.on{opacity:1;transform:translate(-50%,0);pointer-events:auto}.k-toast-a{white-space:nowrap;min-height:40px;display:inline-flex;align-items:center;padding:0 14px;font-weight:500}[data-sel-link][hidden]{display:none!important}';
  document.head.appendChild(baseCss);

  const STORE = 'kaya-pistes';
  const S = Object.assign({ pack: null, dur: 'mid', choices: {}, flight: { on: false, aller: '', retour: '', classe: K.flightClasses[0] }, prest: null, prestData: {}, from: null, back: '#/packs' },
    (() => { try { return JSON.parse(sessionStorage.getItem(STORE)) || {}; } catch (e) { return {}; } })());
  const save = () => { try { sessionStorage.setItem(STORE, JSON.stringify(S)); } catch (e) {} };

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const durOf = () => K.durations.find((d) => d.key === S.dur) || K.durations[1];
  const packOf = () => K.packs.find((p) => p.slug === S.pack);
  const prestOf = () => K.prestations.find((p) => p.slug === S.prest);
  const actLabel = (cat, opt) => '[Activité ' + String.fromCharCode(64 + (cat - 1) * 3 + opt + 1) + ']';
  const fmtDate = (v) => (v ? new Date(v + 'T12:00').toLocaleDateString('fr-FR') : 'à définir');
  const waLink = (text) => 'https://wa.me/' + CONFIG.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
  K.waLink = waLink;

  function wireWhatsApp() {
    $$('[data-wa]').forEach((a) => { a.href = waLink(); a.target = '_blank'; a.rel = 'noopener'; });
  }

  function bind(scope) {
    const pack = packOf(), pr = prestOf();
    const vals = {
      'pack.name': pack && pack.name, 'pack.intro': pack && pack.intro,
      'prest.name': pr && pr.name, 'prest.teaser': pr && pr.teaser, 'prest.detail': pr && pr.detail,
      price: durOf().price, count: durOf().count, 'dur.label': durOf().label,
    };
    $$('[data-bind]', scope).forEach((el) => { const v = vals[el.dataset.bind]; if (v != null) el.textContent = v; });
    $$('[data-bind-src]', scope).forEach((el) => {
      const k = el.dataset.bindSrc; const v = k === 'pack.img' ? pack && pack.img : k === 'prest.img' ? pr && pr.img : null;
      if (v) el.src = v;
    });
  }

  /* ---------- Fiche pack ---------- */
  function renderDurations() {
    $$('[data-durations]').forEach((box) => {
      box.innerHTML = ''; box.setAttribute('role', 'tablist'); box.setAttribute('aria-label', 'Durée du séjour');
      K.durations.forEach((d) => {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'dur'; b.setAttribute('role', 'tab');
        b.setAttribute('aria-selected', d.key === S.dur);
        b.innerHTML = `<span class="dur-l">${d.label}</span><span class="dur-s">${d.sub}</span>`;
        b.onclick = () => { S.dur = d.key; save(); renderPack(); };
        box.appendChild(b);
      });
    });
  }

  function renderFlight() {
    $$('[data-flight]').forEach((box) => {
      box.innerHTML = `
        <div class="fl-seg" role="group" aria-label="Inclure un billet d’avion">
          <button type="button" class="fl-btn" data-fl="no" aria-pressed="${!S.flight.on}">Non merci</button>
          <button type="button" class="fl-btn" data-fl="yes" aria-pressed="${S.flight.on}">Oui, je souhaite un billet</button>
        </div>
        <div class="fl-fields" ${S.flight.on ? '' : 'hidden'}>
          <label class="fld"><span class="fld-l">Date de départ</span><input class="fld-i" type="date" data-flf="aller" value="${esc(S.flight.aller)}"></label>
          <label class="fld"><span class="fld-l">Date de retour</span><input class="fld-i" type="date" data-flf="retour" value="${esc(S.flight.retour)}"></label>
          <label class="fld fld-classe"><span class="fld-l">Classe</span><select class="fld-i" data-flf="classe">${K.flightClasses.map((c) => `<option${c === S.flight.classe ? ' selected' : ''}>${c}</option>`).join('')}</select></label>
        </div>`;
      $$('[data-fl]', box).forEach((b) => b.onclick = () => { S.flight.on = b.dataset.fl === 'yes'; save(); renderFlight(); });
      $$('[data-flf]', box).forEach((i) => i.onchange = () => { S.flight[i.dataset.flf] = i.value; save(); });
    });
  }

  function renderCats() {
    $$('[data-cats]').forEach((box) => {
      box.innerHTML = '';
      const n = durOf().cats;
      for (let i = 0; i < n; i++) {
        const id = 'c' + (i + 1);
        if (S.choices[id] == null) S.choices[id] = 0; // présélection de la 1re activité, comme le prototype
        const cat = document.createElement('div');
        cat.className = 'cat'; cat.style.setProperty('--i', i);
        cat.innerHTML = `<div class="cat-h"><span class="cat-n">${String(i + 1).padStart(2, '0')}</span><span class="cat-t">Catégorie ${i + 1}</span><span class="cat-hint">1 activité au choix</span></div><div class="opts" role="radiogroup" aria-label="Catégorie ${i + 1}"></div>`;
        [0, 1, 2].forEach((j) => {
          const o = document.createElement('button');
          o.type = 'button'; o.className = 'opt';
          o.setAttribute('aria-pressed', S.choices[id] === j);
          o.innerHTML = `<span class="opt-im"><img src="${K.actPhotos[(i * 3 + j) % K.actPhotos.length]}" alt=""></span><span class="opt-l">${actLabel(i + 1, j)}</span><span class="opt-c" aria-hidden="true"></span>`;
          o.onclick = () => { S.choices[id] = j; save(); renderCats(); };
          cat.querySelector('.opts').appendChild(o);
        });
        box.appendChild(cat);
      }
    });
    progress();
  }

  function progress() {
    const n = durOf().cats;
    const done = Object.keys(S.choices).filter((k) => +k.slice(1) <= n && S.choices[k] != null).length;
    $$('[data-progress]').forEach((el) => (el.textContent = `${Math.min(done, n)}/${n} activités`));
    $$('[data-progress-bar]').forEach((el) => (el.style.transform = `scaleX(${Math.min(done, n) / n})`));
  }

  function renderPack() { renderDurations(); renderFlight(); renderCats(); bind(document); renderTestimonials(); }

  /* ---------- Fiche prestation ---------- */
  function renderFields() {
    const pr = prestOf();
    $$('[data-fields]').forEach((box) => {
      box.innerHTML = '';
      pr.fields.forEach((f) => {
        const lab = document.createElement('label');
        lab.className = 'fld fld-' + f.id;
        const prev = S.prest === pr.slug && S.prestData && S.prestData[f.id] ? esc(S.prestData[f.id]) : '';
        let input;
        if (f.type === 'select') {
          input = `<select class="fld-i" name="${f.id}">${f.options.map((o) => `<option${prev === esc(o) ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`;
        } else {
          input = `<input class="fld-i" type="${f.type}" name="${f.id}" value="${prev}" ${f.type === 'number' ? 'min="1" inputmode="numeric" placeholder="Ex. 2"' : ''}>`;
        }
        lab.innerHTML = `<span class="fld-l">${esc(f.label)}</span>${input}`;
        box.appendChild(lab);
      });
      const notes = document.createElement('label');
      notes.className = 'fld fld-notes';
      notes.innerHTML = `<span class="fld-l">Précisions (optionnel)</span><textarea class="fld-i" name="precisions" rows="3" placeholder="${esc(pr.hint)}">${S.prest === pr.slug && S.prestData && S.prestData.precisions ? esc(S.prestData.precisions) : ''}</textarea>`;
      box.appendChild(notes);
    });
  }

  /* ---------- Témoignages ---------- */
  function renderTestimonials() {
    $$('[data-testis]').forEach((el) => {
      const forPack = el.dataset.testis === 'pack';
      const list = forPack ? K.testimonials.filter((t) => t.pack === S.pack) : K.testimonials.slice(0, 3);
      el.hidden = !list.length;
      const track = $('.testis-list', el);
      if (!track) return;
      track.innerHTML = list.map((t) => `<figure class="testi"><blockquote>« ${esc(t.text)} »</blockquote><figcaption><b>${esc(t.who)}</b><span>${esc(t.ctx)}</span></figcaption></figure>`).join('');
      let ctrl = $('.swipe-ctrl', el);
      if (!ctrl) {
        track.insertAdjacentHTML('afterend', `<div class="swipe-ctrl"><div class="swipe-dots" aria-hidden="true"></div><div class="swipe-arrows"><button type="button" data-dir="-1" aria-label="Témoignage précédent">←</button><button type="button" data-dir="1" aria-label="Témoignage suivant">→</button></div></div><p class="testis-note">Exemples de mise en page · à remplacer par de vrais avis clients.</p>`);
        ctrl = $('.swipe-ctrl', el);
        const step = () => (track.children[1] ? track.children[1].offsetLeft - track.children[0].offsetLeft : track.clientWidth) || 1;
        const cur = () => Math.round(track.scrollLeft / step());
        const sync = () => {
          const i = cur(), n = track.children.length;
          ctrl.hidden = track.scrollWidth <= track.clientWidth + 4;
          $$('.swipe-dots span', el).forEach((d, j) => d.classList.toggle('on', j === i));
          $('[data-dir="-1"]', el).disabled = i <= 0;
          $('[data-dir="1"]', el).disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4 || n < 2;
        };
        track.addEventListener('scroll', sync, { passive: true });
        $$('[data-dir]', el).forEach((b) => b.addEventListener('click', () => track.scrollTo({ left: Math.max(0, cur() + +b.dataset.dir) * step(), behavior: 'smooth' })));
        el._sync = sync;
        addEventListener('resize', sync);
      }
      $('.swipe-dots', el).innerHTML = list.map((_, i) => `<span${i ? '' : ' class="on"'}></span>`).join('');
      track.scrollLeft = 0;
      requestAnimationFrame(() => el._sync && el._sync());
    });
  }

  /* ---------- Sélection (plusieurs éléments) et récapitulatif ---------- */
  if (!Array.isArray(S.items)) S.items = [];

  // Élément construit à partir de l'écran en cours (pack configuré ou prestation remplie)
  function itemFromPack() {
    const p = packOf(); if (!p) return null;
    const d = durOf(), acts = [];
    for (let i = 1; i <= d.cats; i++) acts.push(actLabel(i, S.choices['c' + i] || 0));
    const lines = S.flight.on
      ? [['Billet d’avion', 'Oui · ' + S.flight.classe], ['Vol', 'Départ ' + fmtDate(S.flight.aller) + ' · retour ' + fmtDate(S.flight.retour)]]
      : [['Billet d’avion', 'Non']];
    return { id: 'pack:' + p.slug, kind: 'pack', title: 'Pack ' + p.name, sub: d.label + ' · ' + d.cats + ' activités', acts, lines, price: d.price, img: p.img,
      state: { pack: p.slug, dur: S.dur, choices: Object.assign({}, S.choices), flight: Object.assign({}, S.flight) } };
  }
  function itemFromPrest(data) {
    const pr = prestOf(); if (!pr) return null;
    const lines = [];
    pr.fields.forEach((f) => { const v = data[f.id]; if (v) lines.push([f.label, f.type === 'date' ? fmtDate(v) : v]); });
    if (data.precisions) lines.push(['Précisions', data.precisions]);
    return { id: 'prest:' + pr.slug, kind: 'prest', title: pr.name, sub: 'Prestation sur-mesure · sur devis', acts: null, lines, price: 'Sur devis', img: pr.img,
      state: { prest: pr.slug, data: Object.assign({}, data) } };
  }
  function upsert(item) {
    const i = S.items.findIndex((x) => x.id === item.id);
    if (i >= 0) { S.items[i] = item; return false; }
    S.items.push(item); return true;
  }
  function counters() {
    const n = S.items.length;
    $$('[data-sel-count]').forEach((el) => (el.textContent = n));
    $$('[data-sel-link]').forEach((el) => { el.hidden = !n; el.setAttribute('aria-label', 'Ma sélection, ' + n + ' élément' + (n > 1 ? 's' : '')); });
  }

  // Message de confirmation discret
  let toastT;
  function toast(msg) {
    let t = $('.k-toast');
    if (!t) {
      t = document.createElement('div'); t.className = 'k-toast'; t.setAttribute('role', 'status');
      t.innerHTML = '<span class="k-toast-m"></span><a href="#/recap" class="k-toast-a">Voir ma sélection</a>';
      document.body.appendChild(t);
    }
    $('.k-toast-m', t).textContent = msg;
    t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 4200);
  }
  document.addEventListener('kaya:view', () => { const t = $('.k-toast'); if (t) t.classList.remove('on'); });

  function summary() {
    counters();
    $$('[data-summary]').forEach((box) => {
      if (!S.items.length) {
        box.innerHTML = `<div class="sel-empty"><p>Votre sélection est vide.</p><p><a href="#/packs">Voir les packs</a> · <a href="#/prestations">Voir les prestations</a></p></div>`;
        return;
      }
      box.innerHTML = S.items.map((it, n) => {
        const rows = [['Détail', it.sub]];
        if (it.acts) it.acts.forEach((a, i) => rows.push(['Catégorie ' + (i + 1), a]));
        it.lines.forEach((l) => rows.push(l));
        rows.push([it.kind === 'pack' ? 'Prix estimé' : 'Tarif', it.price]);
        return `<article class="sel-item" style="--i:${n}">
          <header class="sel-h"><span class="sel-n">${String(n + 1).padStart(2, '0')}</span><h3 class="sel-t">${esc(it.title)}</h3>
            <span class="sel-acts"><a href="#" class="sel-ed" data-item-edit="${n}">Modifier</a><button type="button" class="sel-del" data-item-del="${n}" aria-label="Retirer ${esc(it.title)}">Retirer</button></span></header>
          ${rows.map(([k, v], i) => `<div class="sum-row${i === rows.length - 1 ? ' sum-total' : ''}"><span class="sum-k">${esc(k)}</span><span class="sum-v">${esc(v)}</span></div>`).join('')}
        </article>`;
      }).join('') + `<div class="sel-more"><span>Ajouter autre chose</span><a href="#/packs">Un pack</a><a href="#/prestations">Une prestation</a></div>`;
    });
    $$('[data-recap-back]').forEach((a) => (a.hidden = true));
  }

  // Envoi : un seul message pour toute la sélection
  function selectionText(name, tel, mail) {
    const parts = S.items.map((it, n) => {
      let t = (n + 1) + '. ' + it.title + ' · ' + it.sub;
      if (it.acts) t += '\n   Activités : ' + it.acts.join(', ');
      it.lines.forEach(([k, v]) => (t += '\n   ' + k + ' : ' + v));
      t += '\n   ' + (it.kind === 'pack' ? 'Prix estimé' : 'Tarif') + ' : ' + it.price;
      return t;
    });
    return 'Bonjour Kaya, je suis ' + name + '.\nVoici ma demande (' + S.items.length + ' élément' + (S.items.length > 1 ? 's' : '') + ') :\n\n' + parts.join('\n\n') +
      '\n\n' + (tel ? 'WhatsApp : ' + tel + '\n' : '') + (mail ? 'Email : ' + mail : '');
  }

  /* ---------- Navigation ---------- */
  const TITLES = { home: 'Kaya · La conciergerie abidjanaise', packs: 'Packs découverte · Kaya', prestations: 'Prestations sur-mesure · Kaya', recap: 'Votre récapitulatif · Kaya', sent: 'C’est envoyé · Kaya' };
  function show(view) {
    $$('[data-view]').forEach((v) => (v.hidden = v.dataset.view !== view));
    document.body.dataset.current = view;
    document.title = view === 'pack' ? 'Pack ' + packOf().name + ' · Kaya' : view === 'prestation' ? prestOf().name + ' · Kaya' : TITLES[view] || TITLES.home;
    document.body.classList.remove('menu');
    window.scrollTo(0, 0);
    document.dispatchEvent(new CustomEvent('kaya:view', { detail: view }));
  }

  function route() {
    const [a, b] = location.hash.replace(/^#\/?/, '').split('/');
    if (a === 'pack' && K.packs.some((p) => p.slug === b)) {
      if (S.pack !== b) { S.choices = {}; S.flight = { on: false, aller: '', retour: '', classe: K.flightClasses[0] }; }
      S.pack = b; save(); show('pack'); renderPack();
    } else if (a === 'prestation' && K.prestations.some((p) => p.slug === b)) {
      S.prest = b; save(); renderFields(); bind(document); show('prestation');
    } else if (['packs', 'prestations', 'recap', 'envoye'].includes(a)) {
      if (a === 'recap') summary();
      if (a === 'envoye' && !S.sentVia) { location.hash = '#/recap'; return; }
      show(a === 'envoye' ? 'sent' : a);
    } else { show('home'); renderTestimonials(); }
  }

  function currentItem(t) {
    if (t.dataset.goRecap === 'pack' || t.dataset.addSel === 'pack') return itemFromPack();
    const form = t.closest('form') || $('[data-view="prestation"] form');
    if (form && !form.reportValidity()) return null;
    return itemFromPrest(Object.fromEntries(new FormData(form)));
  }
  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-go-recap]'), add = e.target.closest('[data-add-sel]');
    if (go || add) {
      e.preventDefault();
      const it = currentItem(go || add); if (!it) return;
      const added = upsert(it); S.sentVia = null; save(); counters();
      if (go) { location.hash = '#/recap'; return; }
      toast(it.title + (added ? ' ajouté à votre sélection' : ' mis à jour dans votre sélection'));
      return;
    }
    const ed = e.target.closest('[data-item-edit]');
    if (ed) {
      e.preventDefault();
      const it = S.items[+ed.dataset.itemEdit]; if (!it) return;
      if (it.kind === 'pack') { S.pack = it.state.pack; S.dur = it.state.dur; S.choices = Object.assign({}, it.state.choices); S.flight = Object.assign({}, it.state.flight); save(); location.hash = '#/pack/' + it.state.pack; }
      else { S.prest = it.state.prest; S.prestData = Object.assign({}, it.state.data); save(); location.hash = '#/prestation/' + it.state.prest; }
      return;
    }
    const del = e.target.closest('[data-item-del]');
    if (del) { S.items.splice(+del.dataset.itemDel, 1); save(); summary(); return; }
    if (e.target.closest('[data-edit]')) { e.preventDefault(); S.sentVia = null; save(); location.hash = '#/recap'; }
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-ch]')) {
      const f = $(`[data-ch-field="${e.target.dataset.ch}"]`, e.target.closest('form'));
      if (f) { f.hidden = !e.target.checked; if (e.target.checked) { const i = $('input', f); i && i.focus(); } }
    }
  });

  document.addEventListener('submit', (e) => {
    const f = e.target.closest('[data-recap-form]');
    if (!f) return;
    e.preventDefault();
    const err = $('[data-err]', f);
    const name = f.elements.name.value.trim();
    const waOn = $('[data-ch="wa"]', f).checked, mailOn = $('[data-ch="mail"]', f).checked;
    const tel = ($('[data-ch-field="wa"] input', f) || {}).value || '';
    const mail = ($('[data-ch-field="mail"] input', f) || {}).value || '';
    const fail = (m, el) => { err.textContent = m; el && el.focus(); };
    if (!S.items.length) return fail('Votre sélection est vide : ajoutez un pack ou une prestation.');
    if (!name) return fail('Indiquez votre nom.', f.elements.name);
    if (!waOn && !mailOn) return fail('Choisissez WhatsApp et/ou email.');
    if (waOn && !tel.trim()) return fail('Indiquez votre numéro WhatsApp.', $('[data-ch-field="wa"] input', f));
    if (mailOn && !/^\S+@\S+\.\S+$/.test(mail.trim())) return fail('Indiquez une adresse email valide.', $('[data-ch-field="mail"] input', f));
    err.textContent = '';
    const text = selectionText(name, waOn ? tel.trim() : '', mailOn ? mail.trim() : '');
    const via = [waOn && 'WhatsApp', mailOn && 'email'].filter(Boolean);
    S.sentVia = 'Votre récapitulatif (' + S.items.length + ' élément' + (S.items.length > 1 ? 's' : '') + ') est parti par ' + via.join(' et ') + '.'; S.sentText = text; save();
    location.hash = '#/envoye';
  });

  document.addEventListener('kaya:view', (e) => {
    if (e.detail !== 'sent') return;
    $$('[data-bind="sentVia"]').forEach((el) => (el.textContent = S.sentVia || ''));
    $$('[data-wa-send]').forEach((a) => { a.href = waLink(S.sentText); a.target = '_blank'; a.rel = 'noopener'; });
  });

  /* Menu mobile générique : [data-menu-toggle] ouvre/ferme body.menu */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-menu-toggle]');
    if (b) { const o = document.body.classList.toggle('menu'); $$('[data-menu-toggle]').forEach((x) => x.setAttribute('aria-expanded', o)); }
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.body.classList.remove('menu'); });

  addEventListener('scroll', () => document.body.classList.toggle('scrolled', scrollY > 60), { passive: true });
  addEventListener('hashchange', route);
  addEventListener('DOMContentLoaded', () => { wireWhatsApp(); route(); counters(); });
})();
