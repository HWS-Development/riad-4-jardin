import { useState, useEffect, useCallback } from "react";
import { useCopy, useContent } from '../content/ContentContext.jsx';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { useDialog } from '../utils/useDialog.js';

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
  const copy = useCopy();

  const images = [
    g01, g02, g03, g04, g05, g06,
    g07, g08, g09, g10, g11, g12,
  ];
  const descriptions = [
    copy('gallery.photo1', 'Jardins et fontaine du riad éclairés la nuit', 'Riad gardens and fountain illuminated at night'),
    copy('gallery.photo2', 'Façade et jardin du Riad 4 Jardins', 'Riad 4 Jardins facade and garden'),
    copy('gallery.photo3', 'Intérieur du hammam traditionnel', 'Inside the traditional hammam'),
    copy('gallery.photo4', 'Table dans le patio végétalisé du riad', 'Table in the leafy riad courtyard'),
    copy('gallery.photo5', 'Porte sculptée et décor traditionnel marocain', 'Carved doorway and traditional Moroccan decor'),
    copy('gallery.photo6', 'Table dressée dans les jardins', 'Table set in the gardens'),
    copy('gallery.photo7', 'Art de la table sous les arbres du jardin', 'Dining table beneath the garden trees'),
    copy('gallery.photo8', 'Allée du jardin et fontaine centrale', 'Garden path and central fountain'),
    copy('gallery.photo9', 'Végétation et fontaine dans les jardins du riad', 'Plants and fountain in the riad gardens'),
    copy('gallery.photo10', 'Service à thé dans le jardin marocain', 'Tea served in the Moroccan garden'),
    copy('gallery.photo11', 'Vue du patio arboré depuis les étages', 'View of the leafy courtyard from upstairs'),
    copy('gallery.photo12', 'Architecture et terrasses du Riad 4 Jardins', 'Architecture and terraces at Riad 4 Jardins'),
  ];

  // Lightbox slider state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openSlider = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const closeSlider = () => setOpen(false);
  const dialogRef = useDialog(open, closeSlider);
  const count = images.length;
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

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
  }, [open, next, prev]);

  return (
    <div className="bg-brand-gold text-brand-forest">
      {/* Title */}
      <section className="pt-28 pb-8">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {copy('gallery.title', 'Galerie', 'Gallery')}
          </h1>
          <p
            className="mt-2 max-w-xl mx-auto text-sm opacity-90 italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {copy('gallery.intro', 'Un havre de tranquillité au cœur de Marrakech, alliant charme traditionnel, confort raffiné et jardins paisibles.', 'A haven of tranquility in the heart of Marrakech, blending traditional charm, refined comfort and peaceful gardens.')}
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
                alt={descriptions[i]}
                priority={i === 0}
                sizes={i === 1 ? '(min-width: 1152px) 731px, (min-width: 1024px) 64vw, (min-width: 640px) 46vw, calc(100vw - 48px)' : '(min-width: 1152px) 357px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, calc(100vw - 48px)'}
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
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={copy('gallery.dialog', 'Photos du riad', 'Riad photos')}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeSlider}
        >
          <button
            onClick={closeSlider}
            className="absolute top-5 right-5 text-white text-3xl hover:text-gray-300"
            aria-label={copy('gallery.close', 'Fermer', 'Close')}
          >
            ✕
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 text-white text-4xl hover:text-gray-300"
            aria-label={copy('gallery.previous', 'Photo précédente', 'Previous photo')}
            
          >
            ‹
          </button>

          <ResponsiveImage
            src={images[index]}
            alt={descriptions[index]}
            loading="eager"
            sizes="90vw"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 text-white text-4xl hover:text-gray-300"
            aria-label={copy('gallery.next', 'Photo suivante', 'Next photo')}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

/** Individual Tile Card **/
function Tile({ src, alt, className = "", height = 260, onClick, sizes, priority }) {
  const { media, images } = useContent();
  const image = media[images[src]?.src || src];
  return (
    <a
      data-photo="true"
      href={image.variants.at(-1).src}
      onClick={event => { event.preventDefault(); onClick(); }}
      className={`block w-full rounded-[18px] overflow-hidden shadow-md ring-1 ring-black/10 bg-white cursor-zoom-in transition-transform hover:scale-[1.02] ${className}`}
      style={{ height }}
    >
      <ResponsiveImage
        src={src}
        alt={alt}
        loading="lazy"
        sizes={sizes}
        priority={priority}
        className="w-full h-full object-cover block"
      />
    </a>
  );
}
