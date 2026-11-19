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
        const prev = S.prest === pr.slug && S.prestData[f.id] ? esc(S.prestData[f.id]) : '';
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
      notes.innerHTML = `<span class="fld-l">Précisions (optionnel)</span><textarea class="fld-i" name="precisions" rows="3" placeholder="${esc(pr.hint)}">${S.prest === pr.slug && S.prestData.precisions ? esc(S.prestData.precisions) : ''}</textarea>`;
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

  /* ---------- Récapitulatif ---------- */
  function recapData() {
    if (S.from === 'pack' && packOf()) {
      const d = durOf(), acts = [];
      for (let i = 1; i <= d.cats; i++) acts.push(actLabel(i, S.choices['c' + i] || 0));
      const lines = S.flight.on
        ? [['Billet d’avion', 'Oui · ' + S.flight.classe], ['Vol', 'Départ ' + fmtDate(S.flight.aller) + ' · retour ' + fmtDate(S.flight.retour)]]
        : [['Billet d’avion', 'Non']];
      return { title: 'Pack ' + packOf().name, sub: d.label + ' · ' + d.cats + ' activités', acts, lines, price: d.price, back: '#/pack/' + S.pack };
    }
    if (S.from === 'prest' && prestOf()) {
      const pr = prestOf(), lines = [];
      pr.fields.forEach((f) => { const v = S.prestData[f.id]; if (v) lines.push([f.label, f.type === 'date' ? fmtDate(v) : v]); });
      if (S.prestData.precisions) lines.push(['Précisions', S.prestData.precisions]);
      return { title: pr.name, sub: 'Prestation sur-mesure · sur devis', acts: null, lines, price: 'Sur devis', back: '#/prestation/' + pr.slug };
    }
    return null;
  }

  function summary() {
    const r = recapData();
    $$('[data-recap-back]').forEach((a) => { a.href = r ? r.back : '#/packs'; a.hidden = !r; });
    $$('[data-summary]').forEach((box) => {
      if (!r) { box.innerHTML = `<p class="sum-empty">Aucune sélection pour le moment. <a href="#/packs">Voir les packs</a></p>`; return; }
      const rows = [['Formule', r.title], ['Détail', r.sub]];
      if (r.acts) r.acts.forEach((a, i) => rows.push(['Catégorie ' + (i + 1), a]));
      r.lines.forEach((l) => rows.push(l));
      rows.push(['Prix estimé', r.price]);
      box.innerHTML = rows.map(([k, v], i) => `<div class="sum-row${k === 'Prix estimé' ? ' sum-total' : ''}" style="--i:${i}"><span class="sum-k">${esc(k)}</span><span class="sum-v">${esc(v)}</span></div>`).join('');
    });
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

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-go-recap]');
    if (t) {
      e.preventDefault();
      if (t.dataset.goRecap === 'pack') S.from = 'pack';
      else {
        const form = t.closest('form') || $('[data-view="prestation"] form');
        if (form && !form.reportValidity()) return;
        S.from = 'prest';
        S.prestData = Object.fromEntries(new FormData(form));
      }
      S.sentVia = null; save();
      location.hash = '#/recap';
      return;
    }
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
    if (!recapData()) return fail('Choisissez d’abord une formule ou une prestation.');
    if (!name) return fail('Indiquez votre nom.', f.elements.name);
    if (!waOn && !mailOn) return fail('Choisissez WhatsApp et/ou email.');
    if (waOn && !tel.trim()) return fail('Indiquez votre numéro WhatsApp.', $('[data-ch-field="wa"] input', f));
    if (mailOn && !/^\S+@\S+\.\S+$/.test(mail.trim())) return fail('Indiquez une adresse email valide.', $('[data-ch-field="mail"] input', f));
    err.textContent = '';
    const r = recapData();
    const text = 'Bonjour Kaya, je suis ' + name + '.\nVoici ma demande : ' + r.title + ' · ' + r.sub +
      (r.acts ? '\nActivités : ' + r.acts.join(', ') : '') +
      (r.lines.length ? '\n' + r.lines.map(([k, v]) => k + ' : ' + v).join('\n') : '') +
      '\nPrix : ' + r.price + (waOn ? '\nWhatsApp : ' + tel.trim() : '') + (mailOn ? '\nEmail : ' + mail.trim() : '');
    const via = [waOn && 'WhatsApp', mailOn && 'email'].filter(Boolean);
    S.sentVia = 'Votre récapitulatif est parti par ' + via.join(' et ') + '.'; S.sentText = text; save();
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
  addEventListener('DOMContentLoaded', () => { wireWhatsApp(); route(); });
})();
