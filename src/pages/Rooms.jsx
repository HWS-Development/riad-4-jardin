// src/pages/Rooms.jsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
      titleFR: "Suite deluxe avec balcon",
      titleEN: "Deluxe Suite with Balcony",
      descFR:
        "Spacieuse et élégamment décorée par des artisans marocains, cette suite climatisée se compose d’une chambre et d’un espace détente aménagé dans le prolongement. Elle comprend une télévision à écran plat, une armoire, un coffre-fort et une bouilloire subtilement intégrée pour agrémenter votre séjour. La salle de bains privative est équipée d’une douche, d’un sèche-cheveux, de peignoirs et d’articles de toilette gratuits. Depuis le balcon, profitez d’une vue apaisante sur le jardin.",
      descEN:
        "Spacious and elegantly decorated by Moroccan artisans, this air-conditioned suite features a bedroom and a lounge extension. It includes a flat-screen TV, wardrobe, safe and a discreet kettle for comfort. The private bathroom has a shower, hair dryer, bathrobes and complimentary toiletries. From the balcony, enjoy a soothing view over the garden.",
      photos: [dlxMain, dlxA, dlxB],
      band: "teal",
      headerless: false,
    },
    {
      id: "triple",
      titleFR: "Suite triple avec vue sur jardins",
      titleEN: "Triple Suite with Garden View",
      descFR:
        "Confort et authenticité se rencontrent dans cette chambre triple climatisée, habillée d’une décoration artisanale marocaine. Elle comprend un coin salon agréable, une télévision à écran plat, une armoire, un coffre-fort, ainsi qu’une salle de bains privative avec douche, sèche-cheveux, peignoirs et articles de toilette offerts. Une bouilloire est également prévue pour votre confort.",
      descEN:
        "Comfort and authenticity meet in this air-conditioned triple suite adorned with Moroccan craftsmanship. It includes a cozy lounge area, flat-screen TV, wardrobe, safe, and a private bathroom with shower, hair dryer, robes and complimentary toiletries. A kettle is also provided for your comfort.",
      photos: [triMain, triA, triB],
      band: "white",
    },
    {
      id: "double",
      titleFR: "Suite Double",
      titleEN: "Double Suite",
      descFR:
        "Cette chambre double climatisée vous accueille dans un décor raffiné, inspiré du savoir-faire des artisans marocains. Elle dispose d’un petit espace détente, d’une télévision à écran plat, d’une armoire, d’un coffre-fort et d’une salle de bains privative équipée d’une douche et d’un sèche-cheveux. Une bouilloire est également prévue pour votre confort.",
      descEN:
        "This air-conditioned double suite welcomes you into a refined décor inspired by Moroccan artisans. It includes a small lounge corner, flat-screen TV, wardrobe, safe and a private bathroom with shower and hair dryer. A kettle is also provided for your comfort.",
      photos: [dblMain, dblA, dblB],
      band: "cream",
    },
  ];

  return (
    <div className="bg-white">
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
                href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
                target="_blank"
                rel="noreferrer"
                className="btn-gold"
              >
                {isFR ? "Réservez" : "Book"}
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
            {isFR
              ? "Un séjour inoubliable au riad les 4 jardins. L'atmosphère apaisante et l'architecture marocaine m'ont charmé. Je recommande vivement cet endroit authentique !"
              : "An unforgettable stay at Riad Les 4 Jardins. The relaxing atmosphere and Moroccan architecture captivated me. I highly recommend this authentic place!"}
          </blockquote>

          <div className="mt-10 flex flex-col items-center gap-3">
            <img
              src={sophieAvatar}
              onError={(e) => (e.currentTarget.style.display = "none")}
              alt="Sophie L."
              className="h-14 w-14 rounded-full ring-2 ring-white/60 object-cover"
            />
            <span className="text-lg">Sophie L.</span>
          </div>
        </div>
      </section>

      {/* === Brown banner like your screenshot === */}
      <section className="bg-[#6E5D53] text-center py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-5">
            {isFR ? "Suite Élégantes" : "Elegant Suites"}
          </h2>
          <p className="text-white/95 text-lg leading-relaxed mb-8">
            {isFR
              ? "Découvrez nos chambres traditionnelles, chacune offrant un charme unique et une atmosphère apaisante."
              : "Discover our traditional rooms, each offering unique charm and a calming atmosphere."}
          </p>
          <a
            href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="btn-gold text-lg"
          >
            {isFR ? "Réservez" : "Book"}
          </a>
        </div>
      </section>

      {/* ---------- LIGHTBOX OVERLAY ---------- */}
      <Lightbox open={lbOpen} src={lbSrc} alt={lbAlt} onClose={closeLightbox} />
    </div>
  );
}

/** Rounded image card that opens the lightbox when clicked */
function RoundedImage({ src, alt, tall = false, onOpen }) {
  const open = () => onOpen && onOpen(src, alt);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  return (
    <div
      className="rounded-[18px] overflow-hidden shadow-lg ring-1 ring-black/10"
    >
      <img
        src={src}
        alt={alt}
        className={`w-full ${
          tall ? "h-[420px] md:h-[460px]" : "h-[210px] md:h-[220px]"
        } object-cover cursor-zoom-in outline-none`}
        loading="lazy"
        role="button"
        tabIndex={0}
        onClick={open}
        onKeyDown={onKey}
      />
    </div>
  );
}

/** Very small lightbox component (no external lib) */
function Lightbox({ open, src, alt, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label="Image preview"
    >
      <div className="relative max-w-6xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt}
          className="max-h-[90vh] rounded-lg object-contain shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 rounded-full bg-white/90 hover:bg-white text-brand-charcoal w-9 h-9 md:w-10 md:h-10 grid place-items-center shadow"
          aria-label="Close"
          title="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function getTitle(room, isFR) {
  return isFR ? room.titleFR : room.titleEN;
}
function getDesc(room, isFR) {
  return isFR ? room.descFR : room.descEN;
}
