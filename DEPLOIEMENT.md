# KAYA — prototype sur kaya.dake.studio

Site statique (HTML/CSS/JS, aucun serveur requis), d'après l'artefact
« Kaya — Wireframes site de réservation » (parcours MVP du 17/09/2026 :
pas de compte, pas de panier, pas de paiement en ligne).

Pages : `index.html` · `packs.html` · `pack.html?p=nature|culture|wild` ·
`prestations.html` · `prestation.html?s=vehicule|hebergement|accompagnateurs|traducteurs|securite|seminaires|personnalisable` ·
`recapitulatif.html`.

## À compléter avant la présentation

- `kaya.js` → `CONFIG.whatsapp` : numéro WhatsApp de Kaya (ex. `2250700000000`).
  Vide, le bouton « Écrire sur WhatsApp » laisse choisir le contact.
- Textes et prix entre [crochets] (`kaya.js` : `PACKS`, `DURATIONS`).
- Photos : les blocs bruns sont des emplacements (classe `.img`), à remplacer
  par `style="background-image:url(img/…)"`.
- Le site est en `noindex` + `robots.txt` fermé : c'est une maquette client.

## Mise en ligne OVH (comme face.dake.studio)

1. GitHub : créer un dépôt (ex. `Jaydogo/kaya`), y pousser ce dossier.
2. OVH → Hébergements → Le Docker Noir → **Multisite** → *Ajouter un domaine ou
   sous-domaine* → `kaya.dake.studio`, dossier racine `kaya`, **SSL** coché.
3. Sur la ligne `kaya.dake.studio` → **Configurer Git** (dépôt + branche `main`),
   puis le webhook GitHub (push = mise en ligne).
4. DNS : si `dake.studio` est chez OVH, l'entrée est créée à l'étape 2 ; sinon
   ajouter un CNAME `kaya` → `zkcojbj.cluster029.hosting.ovh.net`.

Aperçu local : `python3 -m http.server 4180 --directory kaya`
