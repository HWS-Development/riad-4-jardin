// src/pages/Home.jsx
import { useTranslation } from "react-i18next";

// Hero image
import hero from "../assets/hero.jpg";

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
import testimonialsBg from "../assets/home/testimonials.jpg";
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
      <section
        className="h-[80vh] min-h-[560px] grid place-items-center text-center relative"
        style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-white space-y-3 px-4"></div>
      </section>

      {/* === 3 Feature Cards (Rooms / Spa / Restaurant) === */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-teal">
              {t("hero.title")}
            </h2>
            <p className="mt-3 text-lg max-w-2xl mx-auto text-brand-charcoal/80">
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
                <h3 className="mt-6 font-serif text-2xl text-brand-teal">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-charcoal/80 max-w-sm mx-auto">
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
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-start">
          <div>
            <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
              <img
                src={imgGarden}
                alt={t("marrakech.left.alt")}
                className="w-full h-[420px] md:h-[440px] object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-2xl text-brand-teal">{t("marrakech.left.title")}</h3>
            <p className="mt-3 text-[15px] text-brand-charcoal/80">{t("marrakech.left.desc")}</p>
            <a href="/services-activites" className="btn-gold mt-5 inline-block">
              {t("marrakech.left.cta")}
            </a>
          </div>

          <div>
            <div className="mb-6 text-center md:text-left">
              <h2 className="font-serif text-2xl md:text-3xl text-brand-teal">{t("marrakech.right.title")}</h2>
              <p className="mt-3 text-[15px] text-brand-charcoal/80">{t("marrakech.right.desc")}</p>
            </div>
            <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/5">
              <img
                src={imgSouk}
                alt={t("marrakech.right.alt")}
                className="w-full h-[420px] md:h-[440px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* === Offers === */}
      <section className="bg-brand-cream py-16 md:py-20 " id="offres-speciales">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          <h2 className="text-center font-serif text-4xl md:text-5xl text-brand-teal">
            {t("offers.title")}
          </h2>

          {/* Offer 1 */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">
            <div>
              <h3 className="font-serif text-2xl text-brand-teal">{t("offers.offer5.title")}</h3>
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
              <h3 className="font-serif text-2xl text-brand-teal">{t("offers.offer7.title")}</h3>
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
      <section className="relative text-white">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${testimonialsBg})` }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 text-center">
            {[{ text: t("testimonials.one"), name: "Sophie L.", img: avaSophie },
              { text: t("testimonials.two"), name: "Marc D.", img: avaMarc }].map((q, i) => (
              <figure key={i}>
                <div className="text-brand-gold mb-3 tracking-[0.3em]">★★★★★</div>
                <blockquote className="leading-relaxed">{q.text}</blockquote>
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
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
            {i18n.language.startsWith("fr")
              ? "Réservez votre séjour"
              : "Book your stay"}
          </h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            {i18n.language.startsWith("fr")
              ? "Découvrez l’élégance et l’authenticité de notre riad à Marrakech. Réservez votre chambre dès maintenant."
              : "Discover the elegance and authenticity of our riad in Marrakech. Book your room now."}
          </p>
          <a
            href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="btn-gold text-xl"
          >
            {i18n.language.startsWith("fr") ? "Réservez" : "Book Now"}
          </a>
        </div>
      </section>
    </div>
  );
}
