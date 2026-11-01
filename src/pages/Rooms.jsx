// src/pages/Rooms.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContent, useCopy } from '../content/ContentContext.jsx';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { useDialog } from '../utils/useDialog.js';

// IMAGES — replace with your real files
// Deluxe
import dlxMain from "../assets/rooms/deluxe/main.jpg";
import dlxA from "../assets/rooms/deluxe/a.jpg";
import dlxB from "../assets/rooms/deluxe/b.jpg";
// Triple
import triMain from "../assets/rooms/triple/main.jpg";
import triA from "../assets/rooms/triple/a.jpg";
import triB from "../assets/rooms/triple/b.jpg";
// Double
import dblMain from "../assets/rooms/double/main.jpg";
import dblA from "../assets/rooms/double/a.jpg";
import dblB from "../assets/rooms/double/b.jpg";

// Avatar image (replace with yours)
import sophieAvatar from "../assets/home/ava-sophie.jpg";

export default function Rooms() {
  const { i18n } = useTranslation();
  const isFR = i18n.language?.startsWith("fr");
  const { settings } = useContent();
  const copy = useCopy();

  // ---------- Lightbox state ----------
  const [lbOpen, setLbOpen] = useState(false);
  const [lbSrc, setLbSrc] = useState("");
  const [lbAlt, setLbAlt] = useState("");

  const openLightbox = (src, alt = "") => {
    setLbSrc(src);
    setLbAlt(alt);
    setLbOpen(true);
  };
  const closeLightbox = () => setLbOpen(false);

  // close on ESC
  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e) => e.key === "Escape" && closeLightbox();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lbOpen]);

  const ROOMS = [
    {
      id: "deluxe",
      title: copy('rooms.deluxeTitle', 'Suite deluxe avec balcon', 'Deluxe Suite with Balcony'),
      desc: copy('rooms.deluxeDescription', 'Spacieuse et élégamment décorée par des artisans marocains, cette suite climatisée se compose d’une chambre et d’un espace détente aménagé dans le prolongement. Elle comprend une télévision à écran plat, une armoire, un coffre-fort et une bouilloire subtilement intégrée pour agrémenter votre séjour. La salle de bains privative est équipée d’une douche, d’un sèche-cheveux, de peignoirs et d’articles de toilette gratuits. Depuis le balcon, profitez d’une vue apaisante sur le jardin.', 'Spacious and elegantly decorated by Moroccan artisans, this air-conditioned suite features a bedroom and a lounge extension. It includes a flat-screen TV, wardrobe, safe and a discreet kettle for comfort. The private bathroom has a shower, hair dryer, bathrobes and complimentary toiletries. From the balcony, enjoy a soothing view over the garden.'),
      photos: [dlxMain, dlxA, dlxB],
      band: "teal",
      headerless: false,
    },
    {
      id: "triple",
      title: copy('rooms.tripleTitle', 'Suite triple avec vue sur jardins', 'Triple Suite with Garden View'),
      desc: copy('rooms.tripleDescription', 'Confort et authenticité se rencontrent dans cette chambre triple climatisée, habillée d’une décoration artisanale marocaine. Elle comprend un coin salon agréable, une télévision à écran plat, une armoire, un coffre-fort, ainsi qu’une salle de bains privative avec douche, sèche-cheveux, peignoirs et articles de toilette offerts. Une bouilloire est également prévue pour votre confort.', 'Comfort and authenticity meet in this air-conditioned triple suite adorned with Moroccan craftsmanship. It includes a cozy lounge area, flat-screen TV, wardrobe, safe, and a private bathroom with shower, hair dryer, robes and complimentary toiletries. A kettle is also provided for your comfort.'),
      photos: [triMain, triA, triB],
      band: "white",
    },
    {
      id: "double",
      title: copy('rooms.doubleTitle', 'Suite Double', 'Double Suite'),
      desc: copy('rooms.doubleDescription', 'Cette chambre double climatisée vous accueille dans un décor raffiné, inspiré du savoir-faire des artisans marocains. Elle dispose d’un petit espace détente, d’une télévision à écran plat, d’une armoire, d’un coffre-fort et d’une salle de bains privative équipée d’une douche et d’un sèche-cheveux. Une bouilloire est également prévue pour votre confort.', 'This air-conditioned double suite welcomes you into a refined décor inspired by Moroccan artisans. It includes a small lounge corner, flat-screen TV, wardrobe, safe and a private bathroom with shower and hair dryer. A kettle is also provided for your comfort.'),
      photos: [dblMain, dblA, dblB],
      band: "cream",
    },
  ];

  return (
    <div className="bg-white">
      <h1 className="sr-only">{copy('rooms.h1', 'Chambres et suites du Riad 4 Jardins à Marrakech', 'Rooms and suites at Riad 4 Jardins in Marrakech')}</h1>
      {ROOMS.map((r) => (
        <section
          key={r.id}
          className={`${
            r.band === "teal"
              ? "bg-brand-teal text-white pt-24"
              : r.band === "cream"
              ? "bg-brand-cream text-brand-charcoal"
              : "bg-white text-brand-charcoal"
          }`}
        >
          <div className="mx-auto max-w-4xl px-6 py-14 md:py-16">
            {/* Images before title (Deluxe style) */}
            {!r.headerless && (
              <div className="grid md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7">
                  <RoundedImage
                    src={r.photos[0]}
                    alt={getTitle(r, isFR)}
                    tall
                    priority={r.id === 'deluxe'}
                    onOpen={openLightbox}
                  />
                </div>
                <div className="md:col-span-5 grid gap-6">
                  <RoundedImage
                    src={r.photos[1]}
                    alt={`${getTitle(r, isFR)} photo 2`}
                    onOpen={openLightbox}
                  />
                  <RoundedImage
                    src={r.photos[2]}
                    alt={`${getTitle(r, isFR)} photo 3`}
                    onOpen={openLightbox}
                  />
                </div>
              </div>
            )}

            {/* Title + CTA */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <h2
                className={`font-serif text-2xl md:text-3xl ${
                  r.band === "teal" ? "text-white" : "text-brand-teal"
                }`}
              >
                {getTitle(r, isFR)}
              </h2>
              <a
                href={settings.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
              >
                {copy('rooms.book', 'Réservez', 'Book')}
              </a>
            </div>

            {/* Description */}
            <p
              className={`mt-4 text-[15px] leading-relaxed max-w-3xl md:w-full ${
                r.band === "teal" ? "text-white/95" : "text-brand-charcoal/90"
              }`}
            >
              {getDesc(r, isFR)}
            </p>

            {/* Headerless case (none for Deluxe now) */}
            {r.headerless && (
              <div className="grid md:grid-cols-12 gap-6 items-start mt-8">
                <div className="md:col-span-7">
                  <RoundedImage
                    src={r.photos[0]}
                    alt={getTitle(r, isFR)}
                    tall
                    onOpen={openLightbox}
                  />
                </div>
                <div className="md:col-span-5 grid gap-6">
                  <RoundedImage
                    src={r.photos[1]}
                    alt={`${getTitle(r, isFR)} photo 2`}
                    onOpen={openLightbox}
                  />
                  <RoundedImage
                    src={r.photos[2]}
                    alt={`${getTitle(r, isFR)} photo 3`}
                    onOpen={openLightbox}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* === Dark Testimonial Section === */}
      <section className="bg-[#2B1F18] text-white py-24 md:py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="text-[#D4AF37] text-2xl tracking-[0.3em] mb-6">★★★★★</div>

          <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed max-w-4xl mx-auto">
            {copy('rooms.legacyTestimonial', 'Un séjour inoubliable au riad les 4 jardins. L’atmosphère apaisante et l’architecture marocaine m’ont charmé. Je recommande vivement cet endroit authentique !', 'An unforgettable stay at Riad Les 4 Jardins. The relaxing atmosphere and Moroccan architecture captivated me. I highly recommend this authentic place!')}
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-3">
            <ResponsiveImage
              src={sophieAvatar}
              onError={(e) => (e.currentTarget.style.display = "none")}
              alt="Sophie L."
              className="h-14 w-14 rounded-full ring-2 ring-white/60 object-cover"
              sizes="56px"
            />
            <span className="text-lg">{copy('rooms.legacyReviewer', 'Sophie L.', 'Sophie L.')}</span>
          </div>
        </div>
      </section>

      {/* === Brown banner like your screenshot === */}
      <section className="bg-[#6E5D53] text-center py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-5">
            {copy('rooms.bannerTitle', 'Suites élégantes', 'Elegant Suites')}
          </h2>
          <p className="text-white/95 text-lg leading-relaxed mb-8">
            {copy('rooms.bannerText', 'Découvrez nos chambres traditionnelles, chacune offrant un charme unique et une atmosphère apaisante.', 'Discover our traditional rooms, each offering unique charm and a calming atmosphere.')}
          </p>
          <a
            href={settings.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-gold text-lg"
          >
            {copy('rooms.book', 'Réservez', 'Book')}
          </a>
        </div>
      </section>

      {/* ---------- LIGHTBOX OVERLAY ---------- */}
      <Lightbox open={lbOpen} src={lbSrc} alt={lbAlt} onClose={closeLightbox} />
    </div>
  );
}

/** Rounded image card that opens the lightbox when clicked */
function RoundedImage({ src, alt, tall = false, onOpen, priority = false }) {
  const { media, images } = useContent();
  const image = media[images[src]?.src || src];
  const open = () => onOpen && onOpen(src, alt);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <a
      data-photo="true"
      href={image.variants.at(-1).src}
      onClick={event => { event.preventDefault(); open(); }}
      onKeyDown={onKey}
      className="block rounded-[18px] overflow-hidden shadow-lg ring-1 ring-black/10"
    >
      <ResponsiveImage
        src={src}
        alt={alt}
        className={`w-full ${
          tall ? "h-[420px] md:h-[460px]" : "h-[210px] md:h-[220px]"
        } object-cover cursor-zoom-in outline-none`}
        priority={priority}
        sizes={tall ? '(min-width: 896px) 482px, (min-width: 768px) 54vw, calc(100vw - 48px)' : '(min-width: 896px) 338px, (min-width: 768px) 38vw, calc(100vw - 48px)'}
      />
    </a>
  );
}

/** Very small lightbox component (no external lib) */
function Lightbox({ open, src, alt, onClose }) {
  const copy = useCopy();
  const dialogRef = useDialog(open, onClose);
  if (!open) return null;
  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={copy('rooms.preview', 'Aperçu de la chambre', 'Room photo preview')}
    >
      <div className="relative max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <ResponsiveImage
          src={src}
          alt={alt}
          className="max-h-[90vh] rounded-lg object-contain shadow-2xl"
          sizes="90vw"
          loading="eager"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 rounded-full bg-white/90 hover:bg-white text-brand-charcoal w-9 h-9 md:w-10 md:h-10 grid place-items-center shadow"
          aria-label={copy('rooms.close', 'Fermer', 'Close')}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function getTitle(room) {
  return room.title;
}
function getDesc(room) {
  return room.desc;
}
