// src/pages/Spa.jsx
import { useState } from "react";
import { sendEmail } from '../utils/sendEmail.js';
import { useCopy, useContent } from '../content/ContentContext.jsx';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { initialFormValues } from '../utils/formValues.js';

// Images
import heroSpa from "../assets/spa/hero.jpg";
import imgHammam from "../assets/spa/hammam.jpg";
import imgMassage from "../assets/spa/massage.jpg";
import imgEsthetique from "../assets/spa/esthetique.jpg";
import imgFormSide from "../assets/spa/form-side.jpg";

export default function Spa() {
  const copy = useCopy();
  const { settings } = useContent();

  const [form, setForm] = useState(() => initialFormValues('spa-form', {
    name: "",
    type: "",
    phone: "",
    datetime: "",
    message: "",
  }));
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const submitted = Object.fromEntries(new FormData(e.currentTarget));
    setForm(submitted);

    if (!submitted.name || !submitted.phone || !submitted.type || !submitted.datetime) {
      setMsg(copy('spa.required', 'Veuillez remplir les champs obligatoires.', 'Please fill the required fields.'));
      return;
    }

    const templateParams = {
      ...submitted,
    };

    if (loading) return;
    setLoading(true); setMsg('');
    const result = await sendEmail(templateParams, 'Spa');
    setLoading(false);
    if (result.success) {
      setMsg(copy('spa.sent', 'Merci ! Votre demande a bien été envoyée. Nous vous contacterons bientôt.', 'Thank you! Your request has been sent. We will contact you soon.'));
      setForm({ name: '', type: '', phone: '', datetime: '', message: '' });
    } else setMsg(copy('spa.failed', 'Erreur d’envoi. Réessayez plus tard ou contactez-nous par e-mail.', 'Failed to send. Please try again later or contact us by email.'));
  };

  const cards = [
    {
      img: imgHammam,
      title: copy('spa.hammamTitle', 'Hammams traditionnels', 'Traditional Hammams'),
      text: copy('spa.hammamText', 'Découvrez l’art du hammam marocain, un rituel ancestral de purification et de détente.', 'Discover the art of the Moroccan hammam, an ancestral ritual of purification and relaxation.'),
    },
    {
      img: imgMassage,
      title: copy('spa.massageTitle', 'Massages & Bien-être', 'Massages & Wellness'),
      text: copy('spa.massageText', 'Offrez-vous une parenthèse de sérénité grâce à nos massages professionnels.', 'Treat yourself to serenity with our professional massages.'),
    },
    {
      img: imgEsthetique,
      title: copy('spa.faceTitle', 'Esthétique & Soins du visage', 'Aesthetics & Face Care'),
      text: copy('spa.faceText', 'Soins du visage, manucure, pédicure… Produits naturels pour sublimer votre peau.', 'Facial care, manicure, pedicure… Natural products to enhance your skin.'),
    },
  ];

  return (
    <div className="bg-white text-brand-charcoal">
      {/* ===== HERO ===== */}
      <section
        className="h-[70vh] min-h-[520px] relative grid place-items-center text-center"
      >
        <ResponsiveImage src={heroSpa} alt="" sizes="100vw" priority className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/35" />
        <h1 className="relative text-white font-serif text-4xl md:text-6xl drop-shadow">
          {copy('spa.h1', 'Détente et Bien-être', 'Relaxation & Wellness')}
        </h1>
      </section>

      {/* ===== 3 CARDS ===== */}
      <section className="bg-brand-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-teal">
              {copy('spa.treatments', 'Nos soins Spa & Bien-être', 'Our Spa & Wellness Treatments')}
            </h2>
            <p className="mt-2 text-brand-charcoal/80">
              {copy('spa.intro', 'Découvrez notre spa au riad, un havre de paix dédié à votre relaxation et bien-être.', 'Discover our riad spa, a haven of peace dedicated to your relaxation and wellness.')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {cards.map((c) => (
              <article key={c.title} className="text-center">
                <div className="rounded-[20px] overflow-hidden shadow-lg ring-1 ring-black/5">
                  <ResponsiveImage src={c.img} alt={c.title} sizes="(min-width: 1152px) 342px, (min-width: 768px) 30vw, calc(100vw - 48px)" className="w-full h-[260px] md:h-[280px] object-cover" />
                </div>
                <h3 className="mt-5 font-serif text-xl text-brand-teal">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-charcoal/80">{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TEAL STRIP ===== */}
      <section className="bg-brand-teal text-white py-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2
            className="text-white text-[48px] font-serif font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {copy('spa.menuTitle', 'Voir la carte du Spa', 'See the Spa Menu')}
          </h2>
          <p
            className="text-white opacity-90 mb-8 text-[16px] leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: "1.6" }}
          >
            {copy('spa.menuInfo', 'Contactez notre équipe pour connaître les soins disponibles, leurs durées et leurs tarifs, et préparer votre moment de détente.', 'Contact our team for available treatments, durations and prices, and to plan your time at the spa.')}
          </p>
          <a
            href={`mailto:${settings.email}`}
            target="_self"
            rel="noreferrer"
            className="inline-block px-10 py-3 rounded-[15px] text-[20px] font-medium shadow-md transition-all duration-300"
            style={{
              backgroundColor: "rgb(233, 196, 106)",
              color: "rgb(38, 70, 83)",
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
            {copy('spa.menuCta', 'Menu', 'Menu')}
          </a>
        </div>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section className="bg-[#6E5D53] text-white py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {copy('spa.appointment', 'Demander un rendez-vous SPA', 'Request a SPA Appointment')}
            </h2>
            <p className="mt-2 opacity-90 text-sm md:text-base">
              {copy('spa.appointmentIntro', 'Indiquez vos préférences, nous vous recontacterons rapidement pour confirmer votre rendez-vous.', 'Tell us your preferences, we’ll get back to you quickly to confirm your appointment.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* --- FORM --- */}
            <form
              id="spa-form"
              action={`mailto:${settings.email}`} method="post" encType="text/plain"
              onSubmit={onSubmit}
              className="bg-white text-brand-charcoal rounded-xl p-5 md:p-6 shadow-lg ring-1 ring-black/10"
            >
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                {copy('spa.nameLabel', 'Nom *', 'Name *')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={copy('spa.namePlaceholder', 'Votre nom', 'Your name')}
                required
              />

              <label className="block text-sm font-medium mb-1" htmlFor="type">
                {copy('spa.typeLabel', 'Type de soin *', 'Treatment type *')}
              </label>
              <input
                id="type"
                name="type"
                type="text"
                value={form.type}
                onChange={onChange}
                className="w-full mb-4 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={copy('spa.typePlaceholder', 'Massage, Hammam, Esthétique…', 'Massage, Hammam, Aesthetics…')}
                required
              />

              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                {copy('spa.phoneLabel', 'Téléphone *', 'Phone *')}
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

              <label className="block text-sm font-medium mb-1" htmlFor="datetime">
                {copy('spa.datetimeLabel', 'Date et heure *', 'Date & time *')}
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

              <label className="block text-sm font-medium mb-1" htmlFor="message">
                {copy('spa.messageLabel', 'Votre message', 'Your message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                className="w-full mb-6 rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder={copy('spa.messagePlaceholder', 'Dites-nous vos besoins', 'Tell us your needs')}
              />

              <button type="submit" disabled={loading} className="btn-gold block mx-auto disabled:opacity-60">
                {loading ? copy('spa.sending', 'Envoi…', 'Sending…') : copy('spa.submit', 'Envoyer la demande', 'Send request')}
              </button>

              <p role="status" className="mt-3 text-sm text-brand-teal text-center">{msg}</p>
            </form>

            {/* --- IMAGE --- */}
            <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10 md:mt-10">
              <ResponsiveImage
                src={imgFormSide}
                alt={copy('spa.sideAlt', 'Ambiance du spa', 'Spa ambiance')}
                className="w-full h-[520px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
