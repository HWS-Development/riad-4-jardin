# QA — Riad 4 Jardins, React prérendu + Sanity Free

Contrôles initiaux exécutés le **28/10/2026**, migration de domaine ajoutée le **01/11/2026**. Le Studio est réellement hébergé : <https://riad-4-jardins-hws.sanity.studio/>. La présence du code sur GitHub ne prouve pas à elle seule la bascule DNS ni le déploiement public.

## Résultats techniques actuels

| Contrôle | Statut | Preuve |
| --- | --- | --- |
| Build de production depuis Sanity | PASS | `npm run build` : source `sanity`, **16 HTML FR/EN**, sitemap, robots, redirections et 404 |
| Runtime de production | PASS | Aucun `jsx-dev-runtime` distribué. Les builds lancés depuis la CLI du Studio forcent `NODE_ENV=production` |
| Lint | PASS | `npm run lint` sans erreur |
| Logique / SEO / données | PASS | `npm test` : **11 tests réussis** |
| Navigateur | PASS | `npm run test:e2e` : **11 tests réussis**, Chromium/Playwright |
| Schémas Sanity | PASS | `sanity schemas validate` : 0 erreur, 0 avertissement |
| Documents et références réels | PASS | `sanity documents validate --yes --level warning` : **21 documents valides**, 0 erreur, 0 avertissement |
| Import réel | PASS | 21 documents éditoriaux publiés, **47 assets image** réutilisés par référence ; import `createIfNotExists` |
| Hébergement du Studio | PASS | Déploiement confirmé pour le projet `7041qvs5`, application `ocrakxjkie5bdwb93hn229f3` |
| Forfait | PASS | API fournisseur : `free-2023-10-19`, nom Free, prix 0, actif, `trialDays=0`, dépassements payants désactivés |
| Dépendances critiques/élevées | PASS | `npm audit --audit-level=high` et audit du Studio : aucune vulnérabilité haute ou critique. Des avis modérés transitifs `glob`/`minimatch` restent signalés le 01/11/2026 ; les corrections proposées imposent des régressions de versions majeures et ne sont pas forcées |

Le nombre « 160 » affiché par le pipeline médias désigne les entrées/alias originaux et CMS, pas 160 photographies différentes. Les téléchargements et encodages identiques sont réutilisés. Les sources Sanity immuables et encodages sont mis en cache atomiquement dans `.cache/`, non publié et ignoré par Git.

## Vérification réelle de l’édition

### Interface

La session HWS autorisée a chargé le Studio et les documents réels dans un contexte navigateur temporaire, sans stockage d’authentification ni trace réseau conservés. Résultat de `studio/scripts/ui-inspect.mjs` :

- navigation d’édition accessible ;
- texte modifiable dans le champ **Texte affiché** ;
- descriptif d’image modifiable ;
- menu d’image → **Upload** ouvrant le sélecteur de fichier ;
- aucune modification du contenu pendant ce contrôle en lecture seule.

Les photos ont été migrées vers un champ Image natif dans un objet d’emplacement. Les références, alt, recadrages, textes et SEO existants ont été préservés ; 18 documents contenant des images ont été migrés avec contrôle de révision. Le Studio a été redéployé avec ce modèle. Preuves : `artifacts/studio/` et sauvegarde de migration dans `artifacts/`.

### Publication et HTML initial

Un test réel par SDK authentifié a :

1. sauvegardé le document d’origine et journalisé l’étape ;
2. publié un titre temporaire factuel et une autre photo existante du Riad sur l’accueil FR ;
3. exécuté le build complet et vérifié les changements dans le **contenu HTML visible avant JS** ;
4. vérifié que le texte et l’image anglais n’avaient pas changé ;
5. restauré les textes et images d’origine avec contrôle de révision, puis reconstruit la version finale.

Rapport réel : `artifacts/cms-publication-check.json`, phase **complete**, texte publié vérifié, image publiée vérifiée, isolation des langues vérifiée, `restored=true`. Les étapes et la sauvegarde sont écrites avant les changements pour reprendre une interruption. Un contrôle indépendant a également confirmé la restauration des originaux. Ce test prouve **CMS publié → build → HTML local** ; il ne prétend pas avoir testé un webhook vers le site public encore non raccordé.

## SEO, conditions et responsive

- Les 16 documents sont analysés avant JS : une langue et un H1 corrects, contenu réel, titres/descriptions uniques, canonicals absolus auto-référents, alternates FR/EN réciproques et x-default FR, Open Graph/Twitter et JSON-LD valides.
- Sitemap XML : exactement les 16 routes canoniques avec alternates. Anciennes routes redirigées ; vraies 404 FR/EN dans la prévisualisation.
- Origine canonique : `https://riad4jardins.com` dans canonical, hreflang, Open Graph, JSON-LD, sitemap, robots et llms. Règles 301 versionnées pour l’ancien apex/www et le www du nouveau domaine, avec conservation du chemin.
- Google Tag `G-D3T47X1HLY` présent une fois dans le head de chaque document final. Le tag historique `G-18R3YDQJ1B` n’est pas chargé sur le domaine canonique.
- Les conditions confirmées sont présentes dans `/fr/conditions-reservation/` et leur traduction `/en/booking-conditions/`, reliées au pied de page et au changement de langue équivalent. Dix articles, trois familles tarifaires, aucune couverture « version de travail » ni fiche interne affichée.
- Le français fourni par le client est la version confirmée ; l’anglais en est une traduction sans nouvelle règle. Les données internes d’approbation et le nom du fichier source sont exclus du payload public.
- Coordonnées confirmées : +212 808 653 506, info@riad4jardins.com, 6 Derb Arset Aouzal, Marrakech 40000.
- Les photos sont réellement encodées en WebP, avec variantes, tailles adaptées et dimensions réservées ; AVIF complémentaire pour les images critiques. Décodage après défilement testé. Aucun agrandissement des originaux.
- Contrôle des 8 pages dans les 2 langues à 320×740, 390×844, 430×932, 768×1024, 1024×768, 1440×900, 1920×1080 et 844×390. Aucun débordement horizontal détecté.
- Axe WCAG 2 A/AA et 2.1 AA sans violation détectée dans la suite ; contrôles mobiles supplémentaires, écran court 390×320, reflow desktop équivalent 200 % (720×450, DPR 2).
- Galerie, langues, focus/clavier, popup, réduction des mouvements, navigation/photos sans JS et conservation de saisie avant hydratation testés.
- Formulaire : échec 503 simulé sans faux succès, puis acceptation 200 simulée. Aucune demande réelle envoyée sans destinataire de test autorisé.

La carte Google Maps a été inspectée après chargement : repère aux coordonnées fournies par HotelRunner, plan et attributions visibles. Les images et le design existants sont conservés ; exceptions circonscrites documentées dans `DESIGN.md`. Pas de nouveau widget de dates ou refonte du hero.

## Performances actuelles avec les données Sanity

Lighthouse **13.6.0**, Chromium Headless **156**, mobile simulé 412×823, DPR 1,75, RTT 150 ms, débit 1 638,4 kbit/s, CPU ×4. **Trois essais par URL, médianes**, sur `http://127.0.0.1:4173`, du 28/10/2026 17:33:28 au 17:35:49 UTC. Build de production, pas mesure du domaine public.

| Route | Performance | Accessibilité | Bonnes pratiques | SEO | LCP médian | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/fr/` | 99 | 100 | 100 | 100 | 2,18 s | 0,0010 |
| `/en/` | 99 | 100 | 100 | 100 | 2,18 s | 0,0009 |
| `/fr/chambres/` | 99 | 100 | 100 | 100 | 2,03 s | 0 |
| `/en/rooms/` | 99 | 100 | 100 | 100 | 2,10 s | 0 |
| `/fr/contact/` | 100 | 100 | 100 | 100 | 0,64 s | 0,0020 |
| `/en/contact/` | 100 | 100 | 100 | 100 | 0,64 s | 0,0020 |
| `/fr/conditions-reservation/` | 100 | 100 | 100 | 100 | 0,79 s | 0,0032 |
| `/en/booking-conditions/` | 100 | 100 | 100 | 100 | 0,78 s | 0,0027 |

Rapports : `artifacts/sanity-performance-summary.json` et `artifacts/performance/`. La campagne historique des 14 anciennes routes est conservée dans `artifacts/performance-summary.json` ; les chiffres ne doivent pas être présentés comme une mesure WordPress ni comme du trafic réel.

Budgets du build actuel : JS initial accueil **100 237 octets transférés** ; tous les chunks de toutes les routes **119 029 octets gzip cumulés** ; CSS **6 524 octets gzip** ; WOFF2 **86 660 octets** ; hero AVIF mobile **54 036 octets**, desktop **150 002 octets**. Les suggestions résiduelles sur des images sous la ligne de flottaison restent dans les rapports. Certains originaux de petite résolution nécessiteraient de meilleurs fichiers source pour gagner du détail, pas un agrandissement artificiel.

Ce sont des mesures de laboratoire. L’INP terrain, les données CrUX, l’indexation, les positions Google, citations IA et réservations ne sont pas démontrés par ces scores.

## Étapes externes non déclarées livrées

| Point | Statut | Action exacte |
| --- | --- | --- |
| Invitation du client | BLOCKED | Adresse de connexion Sanity du client à confirmer ; ne pas inviter un contact supposé ni créer de rôle payant |
| Nouveau code sur le domaine public | BLOCKED | Version de travail non poussée/déployée ; aucune bascule DNS effectuée |
| Publication automatique du site | BLOCKED | Accès ou deploy hook du bon hébergement requis. Le contexte Vercel disponible n’a pas retrouvé les projets historiques du Riad. Aucun webhook fictif n’a été installé |
| Témoignages historiques | BLOCKED | Sources de Sophie L./Marc D. à fournir/valider ; aucune donnée Review/aggregateRating inventée |
| Envoi réel de formulaire | BLOCKED | Destinataire de test autorisé et confirmation de livraison à vérifier |
| Domaine / profils tiers | PARTIAL | Domaine canonique confirmé et règles versionnées ; rattacher les quatre hôtes avec HTTPS au projet de production et aligner HotelRunner |
| GA4 / Search Console | PARTIAL | Tag principal intégré et accès aux deux propriétés annoncé ; après mise en ligne, soumettre le sitemap et lancer le changement d’adresse Search Console |

**Conclusion : le CMS Free, son Studio hébergé, les contenus et le raccordement au générateur sont vérifiés. La mise à jour automatique du site public n’est pas présentée comme achevée tant que l’hébergement et le déploiement ne sont pas raccordés et testés.**
