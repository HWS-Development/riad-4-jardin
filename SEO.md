# SEO et lisibilité par les moteurs / assistants

## Sources et périmètre

- Document du client `Audit_SEO_riad4jardin_com.md.docx`, lu en entier par extraction DOCX le 28/10/2026.
- Inspection des 6 pages du dépôt initial `b401781`, du HTML public de `https://riad4jardin.com/`, de `vercel.json` et des captures desktop/mobile.
- Moteur officiel : <https://riad-4-jardins-spa.hotelrunner.com/bv3/search>, inspecté dans un navigateur le 28/10/2026. Adresse affichée : « Rue Bab Doukkala 6, Derb Arset Aouzal, Médina 40000 Marrakech ». Lien de carte affiché : <https://www.google.com/maps/place/31.6312682684012,-7.99487516284>.
- L’accès Search Console aux deux propriétés `riad4jardin.com` et `riad4jardins.com` est annoncé par le client au 01/11/2026. Aucune donnée de trafic n’est reproduite dans le dépôt et le diagnostic ne prétend ni mesurer des positions ni prouver une augmentation des réservations.

## Architecture mise en place

React/Vite conservés, sans framework supplémentaire ni SPA catch-all. Le build rend chaque page FR/EN avec React côté serveur **pendant la construction**. Les visiteurs reçoivent des documents statiques complets : contenu, H1, navigation et SEO existent avant JavaScript. Les contrôles interactifs s’améliorent ensuite par hydratation progressive.

Source unique des routes : `src/site/routes.js`. 8 paires : accueil, chambres, spa, services/activités, restaurant, galerie, contact et conditions de réservation. Les anciennes URLs sont redirigées vers les pages françaises correspondantes ; une URL inconnue renvoie 404, pas un faux accueil 200.

Chaque page fournit un titre et une description uniques, `lang`, canonical absolu auto-référent, alternates FR/EN réciproques et `x-default` français, Open Graph, Twitter Card, photo de partage et données structurées. Le build refuse les métadonnées trop longues ou dupliquées.

`sitemap.xml` et `robots.txt` sont générés à partir du manifeste et du domaine. `robots.tsx` n’est pas le format à servir dans cette architecture statique. Les builds de prévisualisation Vercel/Cloudflare sont exclus de l’indexation ; la production autorise les ressources et annonce le sitemap.

JSON-LD : Hotel, WebSite, WebPage/ContactPage et BreadcrumbList. Identifiant d’entité stable, coordonnées, adresse et géolocalisation issues de l’établissement. Pas de note, nombre d’avis, classement étoilé, nombre de chambres, prix de chambre ni politique d’annulation inventés.

## Intentions de recherche et vocabulaire

| Page | Cibles naturelles et intention |
| --- | --- |
| Accueil | Riad 4 Jardins, Riad 4 Jardins Marrakech, riad avec jardins à Marrakech, réservation directe |
| Chambres | chambres et suites à Marrakech, suite deluxe avec balcon, chambre triple vue jardins, chambre double |
| Spa | spa riad Marrakech, hammam marocain, hammam et massages à Marrakech |
| Restaurant | restaurant marocain Marrakech, petit-déjeuner dans les jardins, atelier cuisine marocaine |
| Services | transfert aéroport Marrakech, excursions au Maroc, activités et ateliers à Marrakech |
| Galerie | photos Riad 4 Jardins, jardins et architecture du riad |
| Contact | contact Riad 4 Jardins, accès Bab Doukkala / Arset Aouzal, riad médina Marrakech |

Équivalents anglais naturels, propres à chaque page : Marrakech medina riad, rooms and suites, garden view, Moroccan hammam, airport transfer, Moroccan cooking workshop, direct booking. Il s’agit d’un ciblage qualitatif, **pas** d’un classement chiffré des « meilleurs mots-clés ».

La fréquence n’est pas un objectif en soi. Les titres, résumés, descriptions réelles, liens et alts renforcent le sujet sans empiler des variantes artificielles. Les termes « sans piscine », « 8 chambres », notes et avis datés de l’audit ne sont pas ajoutés faute de validation.

## GEO : mesures utiles et limites

- Texte sémantique accessible sans rendu JavaScript, informations de contact cohérentes et sourcées, entité structurée, URLs stables, versions FR/EN lisibles et liens directs vers le moteur officiel.
- Pas d’interdiction spécifique des robots de recherche IA dans le robots de production. Aucune intégration payante ni « soumission à ChatGPT » n’est prétendue.
- `/llms.txt` fournit un inventaire facultatif des pages officielles ; ce fichier n’est ni un standard d’indexation obligatoire ni une garantie de citation par les IA.
- Les avis historiques « Sophie L. » et « Marc D. » restent visuellement dans la version de travail pour ne pas supprimer des sections sans validation. Leurs sources sont demandées ; ils ne sont **pas** enrichis en Review/aggregateRating. Les confirmer ou les remplacer avant publication finale.

## Mesure et actions externes

Search Console : `riad4jardins.com` est confirmé comme canonique. Après déploiement, certificats et contrôle des 301, soumettre `https://riad4jardins.com/sitemap.xml`, inspecter les routes FR/EN, puis lancer le changement d’adresse depuis la propriété `riad4jardin.com`. Conserver les redirections au moins un an et idéalement sans date de fin.

GA4 : le tag du domaine principal `G-D3T47X1HLY` est chargé sur toutes les pages de production, mais exclu des builds de prévisualisation pour ne pas polluer les données. Le tag historique `G-18R3YDQJ1B` reste associé à `riad4jardin.com` mais n’est pas chargé sur le nouveau domaine ; les anciennes URLs répondent 301 et ne peuvent donc pas exécuter un tag. Les événements de réservation sortante et demandes de contact restent à définir selon le consentement. Un clic sur HotelRunner n’est pas une réservation confirmée.

## Points à confirmer

Mise à jour après réception des conditions confirmées : le client valide le téléphone **+212 808 653 506**, l’adresse **6 Derb Arset Aouzal, Marrakech, 40000** et l’e-mail **info@riad4jardins.com**. Ces valeurs sont reprises dans les coordonnées communes Sanity. Les conditions sont intégrées au CMS et aux pages FR/EN prérendues, sans les annotations du modèle ni la fiche de validation interne. Le français est la version confirmée fournie ; l’anglais en est une traduction fidèle, sans ajout de règles. Le déploiement de ce nouveau code sur le domaine public reste distinct de la publication dans le CMS.

1. Domaine canonique confirmé : `https://riad4jardins.com`. Les variantes `riad4jardin.com`, `www.riad4jardin.com` et `www.riad4jardins.com` sont configurées en 301 vers cet apex, en conservant chemin et paramètres. Leur efficacité dépend encore du rattachement DNS/TLS au projet de production.
2. Le téléphone principal est maintenant confirmé : `+212808653506`. Le moteur officiel observé affichait `+212808653546` ; l’alignement des coordonnées côté HotelRunner/Google Business devra être vérifié avec les accès correspondants. Le WhatsApp historique reste un canal distinct.
3. Sources des témoignages et validation des offres existantes ; aucune étoile Google/Booking n’est fabriquée.
4. Accès Sanity et publication automatique ; voir `CMS.md` et `DEPLOYMENT.md`.

Une excellente base technique facilite l’exploration, mais ne garantit pas l’indexation, une position, une citation IA ou un volume de réservations. Les pages « histoire », guides de quartier, tarifs détaillés et vrais avis seront des améliorations éditoriales à produire après réception des faits nécessaires, non des pages de remplissage.
