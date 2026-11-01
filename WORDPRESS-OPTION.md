# Option WordPress / IONOS — sans Sanity

> **Option archivée : l’utilisateur a ensuite demandé de poursuivre avec Sanity.** Aucune migration WordPress n’est engagée. Le choix actif et l’état du Studio sont dans `CMS.md`.

## Demande reçue

Le 28/10/2026, le client fournit ses conditions de réservation approuvées et demande si le site peut être hébergé sur son WordPress IONOS, avec édition des textes/images sans Sanity.

Le lien communiqué est un espace client privé IONOS, pas l’URL publique du WordPress. La tentative de consultation par le navigateur connecté n’a pas abouti (connexion fermée). Ni le forfait exact, ni la version de WordPress, ni les permissions d’installation de thème/extension ne sont donc déclarés vérifiés.

## Solution recommandée, sous réserve de validation

Un **thème WordPress sur mesure**, reprenant le design actuel, avec des pages et sections de contenu éditables via Gutenberg. Pas d’iframe, pas de site React figé déposé comme un faux thème, pas de constructeur lourd imposé.

- PHP/WordPress fournit le HTML complet de chaque page et de ses métadonnées.
- Gutenberg gère les titres, textes, images, boutons et galeries. Les modèles peuvent encadrer la structure pour limiter les changements accidentels de mise en page ; le verrouillage n’est pas une barrière de sécurité absolue pour un administrateur.
- Les menus et éléments communs sont gérés par le thème et les interfaces WordPress adaptées.
- FR/EN : pages traduites et associées via **Polylang gratuit**. Ne pas dépendre de la traduction des template parts FSE, de la synchronisation avancée ou d’autres fonctions réservées à Polylang Pro. Un thème hybride PHP + contenus Gutenberg évite cette dépendance.
- SEO : reprendre canonicals, hreflang, titres/descriptions, données structurées, redirections et sitemap. Ne pas supposer que l’installation de WordPress fournit à elle seule toutes ces métadonnées.
- Images : médiathèque, vraie conversion WebP, tailles multiples et srcset ; vérifier les capacités de l’éditeur d’images du serveur IONOS. Conserver le chargement prioritaire du hero et différé des autres médias.
- Réservation : conserver le moteur HotelRunner officiel. Pas besoin de WooCommerce, d’un module hôtelier payant ou d’un nouveau prestataire de paiement pour ce périmètre.
- Formulaires : raccorder un envoi réel sur l’hébergement, avec validation et états fiables, puis tester vers un destinataire autorisé.
- Prévoir cache adapté à l’hébergement et nouvelle vérification des performances, pas reprise automatique des scores du build React.

WordPress et les composants retenus peuvent être gratuits. **L’hébergement IONOS reste soumis au contrat existant du client** : aucun prix ni inclusion n’est déduit du lien privé. Aucun Elementor Pro, WPML, ACF Pro, Polylang Pro ou abonnement Sanity n’est nécessaire à cette proposition.

## Conditions confirmées

Source lue : `CONDITIONS DE RÉSERVATION .docx`. Copie structurée exploitable indépendamment du CMS : `content/booking-conditions.fr.json`.

Points clés conservés : paiement intégral à la réservation ; tarif flexible annulable sans frais jusqu’à 5 jours avant l’arrivée à 23 h 59 locale ; tarif non remboursable ; conditions promotionnelles propres à l’offre ; taxe de séjour et petit-déjeuner inclus ; règlement par lien de paiement ; régularisation d’un paiement défaillant sous 24 h après notification ; remboursement initié sous 7 jours ouvrés après confirmation du Riad ; arrivée à partir de 14 h, départ avant 11 h ; lit supplémentaire à 20 € par nuit sous conditions de disponibilité/compatibilité.

Coordonnées confirmées : +212 808 653 506, info@riad4jardins.com, 6 Derb Arset Aouzal, Marrakech 40000. La couverture « version de travail » et la fiche de validation interne du document ne sont pas des conditions à publier aux voyageurs.

## Avant migration

1. Valider le choix **WordPress natif sur IONOS**.
2. Obtenir l’URL publique du WordPress ou de son `/wp-admin`, puis un accès autorisé via un canal sécurisé. Ne pas transmettre de mot de passe dans la conversation.
3. Vérifier installation de thèmes/extension, version PHP/WordPress, accès fichiers ou SFTP si nécessaire, sauvegardes et environnement de préparation.
4. Sauvegarder l’installation avant changement. Préparer et tester le thème sur staging ; ne pas écraser un WordPress actif ni changer les DNS à l’aveugle.
5. Migrer les contenus/URLs en conservant les correspondances FR/EN et les redirections. Publier les conditions nettoyées avec leur version anglaise correctement relue.
6. Vérifier le rendu, l’édition par le client, les envois de formulaire, les erreurs 404, le SEO et la vitesse sur IONOS avant bascule du domaine.

## État actuel

Aucune migration WordPress, installation de thème/extension, modification du compte IONOS ou bascule DNS n’a été effectuée. Le code React reste disponible et ses travaux SEO/médias servent de référence. Sanity n’est plus sollicité par défaut ; son projet Free existant n’est ni supprimé ni considéré comme un CMS client livré.

## Sources officielles consultées

- WordPress Site Editor : <https://wordpress.org/documentation/article/site-editor/>
- Verrouillage / édition du seul contenu : <https://developer.wordpress.org/block-editor/how-to-guides/curating-the-editor-experience/block-locking/>
- Polylang gratuit et distinction avec Pro : <https://wordpress.org/plugins/polylang/>
