# Sanity Free — contenus du Riad 4 Jardins

## État réel au 28/10/2026

L’utilisateur a confirmé la poursuite avec Sanity. WordPress reste une option archivée, non mise en œuvre.

- **Studio hébergé : <https://riad-4-jardins-hws.sanity.studio/>**
- Projet : `7041qvs5` ; dataset public : `production` ; organisation : Hospitality Web Services.
- Application du Studio : `ocrakxjkie5bdwb93hn229f3`, version 6.20.0, mises à jour automatiques désactivées.
- **21 documents éditoriaux publiés** : 8 pages × 2 langues, textes communs FR/EN, pages 404 FR/EN, coordonnées communes.
- **47 assets image** importés, référencés et réutilisés sans multiplier les fichiers par langue.
- Les coordonnées et conditions confirmées du client sont intégrées, dont les pages `/fr/conditions-reservation/` et `/en/booking-conditions/`.
- 21 documents validés par la CLI : **0 erreur, 0 avertissement**.

Le Studio est réellement déployé. La connexion HWS a été vérifiée, ainsi que l’édition du texte, du descriptif de photo et l’ouverture du sélecteur de fichier. Le compte du client doit encore être invité avec son adresse de connexion confirmée ; ne pas déduire cette adresse de l’e-mail de contact du Riad.

## Gratuité vérifiée

L’essai automatique attribué à la création a été remplacé par le **véritable forfait Free** : plan `free-2023-10-19`, statut `active`, prix **0**, `trialDays=0`. Le contrôle des ressources n’autorise pas les dépassements payants. Aucun moyen de paiement, upgrade Growth ou add-on payant n’a été ajouté.

Source fournisseur : <https://www.sanity.io/pricing>. Au jour du contrôle, Free comprend notamment 20 places, 2 datasets publics, 10 000 documents, 100 Go d’assets, 100 Go de bande passante mensuelle, 1 million de requêtes CDN, 250 000 requêtes API et 2 webhooks. Gratuit ne signifie pas illimité ; conserver le forfait Free et respecter les quotas.

**Rôles :** Free propose Administrator et Viewer. Le rôle Editor à permissions réduites est payant et n’est pas utilisé. Un client qui modifie le contenu sur Free doit donc être administrateur de ce projet. L’interface protège les emplacements et simplifie l’édition, sans prétendre supprimer les pouvoirs d’un administrateur dans Sanity Manage.

Le dataset ne contient que des contenus du site et des photos. Ne pas y stocker des informations voyageurs, coordonnées bancaires, messages de formulaire ou secrets.

## Parcours d’édition

1. Ouvrir le Studio et se connecter avec un compte invité au projet.
2. Choisir **Pages en français** ou **Pages in English**, puis la page.
3. Onglet **Textes** : ouvrir un élément, modifier **Texte affiché**. Les longues listes ont un bouton « Show all … items ».
4. Onglet **Photos** : ouvrir la photo, puis le menu de l’image → **Upload** pour un fichier, ou **Select** pour la médiathèque. Le descriptif de la photo se modifie dans le même élément.
5. Onglet **Référencement** : titre et description propres à cette page.
6. Cliquer **Publish** pour publier dans le CMS. Un brouillon n’est pas utilisé par le site.

Les conditions ont leurs dix articles et leurs trois familles tarifaires dans un champ structuré. Les coordonnées communes sont dans **Coordonnées du Riad**. Le logo se trouve dans **Textes communs → Photos** ; les trois marques bancaires fournies restent fixes dans le code.

Les emplacements, clés et URLs sont stables : une photo modifiée sur une page FR ne remplace pas involontairement celle d’une autre page ou de la version EN. Le champ Image natif est contenu dans un objet d’emplacement pour que le remplacement, la prévisualisation et le descriptif soient réunis.

## Comment le site reçoit les publications

Le site lit les documents **publiés** au build et génère le HTML complet et les médias locaux. Pas de client Sanity ni de jeton d’écriture dans le navigateur du visiteur. Les originaux et les encodages sont mis en cache localement par contenu pour accélérer les builds ; une nouvelle image ou un nouveau recadrage invalide la bonne entrée.

Un test réel a publié temporairement un titre et une photo existante du Riad, généré le site, vérifié les deux changements dans le **HTML initial visible**, vérifié que l’anglais restait inchangé, puis restauré les originaux et reconstruit. Rapport : `artifacts/cms-publication-check.json` ; résultat `phase=complete`, restauration confirmée. Le journal et une sauvegarde sont écrits avant/après les étapes pour permettre la reprise d’une interruption.

**Attention :** publication dans le CMS et publication du site public sont deux opérations distinctes. Le nouveau code n’est pas encore déclaré déployé sur le domaine public et aucun webhook de build n’est prétendu actif. Le compte Vercel disponible ne retrouve pas les projets historiques `riad-4-jardin` / `riad-4-jardin-qtxg` ni le déploiement du domaine. Il faut le deploy hook du bon hébergement ou son accès autorisé pour terminer l’automatisation. Voir `DEPLOYMENT.md`.

## Exploitation technique

Identifiants publics centralisés dans `src/site/cms.js` ; paramètres modifiables via `.env.example`. Source active : `CONTENT_SOURCE=sanity` (par défaut). Les builds Sanity exigent les documents attendus, sauf dérogation locale explicite `REQUIRE_SANITY=false`. Pour un diagnostic hors réseau uniquement : `CONTENT_SOURCE=repository`.

```sh
npm ci --prefix studio
npm run studio:dev
npm run cms:seed -- --dry-run
npm run cms:import
npm run build
```

`cms:import` utilise la session de la CLI Sanity et le SDK officiel sans lire ni afficher le jeton d’accès. Import idempotent `createIfNotExists`, réutilisation des assets par hash. Il ne faut pas remplacer des documents clients avec un import forcé. Le script de migration des anciennes photos conserve les références, descriptions et recadrages, avec contrôle de révision.

Déploiement du Studio : depuis `studio/`, `sanity deploy --yes --schema-required`. Son appId est fixé ; cela ne doit pas créer un deuxième projet. Origines CORS connues : localhost:3333, 127.0.0.1:3333 et le domaine exact du Studio ; aucune origine générique avec credentials.

Pour l’automatisation, créer un deploy hook secret sur le **bon** projet/branche de l’hébergement, puis un webhook Sanity POST sur les documents publiés `page` et `siteSettings`, en excluant les brouillons. Utiliser un webhook Free, ne pas enregistrer son URL secrète dans Git. Vérifier ensuite un véritable build public et le HTML public modifié avant de déclarer cette étape livrée.
