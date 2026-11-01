// src/pages/Restaurant.jsx
import { useState } from "react";
import { sendEmail } from "../utils/sendEmail"; // ✅ Shared EmailJS util
import { useCopy, useContent } from '../content/ContentContext.jsx';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { initialFormValues } from '../utils/formValues.js';

// === IMAGES ===
import imgHero from "../assets/restaurant/hero.jpg";
import imgBreakfast from "../assets/restaurant/breakfast.jpg";
import imgTable from "../assets/restaurant/table.jpg";
import imgWorkshop from "../assets/services/workshops.jpg";

export default function Restaurant() {
  const copy = useCopy();
  const { settings } = useContent();

  // --- form state ---
  const [form, setForm] = useState(() => initialFormValues('restaurant-form', { name: "", phone: "", message: "", email: "" }));
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const submitted = Object.fromEntries(new FormData(e.currentTarget));
    setForm(submitted);

    if (!submitted.name || !submitted.phone) {
      setMsg(copy('restaurant.required', 'Veuillez remplir les champs obligatoires.', 'Please fill the required fields.'));
      return;
    }

    setLoading(true);
    const res = await sendEmail(submitted, "Restaurant");
    setLoading(false);

    if (res.success) {
      setMsg(copy('restaurant.sent', 'Votre demande a bien été envoyée.', 'Your request has been sent successfully.'));
      setForm({ name: "", phone: "", email: "", message: "" });
    } else {
      setMsg(copy('restaurant.failed', 'Une erreur s’est produite, réessayez plus tard.', 'An error occurred, please try again later.'));
    }
  };

  return (
    <div className="bg-white text-brand-charcoal">
      {/* ========= HERO ========= */}
      <section
        className="relative h-[80vh] min-h-[560px] grid place-items-center text-center"
      >
        <ResponsiveImage src={imgHero} alt="" sizes="100vw" priority className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 px-6">
          <h1
            className="text-white font-bold text-4xl md:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {copy('restaurant.h1', 'Restauration – Le goût authentique du Maroc', 'Restaurant – The Authentic Taste of Morocco')}
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
              {copy('restaurant.title', 'Restauration – Le goût authentique du Maroc au cœur des jardins', 'Restaurant – Authentic Moroccan flavors in the heart of the garden')}
            </h2>
          </div>

          {/* Two blocks: image + text */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="overflow-hidden shadow-md w-full h-[380px] md:h-[420px]"
              style={{
                borderRadius: "0 260px 0 260px / 0 160px 0 160px",
              }}
            >
              <ResponsiveImage
                src={imgTable}
                alt={copy('restaurant.tableAlt', 'Table du jardin', 'Garden table')}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <h3
                className="font-bold text-xl md:text-2xl mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {copy('restaurant.diningTitle', 'Restauration', 'Restaurant')}
              </h3>
              <p className="text-[15px] leading-relaxed">
                {copy('restaurant.diningIntro', 'Au Riad 4 Jardins, chaque repas est une invitation à découvrir la richesse de la cuisine marocaine dans un cadre serein et chaleureux.', 'At Riad 4 Jardins, each meal is an invitation to discover the richness of Moroccan cuisine in a serene and warm setting.')}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                {copy('restaurant.diningText', 'Les saveurs locales se marient avec une touche moderne pour offrir une expérience conviviale et authentique.', 'Local flavors blend with a modern touch to offer a friendly, authentic experience.')}
              </p>
            </div>
          </div>

          {/* Second row */}
          <div className="mt-8 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="font-bold text-xl md:text-2xl mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {copy('restaurant.breakfastTitle', 'Petit-déjeuner', 'Breakfast')}
              </h3>
              <p className="text-[15px] leading-relaxed">
                {copy('restaurant.breakfastIntro', 'Chaque matin, un petit-déjeuner généreux est servi dans les jardins paisibles du riad.', 'Every morning, a generous breakfast is served in the peaceful riad gardens.')}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed">
                {copy('restaurant.breakfastText', 'Une parenthèse matinale gourmande et colorée pour bien commencer la journée.', 'A colorful and delicious way to start your day.')}
              </p>
            </div>

            <div
              className="overflow-hidden shadow-md w-full h-[380px] md:h-[420px]"
              style={{
                borderRadius: "0 200px 0 200px / 0 120px 0 120px",
              }}
            >
              <ResponsiveImage
                src={imgBreakfast}
                alt={copy('restaurant.breakfastAlt', 'Petit-déjeuner', 'Breakfast')}
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
            <h2
              className="text-3xl md:text-4xl text-white font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {copy('restaurant.workshopTitle', 'Atelier cuisine', 'Cooking Workshop')}
            </h2>
            <p className="mt-2 opacity-90 text-sm md:text-base">
              {copy('restaurant.workshopIntro', 'Indiquez vos préférences, nous vous recontacterons rapidement.', 'Tell us your preferences, we’ll get back to you soon.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* --- FORM CARD --- */}
            <form
              id="restaurant-form"
              action={`mailto:${settings.email}`} method="post" encType="text/plain"
              onSubmit={onSubmit}
              className="bg-white text-brand-charcoal rounded-xl p-6 shadow-lg ring-1 ring-black/10"
            >
              {/* Name */}
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                {copy('restaurant.name', 'Nom *', 'Name *')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={copy('restaurant.namePlaceholder', 'Votre nom', 'Your name')}
                required
              />

              {/* Email */}
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                {copy('restaurant.email', 'E-mail', 'Email')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="example@email.com"
              />

              {/* Phone */}
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                {copy('restaurant.phone', 'Téléphone *', 'Phone *')}
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
                {copy('restaurant.message', 'Votre message', 'Your message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={copy('restaurant.messagePlaceholder', 'Dites-nous vos besoins', 'Tell us your needs')}
              />

              {/* Submit */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 inline-block px-8 py-3 rounded-lg bg-[#E9C46A] text-[#264653] font-semibold shadow transition hover:bg-[#264653] hover:text-[#E9C46A]"
                >
                  {loading ? copy('restaurant.sending', 'Envoi...', 'Sending...') : copy('restaurant.send', 'Envoyer', 'Send')}
                </button>
              </div>

              <p role="status" className="mt-3 text-sm text-center text-brand-teal">{msg}</p>
            </form>

            {/* --- SIDE IMAGE --- */}
            <div className="rounded-xl overflow-hidden shadow-lg mt-10 md:mt-16">
              <ResponsiveImage
                src={imgWorkshop}
                alt={copy('restaurant.workshopAlt', 'Atelier cuisine', 'Cooking workshop')}
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
