// src/pages/Services.jsx
import { useState } from "react";
import { useCopy, useContent } from '../content/ContentContext.jsx';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { initialFormValues } from '../utils/formValues.js';
import { sendEmail } from "../utils/sendEmail"; // ✅ EmailJS helper

// HERO cards
import imgWorkshops from "../assets/services/workshops.jpg";
import imgSouk from "../assets/services/souk.jpg";

// SERVICES
import imgAirport from "../assets/home/airport.jpg";
import imgCity from "../assets/services/city.jpg";

// Bottom band
import imgRooftop from "../assets/services/rooftop.jpg";
import avaSophie from "../assets/home/ava-sophie.jpg";

export default function Services() {
  const copy = useCopy();
  const { settings } = useContent();

  return (
    <div className="bg-white text-brand-charcoal">
      {/* ===== HERO (gold) ===== */}
      <section className="bg-brand-gold/90 text-brand-forest pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1
            className="inline text-4xl md:text-5xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#36291F",
            }}
          >
            {copy('services.title', 'Activités enrichissantes', 'Enriching activities')}
          </h1>

          <p className="mt-3 max-w-3xl mx-auto opacity-90">
            {copy('services.intro', 'Découvrez des expériences culturelles uniques et des excursions captivantes pour enrichir votre séjour à Marrakech.', 'Discover unique cultural experiences and captivating excursions to enrich your stay in Marrakech.')}
          </p>

          {/* two cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <HeroCard
              priority
              img={imgWorkshops}
              title={copy('services.workshopsTitle', 'Ateliers créatifs', 'Creative Workshops')}
              body={
                copy('services.workshopsText', 'Participez à des ateliers artisanaux pour découvrir l’art et la culture marocaine dans un cadre inspirant.', 'Join artisan workshops to explore Moroccan art and culture in an inspiring setting.')
              }
            />
            <HeroCard
              img={imgSouk}
              title={copy('services.excursionsTitle', 'Excursions fascinantes', 'Fascinating excursions')}
              body={
                copy('services.excursionsText', 'Explorez Marrakech et ses alentours à travers des visites guidées immersives et des découvertes authentiques.', 'Explore Marrakech and its surroundings through immersive guided tours and authentic discoveries.')
              }
            />
          </div>
        </div>
      </section>

      {/* ===== SERVICES (teal) ===== */}
      <section className="bg-brand-teal text-[#F5EADF] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-[#F5EADF] font-bold">{copy('services.servicesTitle', 'Services', 'Services')}</h2>
            <p
              dir="auto"
              className="font-[Playfair_Display] text-[16px] leading-relaxed text-center mt-2 tracking-wide"
            >
              {copy('services.servicesIntro', 'Transferts aéroport & excursions au Maroc – Voyagez en toute tranquillité et découvrez le pays autrement.', 'Airport transfers & excursions in Morocco – Travel with peace of mind and discover the country differently.')}
            </p>
          </div>

          {/* Airport transfer */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
              <ResponsiveImage
                src={imgAirport}
                alt={copy('services.airportAlt', 'Transfert depuis l’aéroport de Marrakech-Menara', 'Transfer from Marrakech Menara airport')}
                className="w-full h-[360px] md:h-[420px] object-cover"
              />
            </div>
            <div>
              <h3 className="font-[Playfair_Display] text-3xl md:text-4xl text-[#F5EADF] mb-4">
                {copy('services.transferTitle', 'Transfert aéroport', 'Airport Transfer')}
              </h3>

              <p className="mt-3 text-[#F5EADF]/90 text-[15px] leading-relaxed">
                {copy('services.transferIntro', 'Pour faciliter l’arrivée et le départ des voyageurs, le Riad 4 jardins propose un service de transfert privé depuis et vers l’aéroport de Marrakech.', 'To ease arrivals and departures, Riad 4 Jardins offers private transfer service from and to Marrakech airport.')}
              </p>
              <ul className="mt-4 list-disc ml-5 space-y-1 text-[#F5EADF]/95">
                <li>
                  {copy('services.transferDay', '15 € en journée (jusqu’à 4 personnes)', '€15 daytime (up to 4 people)')}
                </li>
                <li>{copy('services.transferNight', '20 € la nuit', '€20 at night')}</li>
                <li>
                  {copy('services.transferExtra', 'Supplément pour une 5e personne ou plus (sur demande préalable)', 'Extra charge for 5+ people (upon prior request)')}
                </li>
              </ul>
              <p className="mt-4 text-[#F5EADF]/85 text-[15px] leading-relaxed">
                {copy('services.transferDetails', 'Notre chauffeur vous attend à l’aéroport à votre arrivée pour vous accompagner jusqu’à la porte du riad, et vous récupérera également au Riad pour votre départ afin de garantir un trajet fluide et sans stress.', 'Our driver will meet you at the airport on arrival and pick you up from the riad on departure for a smooth, stress-free trip.')}
              </p>
            </div>
          </div>

          {/* Excursions row */}
          <div className="mt-16 grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="font-[Playfair_Display] text-3xl md:text-4xl text-[#F5EADF] mb-4">
                {copy('services.organisationTitle', 'Organisation d’excursions', 'Excursion organisation')}
              </h3>
              <p className="mt-3 text-[#F5EADF]/90 text-[15px] leading-relaxed">
                {copy('services.organisationIntro', 'Le riad organise également des excursions sur mesure pour permettre aux voyageurs de découvrir les merveilles naturelles, culturelles et historiques du Maroc.', 'The riad also organises tailor-made excursions to help travellers discover Morocco’s natural, cultural and historical wonders.')}
              </p>

              <p className="mt-4 text-[#F5EADF]/90 text-[15px] leading-relaxed">
                {copy('services.destinations', 'Avec des chauffeurs expérimentés et des guides certifiés, nous proposons des escapades vers des lieux incontournables tels que la vallée de l’Ourika, les cascades d’Ouzoud, la ville côtière d’Essaouira, le désert de Merzouga ou encore des visites guidées de la médina de Marrakech.', 'With experienced drivers and certified guides, we offer trips to must-see places like Ourika Valley, Ouzoud Waterfalls, Essaouira, Merzouga desert or guided tours of Marrakech’s medina.')}
              </p>

              <p className="mt-4 text-[#F5EADF]/90 text-[15px] leading-relaxed">
                {copy('services.otherTrips', 'D’autres excursions sont également possibles selon vos envies : montagnes de l’Atlas, villages berbères, plages ou circuits personnalisés.', 'Other excursions are possible upon request: Atlas mountains, Berber villages, beaches or fully customised circuits.')}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
              <ResponsiveImage
                src={imgCity}
                alt={copy('services.cityAlt', 'Découverte de Marrakech et de ses environs', 'Discover Marrakech and its surroundings')}
                className="w-full h-[360px] md:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== ARRIVAL INFO FORM (gold) ===== */}
      <section className="bg-brand-gold/90 text-brand-forest py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-serif text-2xl md:text-3xl">
            {copy('services.arrivalTitle', 'Informations d’arrivée', 'Arrival information')}
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {/* Left help text */}
            <div className="md:col-span-1">
              <p className="font-semibold">
                {copy('services.arrivalIntro', 'Profitez de votre service dès votre arrivée,', 'Enjoy your service from the moment you arrive,')}
                <br />
                {copy('services.arrivalText', 'et commencez votre séjour l’esprit tranquille', 'and start your stay with peace of mind')}
              </p>
              <div className="mt-4 space-y-1 text-[15px]">
                <p>{copy('services.phone', 'Téléphone :', 'Phone:')} <a href={`tel:${settings.phone}`}>{settings.phoneDisplay}</a></p>
                <p>
                  Email:{" "}
                  <a
                    className="underline"
                    href={`mailto:${settings.email}`}
                  >
                    {settings.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <ArrivalForm />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Image + Dark Testimonial band ===== */}
      <section className="py-14 md:py-16 bg-white">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2">
          <div className="overflow-hidden">
            <ResponsiveImage
              src={imgRooftop}
              alt={copy('services.rooftopAlt', 'Terrasse du Riad 4 Jardins à Marrakech', 'Riad 4 Jardins terrace in Marrakech')}
              className="w-full h-[420px] object-cover"
            />
          </div>

          <div className="bg-[#36291F] text-[#F5EADF] flex flex-col items-center justify-center text-center p-10">
            <div className="text-[#EBCB84] tracking-[0.3em] text-xl">★★★★★</div>

            <blockquote className="mt-4 font-serif text-xl md:text-2xl leading-relaxed max-w-md">
              {copy('services.legacyTestimonial', 'Un séjour inoubliable au riad, ambiance apaisante et activités enrichissantes. Je recommande vivement !', 'An unforgettable stay at the riad — relaxing atmosphere and enriching activities. Highly recommended!')}
            </blockquote>

            <ResponsiveImage
              src={avaSophie}
              onError={(e) => (e.currentTarget.style.display = "none")}
              alt="Sophie L."
              className="mt-6 h-12 w-12 rounded-full ring-2 ring-[#F5EADF]/50 object-cover"
              sizes="48px"
            />

            <div className="mt-2 text-base font-medium">{copy('services.legacyReviewer', 'Sophie L.', 'Sophie L.')}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= helpers ================= */
function HeroCard({ img, title, body, priority = false }) {
  return (
    <article className="relative group">
      <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
        <ResponsiveImage
          src={img}
          alt={title}
          priority={priority}
          sizes="(min-width: 1152px) 536px, (min-width: 768px) 46vw, calc(100vw - 48px)"
          className="w-full h-[240px] md:h-[260px] object-cover group-hover:scale-[1.02] transition"
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[88%] md:w-[78%] bg-white text-brand-charcoal shadow-lg ring-1 ring-black/10 p-5">
        <h2 className="font-serif text-xl text-brand-teal">{title}</h2>
        <p className="mt-2 text-[14px] opacity-80 leading-relaxed">{body}</p>
      </div>
      <div className="h-10" />
    </article>
  );
}

/* ================= EMAILJS ENABLED FORM ================= */
function ArrivalForm() {
  const copy = useCopy();
  const { settings } = useContent();
  const [form, setForm] = useState(() => initialFormValues('arrival-form', {
    name: "",
    phone: "",
    flight: "",
    city: "",
    arrival_date: "",
    arrival_time: "",
    message: "",
  }));
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const submitted = Object.fromEntries(new FormData(e.currentTarget));
    setForm(submitted);
    if (!submitted.name || !submitted.phone) {
      setMsg(
        copy('services.required', 'Veuillez remplir les champs obligatoires.', 'Please fill the required fields.')
      );
      return;
    }

    setLoading(true);
    const res = await sendEmail(submitted, "Services");
    setLoading(false);

    if (res.success) {
      setMsg(copy('services.sent', 'Votre demande a bien été envoyée.', 'Your request has been sent successfully.'));
      setForm({
        name: "",
        phone: "",
        flight: "",
        city: "",
        arrival_date: "",
        arrival_time: "",
        message: "",
      });
    } else {
      setMsg(copy('services.failed', 'Une erreur s’est produite, réessayez plus tard.', 'An error occurred, please try again later.'));
    }
  };

  return (
    <form
      id="arrival-form"
      action={`mailto:${settings.email}`} method="post" encType="text/plain"
      onSubmit={onSubmit}
      className="bg-white rounded-xl p-5 md:p-6 shadow-lg ring-1 ring-black/10 grid grid-cols-2 gap-4"
    >
      <FormInput label={copy('services.name', 'Nom', 'Name')} name="name" value={form.name} onChange={onChange} />
      <FormInput label={copy('services.phoneLabel', 'Téléphone', 'Phone')} name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+212…" />
      <FormInput label={copy('services.flight', 'Numéro de vol', 'Flight number')} name="flight" value={form.flight} onChange={onChange} placeholder="AT123" />
      <FormInput label={copy('services.city', 'Ville de départ', 'Departure city')} name="city" value={form.city} onChange={onChange} />
      <FormInput label={copy('services.date', 'Date d’arrivée', 'Arrival date')} name="arrival_date" type="date" value={form.arrival_date} onChange={onChange} />
      <FormInput label={copy('services.time', 'Heure d’arrivée', 'Arrival time')} name="arrival_time" type="time" value={form.arrival_time} onChange={onChange} />

      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1" htmlFor="arrival-message">
          {copy('services.message', 'Message (optionnel)', 'Message (optional)')}
        </label>
        <textarea
          name="message"
          id="arrival-message"
          value={form.message}
          onChange={onChange}
          rows={3}
          className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
          placeholder={
            copy('services.messagePlaceholder', 'Observations, demandes spéciales…', 'Notes, special requests…')
          }
        />
      </div>

      <div className="col-span-2 flex justify-center pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-gold mt-3 px-8 py-3 rounded-lg bg-[#E9C46A] text-[#264653] font-semibold shadow transition hover:bg-[#264653] hover:text-[#E9C46A]"
        >
          {loading ? copy('services.sending', 'Envoi...', 'Sending...') : copy('services.submit', 'Envoyer', 'Send')}
        </button>
      </div>

      {msg && (
        <p role="status" className="col-span-2 mt-2 text-center text-sm text-brand-teal">
          {msg}
        </p>
      )}
    </form>
  );
}

function FormInput({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={`arrival-${name}`}>{label}</label>
      <input
        type={type}
        name={name}
        id={`arrival-${name}`}
        required={name === 'name' || name === 'phone'}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
        placeholder={placeholder}
      />
    </div>
  );
}
