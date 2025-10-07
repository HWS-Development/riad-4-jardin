// src/pages/Spa.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Images (adjust paths to your files)
import heroSpa from "../assets/spa/hero.jpg";
import imgHammam from "../assets/spa/hammam.jpg";
import imgMassage from "../assets/spa/massage.jpg";
import imgEsthetique from "../assets/spa/esthetique.jpg";
import imgFormSide from "../assets/spa/form-side.jpg";

export default function Spa() {
  const { i18n } = useTranslation();
  const fr = i18n.language?.startsWith("fr");

  // --- Simple form state (no backend) ---
  const [form, setForm] = useState({
    name: "",
    type: "",
    phone: "",
    datetime: "",
    message: "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.type || !form.datetime) {
      setMsg(fr ? "Veuillez remplir les champs obligatoires." : "Please fill the required fields.");
      return;
    }
    setMsg(
      fr
        ? "Merci ! Nous confirmerons votre rendez-vous sous peu."
        : "Thanks! We’ll confirm your appointment shortly."
    );
    setForm({ name: "", type: "", phone: "", datetime: "", message: "" });
  };

  const cards = [
    {
      img: imgHammam,
      title: fr ? "Hammams traditionnels" : "Traditional Hammams",
      text: fr
        ? "Découvrez l’art du hammam marocain, un rituel ancestral de purification et de détente."
        : "Discover the art of the Moroccan hammam, an ancestral ritual of purification and relaxation.",
    },
    {
      img: imgMassage,
      title: fr ? "Massages & Bien-être" : "Massages & Wellness",
      text: fr
        ? "Offrez-vous une parenthèse de sérénité grâce à nos massages professionnels."
        : "Treat yourself to serenity with our professional massages.",
    },
    {
      img: imgEsthetique,
      title: fr ? "Esthétique & Soins du visage" : "Aesthetics & Face Care",
      text: fr
        ? "Soins du visage, manucure, pédicure… Produits naturels pour sublimer votre peau."
        : "Facial care, manicure, pedicure… Natural products to enhance your skin.",
    },
  ];

  return (
    <div className="bg-white text-brand-charcoal">
      {/* ===== HERO ===== */}
      <section
        className="h-[70vh] min-h-[520px] relative grid place-items-center text-center"
        style={{ backgroundImage: `url(${heroSpa})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <h1 className="relative text-white font-serif text-4xl md:text-6xl drop-shadow">
          {fr ? "Détente et Bien-être" : "Relaxation & Wellness"}
        </h1>
      </section>

      {/* ===== 3 CARDS ===== */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-teal">
              {fr ? "Nos soins Spa & Bien-être" : "Our Spa & Wellness Treatments"}
            </h2>
            <p className="mt-2 text-brand-charcoal/80">
              {fr
                ? "Découvrez notre spa au riad, un havre de paix dédié à votre relaxation et bien-être."
                : "Discover our riad spa, a haven of peace dedicated to your relaxation and wellness."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {cards.map((c) => (
              <article key={c.title} className="text-center">
                <div className="rounded-[20px] overflow-hidden shadow-lg ring-1 ring-black/5">
                  <img src={c.img} alt={c.title} className="w-full h-[260px] md:h-[280px] object-cover" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-brand-teal">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/80">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAL STRIP – MENU CTA ===== */}
      <section className="bg-brand-teal text-white py-16 text-center">
  <div className="mx-auto max-w-3xl px-6">
    <h4
      className="text-white text-[48px] font-serif font-bold mb-6 leading-tight"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      {fr ? "Voir la carte du Spa" : "See the Spa Menu"}
    </h4>

    <p
      className="text-white opacity-90 mb-8 text-[16px] leading-relaxed"
      style={{ fontFamily: "'Playfair Display', serif", lineHeight: "1.6" }}
    >
      {fr
        ? "L’accès à la carte complète du Spa sera communiqué ultérieurement pour intégration."
        : "The full Spa menu will be provided later for integration."}
    </p>

    <a
      href="mailto:riad4jardins@gmail.com"
      target="_self"
      rel="noreferrer"
      className="inline-block px-10 py-3 rounded-[15px] text-[20px] font-medium shadow-md transition-all duration-300"
      style={{
        backgroundColor: "rgb(233, 196, 106)", // brand gold
        color: "rgb(38, 70, 83)",              // brand forest / teal
        borderRadius: "15px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgb(38, 70, 83)";
        e.currentTarget.style.color = "rgb(233, 196, 106)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgb(233, 196, 106)";
        e.currentTarget.style.color = "rgb(38, 70, 83)";
      }}
    >
      {fr ? "Menu" : "Menu"}
    </a>
  </div>
</section>





      {/* ===== BROWN FORM BLOCK ===== */}
      {/* ===== BROWN FORM BLOCK ===== */}
{/* ===== BROWN FORM BLOCK ===== */}
<section className="bg-[#6E5D53] text-white py-16 md:py-20">
  <div className="mx-auto max-w-6xl px-6">
    <div className="text-center mb-10">
      <h3 className="font-serif text-3xl md:text-4xl">
        {fr ? "Demander un rendez-vous SPA" : "Request a SPA Appointment"}
      </h3>
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
        className="bg-white text-brand-charcoal rounded-xl p-5 md:p-6 shadow-lg ring-1 ring-black/10"
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

        {/* Type de soin */}
        <label className="block text-sm font-medium mb-1" htmlFor="type">
          {fr ? "Type de soin *" : "Treatment type *"}
        </label>
        <input
          id="type"
          name="type"
          type="text"
          value={form.type}
          onChange={onChange}
          className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
          placeholder={fr ? "Massage, Hammam, Esthétique…" : "Massage, Hammam, Aesthetics…"}
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

        {/* Datetime */}
        <label className="block text-sm font-medium mb-1" htmlFor="datetime">
          {fr ? "Date et heure *" : "Date & time *"}
        </label>
        <input
          id="datetime"
          name="datetime"
          type="datetime-local"
          value={form.datetime}
          onChange={onChange}
          className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
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
          className="w-full mb-6 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
          placeholder={fr ? "Dites-nous vos besoins" : "Tell us your needs"}
        />

        {/* Submit (CENTERED) */}
        <button type="submit" className="btn-gold block mx-auto">
          {fr ? "Envoyer la demande" : "Send request"}
        </button>

        {msg && <p className="mt-3 text-sm text-brand-teal text-center">{msg}</p>}
      </form>

      {/* --- SIDE IMAGE — slightly lower than the form --- */}
      <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 md:mt-10">
        <img
          src={imgFormSide}
          alt={fr ? "Ambiance du spa" : "Spa ambiance"}
          className="w-full h-[520px] object-cover"
        />
      </div>
    </div>
  </div>
</section>


    </div>
  );
}
