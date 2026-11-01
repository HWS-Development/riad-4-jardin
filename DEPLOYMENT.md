# Publication — état et procédure

> **Orientation confirmée : React prérendu + Sanity Free.** WordPress/IONOS reste une option archivée, non mise en œuvre. Le Studio est réellement déployé ; le nouveau site et sa publication automatique sur le domaine public restent à raccorder au bon hébergement.

## État constaté au 01/11/2026

- Dépôt : <https://github.com/HWS-Development/riad-4-jardin>, branche `main`.
- Point de départ et dernière publication antérieure à cette intervention : `b401781176928b85f8554bdad258ae2e9e3a2fd4`. L’API GitHub déclare un déploiement Production pour ce commit le 27/10/2026.
- Le client confirme `https://riad4jardins.com` comme domaine principal et demande la migration de `riad4jardin.com`. La configuration versionnée applique des 301, chemin conservé, depuis les apex/www de l’ancien domaine et depuis `www.riad4jardins.com` vers l’apex canonique. L’application effective exige que les quatre hôtes soient attachés au même projet avec certificats valides.
- Projet Sanity HWS `7041qvs5`, dataset public `production`, véritable forfait Free actif : prix 0, sans essai ni dépassement payant. L’import est terminé : 21 documents éditoriaux, 47 assets image, 0 erreur/avertissement de validation. Studio : <https://riad-4-jardins-hws.sanity.studio/>. Voir `CMS.md`.
- Compte Vercel CLI accessible : contexte `golden-adnanes-projects`. Les recherches du domaine et des deux noms de projets historiques n’ont pas retrouvé le projet cible dans ce contexte. Aucun nouveau projet Vercel n’a été créé et aucun accès à un autre compte n’est supposé.
- Compte Cloudflare HWS accessible en lecture/gestion Pages : aucun projet correspondant au Riad retrouvé parmi ceux listés. Aucun nouveau projet ni changement DNS n’a été effectué dans cette étape CMS.
- L’intégration Git Cloudflare n’est pas configurée pour ce dépôt dans cette intervention. Le compte, le projet cible et l’éventuelle migration depuis Vercel doivent être validés avant un changement d’hébergement ou de DNS.

## Réglages de build

| Réglage | Valeur |
| --- | --- |
| Racine du projet | racine du dépôt |
| Node | 24 (minimum 22.12) |
| Installation | `npm ci` |
| Build | `npm run build` |
| Sortie statique | `dist` |
| Branche de production prévue | `main` |
| Domaine canonique confirmé | `https://riad4jardins.com` |
| Studio CMS | hébergement Sanity gratuit distinct du site |

Le `vercel.json` applique des 301 depuis les deux hôtes de l’ancien domaine et une redirection permanente 308 pour `www.riad4jardins.com`, avant les 301 de migration de chemins. Les anciennes routes sont couvertes avec et sans slash final, dont `/home2/` vers `/fr/`. Le même dossier `dist` contient les règles de domaine dans `_redirects`, `_headers` et `404.html` pour Cloudflare Pages.

Les redirections configurées dans **Vercel → Domains** prennent le relais avant celles du déploiement : régler également `riad4jardin.com` et `www.riad4jardin.com` en **301** vers `riad4jardins.com`. Vérifier les chaînes complètes jusqu’à une réponse 200, notamment `http://riad4jardin.com/`, `/home2/` et `/services-activites`, ainsi que la conservation des paramètres. Le passage HTTP → HTTPS peut ajouter une 308 automatique de la plateforme.

## Variables à configurer côté hébergeur

- `SITE_URL` : domaine HTTPS canonique final, sans chemin.
- `SITE_NOINDEX=false` en production. Les contextes de prévisualisation Vercel/Cloudflare sont détectés automatiquement ; ne pas réutiliser un build de prévisualisation comme build de production.
- `SANITY_PROJECT_ID`, `SANITY_DATASET=production`, `REQUIRE_SANITY=true` **après** l’import initial des contenus. Pas de jeton d’écriture nécessaire pour lire les données publiques publiées.
  Source active : `CONTENT_SOURCE=sanity` (valeur par défaut). Les identifiants publics de ce projet sont aussi centralisés dans `src/site/cms.js`.
- `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, et `VITE_EMAILJS_SPA_TEMPLATE_ID` si le spa utilise son propre modèle. Ces paramètres publics sont utilisés par le navigateur ; un secret de serveur ne doit jamais recevoir le préfixe `VITE_`.
- `GOOGLE_SITE_VERIFICATION` lorsque le client fournit le jeton Search Console (ou validation DNS).
- GA4 principal : `G-D3T47X1HLY`, injecté dans tous les documents du domaine canonique. L’ancien identifiant `G-18R3YDQJ1B` reste celui de la propriété historique ; il n’est pas chargé sur le nouveau domaine et une réponse 301 n’exécute aucun JavaScript.

Le `.env` local est conservé sur disque mais retiré du suivi Git pour éviter d’y commiter de futurs secrets Sanity. Ne pas remettre ce fichier dans le dépôt pour faire fonctionner un déploiement ; utiliser les variables de l’hébergeur.

## Publication Git et automatisation

1. Confirmer domaine, téléphone, contenu des témoignages et accès Sanity. Terminer les vérifications du CMS réel et du destinataire des formulaires.
2. Avant commit : examiner statut, diff et historique ; ne sélectionner que les fichiers destinés à cette intervention. Exclure secrets, médias générés, `.ssr`, caches, rapports volumineux et captures.
3. Construire et tester la version finale ; pousser le commit de livraison autorisé vers `main`.
4. Pour **Cloudflare Pages Git integration**, connecter ce dépôt et `main` au compte/projet confirmés, appliquer les réglages ci-dessus. Ne pas substituer un upload manuel à la liaison Git.
5. Si l’hébergement Vercel existant est conservé, vérifier la liaison Git et les variables dans le bon projet ; ne pas supposer qu’une connexion antérieure a conservé tous ses réglages.
6. Sur le bon projet d’hébergement, créer le deploy hook secret utilisé par Sanity pour reconstruire après publication ; voir `CMS.md`.
7. Attendre le build réussi et noter le **commit effectivement déployé**, l’URL et le projet. Vérifier les URLs FR/EN directement, `/sitemap.xml`, `/robots.txt`, une vraie 404, les images et les métadonnées initiales.
8. Attacher `riad4jardins.com`, `www.riad4jardins.com`, `riad4jardin.com` et `www.riad4jardin.com` au projet de production, valider HTTPS puis vérifier les 301 en conservant chemin et requête. Cette opération nécessite l’accès aux domaines ; une balise canonical seule ne configure ni DNS ni certificat TLS.
9. Publier un changement Sanity réel et vérifier qu’il déclenche un build et modifie le HTML public. Faire de même avec un push Git utile autorisé pour prouver le déclenchement automatique.

La workflow `.github/workflows/quality.yml` ajoute les contrôles de build, lint, SEO, navigateur, Studio et dépendances. Elle ne publie pas de données ni de mails réels : les tests d’envoi utilisent un transport simulé et des paramètres de test. Son existence n’est pas une preuve d’exécution sur GitHub tant que les changements n’ont pas été poussés.

## Dépendances externes encore ouvertes

Accès ou deploy hook secret du bon hébergement pour brancher la publication automatique, attachement des quatre domaines/certificats, déploiement du nouveau code, adresse de connexion du client pour son invitation au Studio, sources des avis historiques et validation d’une livraison réelle de formulaire vers un destinataire autorisé. Après mise en ligne et vérification des 301, utiliser dans Search Console le changement d’adresse de `riad4jardin.com` vers `riad4jardins.com`, soumettre le nouveau sitemap et conserver l’ancien domaine actif pendant la migration.
