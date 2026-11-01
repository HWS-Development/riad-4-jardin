# Riad 4 Jardins

Site React/Vite FR/EN, rendu statiquement à la construction, CMS Sanity Free et médias responsives. L’identité graphique existante est conservée.

Domaine canonique : <https://riad4jardins.com>. Les anciennes URLs de `riad4jardin.com` sont configurées en redirection permanente avec conservation du chemin.

**Orientation confirmée : Sanity Free.** Le Studio est déployé sur <https://riad-4-jardins-hws.sanity.studio/>, avec 21 documents éditoriaux et 47 images. Le site produit 16 pages FR/EN, dont les conditions confirmées. Le raccordement automatique du domaine public au build reste à finaliser ; voir `CMS.md` et `DEPLOYMENT.md`. L’option WordPress est archivée, non mise en œuvre.

## Démarrage

Node **24 recommandé**, minimum 22.12.

```sh
npm ci
npm run dev
```

Le développement utilise Vite ; `/` redirige vers `/fr/`. Pour examiner le **vrai HTML SEO de production**, utiliser :

```sh
npm run build
npm run preview
```

Prévisualisation : <http://127.0.0.1:4173/fr/> et <http://127.0.0.1:4173/en/>. Les fichiers livrables sont dans `dist/`. Le serveur de prévisualisation reproduit statuts 404, redirections et compression HTTP.

## Construction

1. Lecture des contenus publiés Sanity par défaut. Les contenus du dépôt sont réservés au diagnostic explicite `CONTENT_SOURCE=repository`.
2. Création de vrais WebP et variantes, AVIF complémentaires pour les images critiques, favicon et licences des polices.
3. Bundles navigateur découpés par page et bundle temporaire de rendu serveur.
4. Génération des 16 documents FR/EN, des 404, canonicals/hreflang/JSON-LD, `sitemap.xml`, `robots.txt`, `llms.txt`, redirections et en-têtes de cache.

Le client ne télécharge pas Sanity et ne dépend pas de JavaScript pour lire le site ou suivre les liens. Ne pas remettre de réécriture générale `/(.*) → /index.html` : elle supprimerait les vrais statuts 404 et les documents localisés.

## Vérification

```sh
npm run lint
npm test
npx playwright install chromium
npm run test:e2e
npm run capture
npm run measure
```

Lighthouse teste par défaut trois fois l’accueil, les chambres, le contact et les conditions dans les deux langues, en mode mobile simulé. Rapports et captures sont dans `artifacts/` (non publiés). Exemple de contrôle rapide : `LH_RUNS=1 LH_PATHS=/fr/ npm run measure`.

`npm run build:render` régénère uniquement HTML/bundles pendant les itérations de code lorsque les médias et contenus générés sont déjà à jour. En CI et avant livraison, toujours exécuter le build complet.

## Édition et production

- [CMS.md](CMS.md) — activation de Sanity **Free** et parcours d’édition.
- [SEO.md](SEO.md) — audit traité, sources, ciblage naturel et limites GEO.
- [DESIGN.md](DESIGN.md) — éléments visuels préservés et adaptations accessibles.
- [QA.md](QA.md) — tests et mesures réellement exécutés.
- [DEPLOYMENT.md](DEPLOYMENT.md) — environnement, publication et dépendances externes.

Les identifiants de configuration se renseignent avec `.env.example`. `.env` et tous les secrets sont exclus de Git ; les identifiants publics EmailJS précédemment versionnés doivent aussi être configurés sur l’hébergeur. Le Word de conditions reste un document de travail, non une page de conditions publiée.
