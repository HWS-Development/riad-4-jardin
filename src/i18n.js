// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        rooms: "Chambres",
        spa: "Spa & Bien-être",
        services: "Services & Activités",
        restaurant: "Restaurant",
        gallery: "Galerie",
        blog: "Blog",
        reserve: "Réservez",
      },

      hero: {
        title: "Riad 4 jardins",
        subtitle: "Découvrez Riad 4 Jardins, une maison d’hôtes traditionnelle à Marrakech, alliant élégance, authenticité et confort pour un séjour inoubliable",
      },

      // --- Cards on home (Chambre / Spa / Restaurant)
      cards: {
        rooms: {
          title: "Chambre",
          desc: "Chambre lumineuse avec vue paisible sur le jardin du riad.",
          cta: "Découvrir Plus",
        },
        spa: {
          title: "Spa & Bien-être",
          desc: "Un espace bien-être au riad, entre détente marocaine et soins traditionnels.",
          cta: "Découvrir Plus",
        },
        restaurant: {
          title: "Restaurant",
          desc: "Saveurs marocaines traditionnelles servies dans un cadre chaleureux du riad.",
          cta: "Découvrir Plus",
        },
      },

      // --- Marrakech two-column section
      marrakech: {
        left: {
          title: "Vivez Marrakech autrement…",
          desc:
            "Au-delà du confort de nos chambres, plongez dans l’âme du Maroc à travers nos activités uniques : excursions, ateliers culturels, découvertes locales… Chaque expérience est une invitation à l’évasion.",
          cta: "Découvrir Plus",
          alt: "Jardin du riad",
        },
        right: {
          title: "Un voyage sensoriel entre jardins, saveurs et traditions",
          desc:
            "Niché au cœur de la médina de Marrakech, notre riad vous ouvre ses portes pour une parenthèse de calme et de raffinement. Entre tradition marocaine et confort moderne, découvrez quatre jardins intérieurs, quatre ambiances, et des chambres pensées pour votre bien-être. Une expérience authentique, rythmée par la douceur de vivre, les saveurs locales et des activités inspirantes.",
          alt: "Souks de Marrakech",
        },
      },

      // --- Offers
      // offers: {
      //   title: "Offres spéciales",
      //   offer5: {
      //     title: "Séjour 5 nuits — Transfert arrivée offert",
      //     items: ["Accueil personnalisé à l’aéroport", "Petit-déjeuner inclus", "Wi-Fi gratuit"],
      //     cta: "Réserver 5 nuits",
      //   },
      //   offer7: {
      //     title: "Séjour 7 nuits — Transfert + Massage offerts",
      //     items: ["Accueil personnalisé à l’aéroport", "Petit-déjeuner inclus", "Wi-Fi gratuit"],
      //     cta: "Réserver 7 nuits",
      //   },
      // },
      offers: {
        title: "Offres spéciales",
        offer5: {
          title: "Séjour 5 nuits — Transfert arrivée offert",
          desc: "Réservez 5 nuits consécutives et profitez d’un transfert gratuit depuis l’aéroport de Marrakech-Menara jusqu’au riad.",
          items: [
            "Transfert gratuit à l’arrivée (aéroport → Riad)",
            "Accueil personnalisé à l’aéroport",
            "Petit-déjeuner inclus",
            "Wi-Fi gratuit"
          ],
          note: "⚠️ Offre valable uniquement pour les séjours de 5 nuits consécutives réservés sur le site officiel. Numéro de vol requis lors de la réservation. Offre non cumulable.",
          cta: "Réserver 5 nuits"
        },
        offer7: {
          title: "Séjour 7 nuits — Transfert + Massage offerts",
          desc: "Pour 7 nuits réservées, bénéficiez d’un transfert gratuit à l’arrivée et d’un massage relaxant de 30 minutes offert.",
          items: [
            "Accueil personnalisé à l’aéroport",
            "Petit-déjeuner inclus",
            "Wi-Fi gratuit"
          ],
          note: "⚠️ Offre valable uniquement pour les séjours de 7 nuits consécutives réservés sur le site officiel. Massage offert pour une personne (supplément pour une deuxième). Réservation du massage 48h à l’avance. Offre non cumulable.",
          cta: "Réserver 7 nuits"
        }
      },
      

      // --- Testimonials
      testimonials: {
        one: "Un séjour inoubliable, ambiance apaisante et service impeccable. Je recommande vivement ce riad à Marrakech.",
        two: "L'architecture marocaine est magnifiquement mise en valeur. Une expérience authentique et relaxante à chaque instant.",
      },

      footer: {
        bookTitle: "Réservez votre séjour",
        bookSub:
          "Découvrez l’élégance et l’authenticité de notre riad à Marrakech. Réservez votre chambre dès maintenant.",
        emailLabel: "Votre adresse e-mail",
        cta: "Réserver votre séjour maintenant",
        note: "Aucune newsletter — nous utilisons votre e-mail uniquement pour votre demande.",
      },

      readMore: "Découvrir Plus",
    },
  },

  en: {
    translation: {
      nav: {
        home: "Home",
        rooms: "Rooms",
        spa: "Spa & Wellness",
        services: "Services & Activities",
        restaurant: "Restaurant",
        gallery: "Gallery",
        blog: "Blog",
        reserve: "Book",
      },

      hero: {
        title: "Riad 4 jardins",
        subtitle: "Charm & traditions",
      },

      // --- Cards on home (Room / Spa / Restaurant)
      cards: {
        rooms: {
          title: "Room",
          desc: "Bright room with a peaceful view over the riad’s garden.",
          cta: "Discover More",
        },
        spa: {
          title: "Spa & Wellness",
          desc: "A wellness space with Moroccan rituals and traditional care.",
          cta: "Discover More",
        },
        restaurant: {
          title: "Restaurant",
          desc: "Traditional Moroccan flavors served in a warm riad setting.",
          cta: "Discover More",
        },
      },

      // --- Marrakech two-column section
      marrakech: {
        left: {
          title: "Experience Marrakech differently…",
          desc:
            "Beyond the comfort of our rooms, immerse yourself in the soul of Morocco through our unique activities: excursions, cultural workshops, local discoveries… Every experience is an invitation to escape.",
          cta: "Discover More",
          alt: "Riad garden",
        },
        right: {
          title: "A sensory journey through gardens, flavors and traditions",
          desc:
            "Nestled in the heart of Marrakech’s medina, our riad opens its doors for a haven of calm and refinement. Between Moroccan tradition and modern comfort, discover four inner gardens, four ambiences, and rooms designed for your well-being. An authentic experience marked by the sweetness of life, local flavors, and inspiring activities.",
          alt: "Marrakech souks",
        },
      },

      // --- Offers
     
      offers: {
        title: "Special Offers",
        offer5: {
          title: "5 nights stay — Free arrival transfer",
          desc: "Book 5 consecutive nights and enjoy a free transfer from Marrakech-Menara airport to the riad.",
          items: [
            "Free transfer on arrival (airport → Riad)",
            "Personalized airport welcome",
            "Breakfast included",
            "Free Wi-Fi"
          ],
          note: "⚠️ Offer valid only for stays of 5 consecutive nights booked on the official site. Flight number required when booking. Non-cumulative offer.",
          cta: "Book 5 nights"
        },
        offer7: {
          title: "7 nights stay — Free transfer + massage",
          desc: "For 7 nights booked, enjoy a free arrival transfer and a complimentary 30-minute relaxing massage.",
          items: [
            "Personalized airport welcome",
            "Breakfast included",
            "Free Wi-Fi"
          ],
          note: "⚠️ Offer valid only for stays of 7 consecutive nights booked on the official site. Massage included for one person (supplement for a second). Massage must be booked 48h in advance. Non-cumulative offer.",
          cta: "Book 7 nights"
        }
      },
      

      // --- Testimonials
      testimonials: {
        one: "“An unforgettable stay, soothing atmosphere and impeccable service.” — Sophie L.",
        two: "“An authentic and magical experience at every moment.” — Marc D.",
      },

      footer: {
        bookTitle: "Book Your Stay",
        bookSub:
          "Experience the elegance and authenticity of our riad in Marrakech. Reserve your room now.",
        emailLabel: "Your email address",
        cta: "Book your stay now",
        note: "No newsletter — we only use your email for this request.",
      },

      readMore: "Read more",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
