# Riad 4 Jardins — conservation de l’identité

## Mandat du 28 octobre 2026

Améliorer SEO, lisibilité par les moteurs, vitesse et édition de contenu **sans refonte graphique**. Les références HWS DESIGN/MICRO-INTERACTIONS ont été relues ; elles ne justifient pas de remplacer l’identité existante. La demande de conservation prime sur les compositions et typographies proposées pour une création.

## Éléments conservés

- Palette : or `#F2C75B`, bleu-vert `#244752`, crème `#F3E7D3`, brun du pied de page `#6E5D53`.
- Compositions, ordre des sections, grilles de chambres/galerie, arrondis, cadrages, dimensions et familles typographiques effectivement rendues.
- Inter pour le texte ; Playfair Display dans les blocs qui l’utilisaient déjà. La pile de titres `Fraunces, serif` est conservée : Fraunces n’était pas chargée dans l’original. Pas de substitution volontaire par une police de référence.
- Hero original, réservation externe HotelRunner et trois logos bancaires fournis. Aucun nouveau formulaire de dates ni bande 80/20 : cette modification de composition serait contraire au mandat « sans toucher au design ».
- Survol des cartes, états des boutons, diaporama et effet de fond fixe des témoignages sur ordinateur. Un moteur d’animation complet n’est plus nécessaire pour le menu ; CSS natif conserve sa transition de 400 ms.

## Corrections circonscrites

- Vrais liens FR/EN et menus natifs `details/summary`, utilisables avant le chargement de React et sans JavaScript.
- Titres sémantiques H1/H2 à classes visuelles conservées ; le titre général de la page Chambres reste accessible sans ajouter une nouvelle bande graphique.
- Contraste du menu sur les fonds dorés : bleu-vert existant au lieu du blanc illisible. Titres de formulaires sur brun explicitement blancs.
- Pied de page : coordonnées structurées, accès Contact et attribution HWS ; libellé du formulaire corrigé pour ne pas prétendre créer une réservation.
- Nouvelle page Contact reprenant les couleurs, grilles, rayons et espacements existants ; carte différée à l’approche de la section, lien d’itinéraire disponible sans JS.

## Images, chargement et mouvement

- Mêmes originaux photographiques. WebP réels, largeurs natives sans agrandissement, AVIF complémentaire sur les photos critiques.
- Hero mobile : dérivé centré portrait pour ne pas transférer les côtés invisibles de la photo. Le centrage et `object-cover` restent identiques au principe initial.
- Le contenu est visible depuis le HTML statique. Les améliorations React s’initialisent après décodage/peinture de l’image critique, ou immédiatement lorsqu’un visiteur interagit avec un formulaire/une photo. La saisie précoce est préservée et testée.
- `prefers-reduced-motion` désactive défilement automatique, transitions élaborées et fond fixe progressif ; aucun texte n’est caché en attendant une animation.
- Le menu fonctionne nativement, avec repli sur écran court, focus visible, fermeture Échap et adaptation tactile. Galerie/chambres : fermeture Échap, retour du focus et navigation au clavier.
- Pas de scroll hijacking, effet de tilt, bibliothèque payante, Motion+, Kokonut Pro ni ajout d’animation non demandé.

## Licences

Inter et Playfair Display : Fontsource Variable 5.3.0, SIL Open Font License 1.1. Les textes de licence d’origine sont copiés dans `/licenses/` à chaque build. Les photos et logos sont les fichiers déjà présents/fournis par le client ; aucune photographie d’un autre établissement n’est importée.

## Preuves visuelles

12 captures avant changement ont été prises sur le commit de départ `b401781`, en 390 et 1440 px. Les captures actuelles et les sélections `currentSrc` sont produites par `node scripts/capture.mjs` dans `artifacts/visual/`. Ce dossier de travail n’est pas distribué sur le site ni commité.
