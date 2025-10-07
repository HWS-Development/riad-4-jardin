// src/pages/Restaurant.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

// === IMAGES (replace with your real paths) ===
import imgHero from "../assets/restaurant/hero.jpg";        // big header image
import imgBreakfast from "../assets/restaurant/breakfast.jpg"; // left rounded image
import imgTable from "../assets/restaurant/table.jpg";         // right rounded image
import imgWorkshop from "../assets/services/workshops.jpg";   // image near the form

export default function Restaurant() {
  const { i18n } = useTranslation();
  const fr = i18n.language?.startsWith("fr");

  // --- simple form state ---
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: send to backend/mail
    setMsg(
      fr
        ? "Merci ! Nous vous recontacterons rapidement."
        : "Thanks! We’ll get back to you shortly."
    );
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="bg-white text-brand-charcoal">
      {/* ========= HERO ========= */}
      <section
        className="relative h-[80vh] min-h-[560px] grid place-items-center text-center"
        style={{
          backgroundImage: `url(${imgHero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6">
          <h1
            className="text-white font-bold text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {fr
              ? "Restauration – Le goût authentique du Maroc"
              : "Restaurant – The Authentic Taste of Morocco"}
          </h1>
        </div>
      </section>

      {/* ========= BEIGE INTRO BLOCK ========= */}
      <section className="bg-[#F3E7D3] text-[#36291F] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2
              className="font-bold text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {fr
                ? "Restauration – Le goût authentique du Maroc au cœur des jardins"
                : "Restaurant – Authentic Moroccan flavors in the heart of the garden"}
            </h2>
          </div>

          {/* Two blocks: image + text */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left rounded image */}
            
<div
  className="overflow-hidden shadow-md w-full h-[380px] md:h-[420px]"
  style={{
    borderRadius: "0 260px 0 260px / 0 160px 0 160px",
  }}
>
  <img
    src={imgTable}
    alt={fr ? "Table du jardin" : "Garden table"}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>


            {/* Right text (restaurant intro) */}
            <div>
              <h3
                className="font-bold text-xl md:text-2xl mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {fr ? "Restauration" : "Restaurant"}
              </h3>
              <p className="text-[15px] leading-relaxed">
                {fr
                  ? "Au Riad 4 jardins, chaque repas est une invitation à découvrir la richesse de la cuisine marocaine dans un cadre serein et chaleureux. Les plats sont préparés à partir de produits frais des marchés, choisis chaque matin, et cuisinés avec passion selon les recettes traditionnelles."
                  : "At Riad 4 Jardins, each meal is an invitation to discover the richness of Moroccan cuisine in a serene and warm setting. Dishes are prepared with fresh market produce chosen each morning and cooked with passion following traditional recipes."}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                {fr
                  ? "Les saveurs locales se marient avec une touche moderne pour offrir une expérience conviviale et authentique. Que ce soit pour le petit-déjeuner, le déjeuner ou le dîner, profitez d’un moment gourmand au milieu des jardins apaisants."
                  : "Local flavors blend with a modern touch to offer a friendly, authentic experience. Whether breakfast, lunch, or dinner, enjoy a delightful moment surrounded by peaceful gardens."}
              </p>
            </div>
          </div>

          {/* Second row: text + rounded image */}
          <div className="mt-8 grid md:grid-cols-2 gap-12 items-center">
            {/* Left text */}
            <div>
              <h3
                className="font-bold text-xl md:text-2xl mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {fr ? "Petit-déjeuner" : "Breakfast"}
              </h3>
              <p className="text-[15px] leading-relaxed">
                {fr
                  ? "Chaque matin, un petit-déjeuner généreux est servi dans les jardins paisibles du riad. Jus locaux, fruits frais, pain traditionnel, crêpes marocaines, confitures maison et autres spécialités selon les saisons."
                  : "Every morning, a generous breakfast is served in the peaceful riad gardens. Local juices, fresh fruit, traditional bread, Moroccan pancakes, homemade jams, and other seasonal specialties."}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                {fr
                  ? "Une parenthèse matinale gourmande et colorée pour bien commencer la journée."
                  : "A colorful and delicious way to start your day."}
              </p>
            </div>

            {/* Right rounded image */}
           {/* Custom organic curve image */}
<div
  className="overflow-hidden shadow-md w-full h-[380px] md:h-[420px]"
  style={{
    borderRadius: "0 200px 0 200px / 0 120px 0 120px", // gives that oval-style curve
    clipPath: "path('M0 0H90%Q100% 40% 90% 100%H0Z')", // ensures smooth curvature
  }}
>
  <img
    src={imgBreakfast}
    alt={fr ? "Table du jardin" : "Garden table"}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</div>

          </div>
        </div>
      </section>

      {/* ========= BROWN FORM BLOCK ========= */}
      <section className="bg-[#6E5D53] text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <strong
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {fr ? "Atelier cuisine" : "Cooking Workshop"}
            </strong>
            <p className="mt-2 opacity-90 text-sm md:text-base">
              {fr
                ? "Indiquez vos préférences, nous vous recontacterons rapidement pour confirmer votre rendez-vous."
                : "Tell us your preferences, we’ll get back to you quickly to confirm your appointment."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* --- FORM CARD --- */}
            <form
              onSubmit={onSubmit}
              className="bg-white text-brand-charcoal rounded-xl p-6 shadow-lg ring-1 ring-black/10"
            >
              {/* Name */}
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                {fr ? "Nom *" : "Name *"}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={fr ? "Votre nom" : "Your name"}
                required
              />

              {/* Phone */}
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                {fr ? "Téléphone *" : "Phone *"}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="+212…"
                required
              />

              {/* Message */}
              <label className="block text-sm font-medium mb-1" htmlFor="message">
                {fr ? "Votre message" : "Your message"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={fr ? "Dites-nous vos besoins" : "Tell us your needs"}
              />

              {/* Submit centered */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="mt-5 inline-block px-8 py-3 rounded-lg bg-[#E9C46A] text-[#264653] font-semibold shadow transition
                             hover:bg-[#264653] hover:text-[#E9C46A]"
                >
                  {fr ? "Envoyer" : "Send"}
                </button>
              </div>

              {msg && <p className="mt-3 text-sm text-brand-teal text-center">{msg}</p>}
            </form>

            {/* --- SIDE IMAGE (slightly lower than form) --- */}
            <div className="rounded-xl overflow-hidden shadow-lg mt-10 md:mt-16">
              <img
                src={imgWorkshop}
                alt={fr ? "Atelier cuisine" : "Cooking workshop"}
                className="w-full h-[480px] object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
