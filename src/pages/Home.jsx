// src/pages/Home.jsx
import { useTranslation } from "react-i18next";

// 3-cards images
import imgRooms from "../assets/home/rooms.jpg";
import imgSpa from "../assets/home/spa.jpg";
import imgRestaurant from "../assets/home/restaurant.jpg";

// Marrakech section images
import imgGarden from "../assets/home/garden.jpg";
import imgSouk from "../assets/home/souk.jpg";

// Offer images
import imgAirport from "../assets/home/airport.jpg";
import imgHammam from "../assets/home/hammam.jpg";

// Testimonials background + avatars
import avaSophie from "../assets/home/ava-sophie.jpg";
import avaMarc from "../assets/home/ava-marc.jpg";

export default function Home() {
  const { t, i18n } = useTranslation();

  const cards = [
    {
      img: imgRooms,
      title: t("cards.rooms.title"),
      desc: t("cards.rooms.desc"),
      href: "/chambres",
      cta: t("cards.rooms.cta"),
    },
    {
      img: imgSpa,
      title: t("cards.spa.title"),
      desc: t("cards.spa.desc"),
      href: "/spa",
      cta: t("cards.spa.cta"),
    },
    {
      img: imgRestaurant,
      title: t("cards.restaurant.title"),
      desc: t("cards.restaurant.desc"),
      href: "/restaurant",
      cta: t("cards.restaurant.cta"),
    },
  ];

  return (
    <div>
      {/* === Hero === */}
      <HeroSection/>

      {/* === 3 Feature Cards (Rooms / Spa / Restaurant) === */}
      <section className="bg-brand-cream py-10 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-brand-teal font-bold">
              {t("hero.title")}
            </h2>
            <p className="mt-3 text-[15px] font-[500] max-w-2xl mx-auto text-brand-teal">
              {t("hero.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-12 items-start">
            {cards.map((c) => (
              <article key={c.title} className="text-center">
                <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-[360px] md:h-[380px] object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-6 text-[26px] text-brand-teal font-bold">{c.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-brand-teal max-w-sm mx-auto font-[500]">
                  {c.desc}
                </p>
                <a href={c.href} className="btn-gold mt-5 inline-block">
                  {c.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* === Marrakech Section === */}
      <section className="bg-brand-cream py-6 md:py-10">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-4 md:gap-6 items-start">
          <div>
            <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
              <img
                src={imgGarden}
                alt={t("marrakech.left.alt")}
                className="w-full h-[420px] md:h-[440px] object-cover"
              />
            </div>
            <div className="mb-6  flex-col items-center justify-center md:flex hidden">
              <h3 className="mt-6 text-2xl w-full text-start text-brand-teal font-bold">{t("marrakech.left.title")}</h3>
              <p className="mt-3 text-[15px] text-brand-teal">{t("marrakech.left.desc")}</p>
              <a href="/services-activites" className="btn-gold mt-5 hidden md:inline-block">
                {t("marrakech.left.cta")}
              </a>
            </div>
            <div className="mb-6 text-center inline md:hidden">
              <h2 className="text-[24px] text-brand-teal font-bold">{t("marrakech.right.title")}</h2>
              <p className="mt-3 text-[15px] text-brand-teal">{t("marrakech.right.desc")}</p>
            </div>
          </div>

          <div className="flex md:flex-col flex-col-reverse">
            <div className="mb-6 text-center md:text-left md:inline hidden">
              <h3 className="text-[24px] text-brand-teal font-bold">{t("marrakech.right.title")}</h3>
              <p className="mt-3 text-[15px] text-brand-teal">{t("marrakech.right.desc")}</p>
            </div>
            <div className="mb-6 text-center inline md:hidden">
              <h3 className="mt-6 text-2xl text-brand-teal font-bold">{t("marrakech.left.title")}</h3>
              <p className="mt-3 text-[15px] text-brand-teal">{t("marrakech.left.desc")}</p>
            </div>
            <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
              <img
                src={imgSouk}
                alt={t("marrakech.right.alt")}
                className="w-full h-[420px] md:h-[440px] object-cover"
              />
            </div>
          </div>
          <div className="flex justify-center md:hidden">
            <a href="/services-activites" className="btn-gold-rounded mt-5 w-fit">
              {t("marrakech.left.cta")}
            </a>
          </div>
        </div>
      </section>

      {/* === Offers === */}
      <section className="bg-[#F5EADE] py-16 md:py-20 " id="offres-speciales">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          <h2 className="text-center text-4xl md:text-5xl text-brand-teal font-bold">
            {t("offers.title")}
          </h2>

          {/* Offer 1 */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div>
              <h3 className="text-2xl md:text-3xl text-brand-teal font-semibold">{t("offers.offer5.title")}</h3>
              <p className="mt-3 text-[15px] text-brand-charcoal/80">{t("offers.offer5.desc")}</p>
              <ul className="mt-3 ml-5 list-disc text-[15px] space-y-1 text-brand-charcoal/90">
                {t("offers.offer5.items", { returnObjects: true }).map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-brand-charcoal/70">{t("offers.offer5.note")}</p>
              <a href="#booking" className="btn-gold mt-4 inline-block">
                {t("offers.offer5.cta")}
              </a>
            </div>
            <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
              <img src={imgAirport} alt="Aéroport Marrakech Menara" className="w-full h-[360px] object-cover" />
            </div>
          </div>

          {/* Offer 2 */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
              <img src={imgHammam} alt="Hammam traditionnel" className="w-full h-[360px] object-cover" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl text-brand-teal font-semibold">{t("offers.offer7.title")}</h3>
              <p className="mt-3 text-[15px] text-brand-charcoal/80">{t("offers.offer7.desc")}</p>
              <ul className="mt-3 ml-5 list-disc text-[15px] space-y-1 text-brand-charcoal/90">
                {t("offers.offer7.items", { returnObjects: true }).map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-brand-charcoal/70">{t("offers.offer7.note")}</p>
              <a href="#booking" className="btn-gold mt-4 inline-block">
                {t("offers.offer7.cta")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === Testimonials === */}
      <section className={`relative flex items-center text-white h-[5 0vh] md:h-screen bg-[url('/src/assets/home/testimonials.jpg')] bg-fixed bg-cover bg-center`}>
        {/* <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${testimonialsBg})` }}
        /> */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 text-center">
            {[{ text: t("testimonials.one"), name: "Sophie L.", img: avaMarc },
              { text: t("testimonials.two"), name: "Marc D.", img: avaSophie }].map((q, i) => (
              <figure key={i}>
                <div className="text-brand-gold mb-3 tracking-[0.3em]">★★★★★</div>
                <blockquote className="leading-relaxed text-semibold">{q.text}</blockquote>
                <figcaption className="mt-4 flex flex-col items-center gap-2">
                  <img src={q.img} alt={q.name} className="h-10 w-10 rounded-full ring-2 ring-white/50 object-cover" />
                  <span className="text-sm">{q.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* === Book Your Stay === */}
      <section className="bg-[#6E5D53] text-center py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl text-white mb-6 font-semibold">
            {i18n.language.startsWith("fr")
              ? "Réservez votre séjour"
              : "Book your stay"}
          </h2>
          <p className="text-white text-[16px] font- leading-relaxed mb-8 sm:mx-14">
            {i18n.language.startsWith("fr")
              ? "Découvrez l’élégance et l’authenticité de notre riad à Marrakech. Réservez votre chambre dès maintenant."
              : "Discover the elegance and authenticity of our riad in Marrakech. Book your room now."}
          </p>
          <a
            href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="btn-gold text-xl !rounded-[14px] font-bold"
          >
            {i18n.language.startsWith("fr") ? "Réservez" : "Book Now"}
          </a>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";

export function HeroSection() {
  const { i18n } = useTranslation();
  // Put your images here (first one can be your current `hero`)
  const images = [
    "/images/hero.jpg",
    "/images/hero-cover2.png",
    "/images/hero-cover3.png",
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 6s
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 6000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    /* === Hero (unchanged sizing/structure) === */
    <section
      className="h-[80vh] md:h-screen min-h-[560px] grid place-items-center text-center relative overflow-hidden"
    >
      {/* Background slider layer */}
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden="true"
            className={[
              "absolute inset-0 bg-center bg-cover transition-opacity duration-[1200ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      {/* Overlay (unchanged) */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Your existing mobile button (unchanged) */}
      <div className="block sm:hidden relative text-white space-y-3 px-4">
        <a
          href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
          target="_blank"
          rel="noreferrer"
          className="px-6 py-2 rounded-full bg-brand-gold text-brand-forest font-semibold shadow transition-all duration-300 hover:shadow-lg hover:bg-brand-forest hover:text-brand-gold"
        >
          {i18n.language.startsWith("fr") ? "Réservez" : "Book"}
        </a>
      </div>
    </section>
  );
}
