import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// === IMAGES ===
import g01 from "../assets/gallery/g01.jpg";
import g02 from "../assets/gallery/g02.jpg";
import g03 from "../assets/gallery/g03.jpg";
import g04 from "../assets/gallery/g04.jpg";
import g05 from "../assets/gallery/g05.jpg";
import g06 from "../assets/gallery/g06.jpg";
import g07 from "../assets/gallery/g07.jpg";
import g08 from "../assets/gallery/g08.jpg";
import g09 from "../assets/gallery/g09.jpg";
import g10 from "../assets/gallery/g10.jpg";
import g11 from "../assets/gallery/g11.jpg";
import g12 from "../assets/gallery/g12.jpg";

// === GALLERY COMPONENT ===
export default function Gallery() {
  const { i18n } = useTranslation();
  const fr = i18n.language?.startsWith("fr");

  const images = [
    g01, g02, g03, g04, g05, g06,
    g07, g08, g09, g10, g11, g12,
  ];

  // Lightbox slider state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openSlider = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const closeSlider = () => setOpen(false);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  // Keyboard shortcuts
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeSlider();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="bg-brand-gold text-brand-forest">
      {/* Title */}
      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {fr ? "Galerie" : "Gallery"}
          </h1>
          <p
            className="mt-2 max-w-xl mx-auto text-sm opacity-90 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {fr
              ? "Un havre de tranquillité au cœur de Marrakech, alliant charme traditionnel, confort raffiné et jardins paisibles."
              : "A haven of tranquility in the heart of Marrakech, blending traditional charm, refined comfort and peaceful gardens."}
          </p>
        </div>
      </section>

      {/* Mosaic Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((src, i) => (
              <Tile
                key={i}
                src={src}
                alt={`Gallery image ${i + 1}`}
                height={i === 0 || i === 1 ? 300 : 240}
                className={i === 1 ? "sm:col-span-1 lg:col-span-2" : ""}
                onClick={() => openSlider(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Slider */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeSlider}
        >
          <button
            onClick={closeSlider}
            className="absolute top-5 right-5 text-white text-3xl hover:text-gray-300"
            aria-label="Close"
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 text-white text-4xl hover:text-gray-300"
            aria-label="Previous"
            
          >
            ‹
          </button>

          <img
            src={images[index]}
            alt="Gallery large"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 text-white text-4xl hover:text-gray-300"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

/** Individual Tile Card **/
function Tile({ src, alt, className = "", height = 260, onClick }) {
  return (
    <figure
      onClick={onClick}
      className={`rounded-[18px] overflow-hidden shadow-md ring-1 ring-black/10 bg-white cursor-zoom-in transition-transform hover:scale-[1.02] ${className}`}
      style={{ height }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover block"
      />
    </figure>
  );
}
