// src/pages/Services.jsx
import { useTranslation } from "react-i18next";

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
  const { i18n } = useTranslation();
  const fr = i18n.language?.startsWith("fr");

  return (
    <div className="bg-white text-brand-charcoal">
      {/* ===== HERO (gold) ===== */}
      <section className="bg-brand-gold/90 text-brand-forest pt-28 pb-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
        <span
  className="text-4xl md:text-5xl"
  style={{
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    color: "#36291F", // optional: matches your brand dark text
  }}
>
  {fr ? "Activités enrichissantes" : "Enriching activities"}
</span>

          <p className="mt-3 max-w-3xl mx-auto opacity-90">
            {fr
              ? "Découvrez des expériences culturelles uniques et des excursions captivantes pour enrichir votre séjour à Marrakech."
              : "Discover unique cultural experiences and captivating excursions to enrich your stay in Marrakech."}
          </p>

          {/* two cards */}
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <HeroCard
              img={imgWorkshops}
              title={fr ? "Ateliers créatifs" : "Creative Workshops"}
              body={
                fr
                  ? "Participez à des ateliers artisanaux pour découvrir l’art et la culture marocaine dans un cadre inspirant."
                  : "Join artisan workshops to explore Moroccan art and culture in an inspiring setting."
              }
            />
            <HeroCard
              img={imgSouk}
              title={fr ? "Excursions fascinantes" : "Fascinating excursions"}
              body={
                fr
                  ? "Explorez Marrakech et ses alentours à travers des visites guidées immersives et des découvertes authentiques."
                  : "Explore Marrakech and its surroundings through immersive guided tours and authentic discoveries."
              }
            />
          </div>
        </div>
      </section>

      {/* ===== SERVICES (teal) ===== */}
<section className="bg-brand-teal text-[#F5EADF] py-16 md:py-20">
  <div className="mx-auto max-w-6xl px-6">
    <div className="text-center mb-10">
      <strong className="font-serif text-3xl md:text-4xl">Services</strong>
      <p
        dir="auto"
        className="font-[Playfair_Display] text-[16px] leading-relaxed text-center mt-2 tracking-wide"
      >
        {fr
          ? "Transferts aéroport & excursions au Maroc – Voyagez en toute tranquillité et découvrez le pays autrement."
          : "Airport transfers & excursions in Morocco – Travel with peace of mind and discover the country differently."}
      </p>
    </div>

    {/* Airport transfer */}
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
        <img
          src={imgAirport}
          alt="Airport"
          className="w-full h-[360px] md:h-[420px] object-cover"
        />
      </div>
      <div>
        <h3 className="font-[Playfair_Display] text-3xl md:text-4xl text-[#F5EADF] mb-4">
  {fr ? "Transfert aéroport" : "Airport Transfer"}
</h3>

        <p className="mt-3 text-[#F5EADF]/90 text-[15px] leading-relaxed">
          {fr
            ? "Pour faciliter l’arrivée et le départ des voyageurs, le Riad 4 jardins propose un service de transfert privé depuis et vers l’aéroport de Marrakech."
            : "To ease arrivals and departures, Riad 4 Jardins offers private transfer service from and to Marrakech airport."}
        </p>
        <ul className="mt-4 list-disc ml-5 space-y-1 text-[#F5EADF]/95">
          <li>{fr ? "15 € en journée (jusqu’à 4 personnes)" : "€15 daytime (up to 4 people)"}</li>
          <li>{fr ? "20 € la nuit" : "€20 at night"}</li>
          <li>
            {fr
              ? "Supplément pour une 5e personne ou plus (sur demande préalable)"
              : "Extra charge for 5+ people (upon prior request)"}
          </li>
        </ul>
        <p className="mt-4 text-[#F5EADF]/85 text-[15px] leading-relaxed">
          {fr
            ? "Notre chauffeur vous attend à l’aéroport à votre arrivée pour vous accompagner jusqu’à la porte du riad, et vous récupérera également au Riad pour votre départ afin de garantir un trajet fluide et sans stress."
            : "Our driver will meet you at the airport on arrival and pick you up from the riad on departure for a smooth, stress-free trip."}
        </p>
      </div>
    </div>

    {/* Excursions row */}
    <div className="mt-16 grid md:grid-cols-2 gap-10 items-start">
      <div>
        <h3 className="font-[Playfair_Display] text-3xl md:text-4xl text-[#F5EADF] mb-4">
          {fr ? "Organisation d’excursions" : "Excursion organisation"}
        </h3>
        <p className="mt-3 text-[#F5EADF]/90 text-[15px] leading-relaxed">
          {fr
            ? "Le riad organise également des excursions sur mesure pour permettre aux voyageurs de découvrir les merveilles naturelles, culturelles et historiques du Maroc."
            : "The riad also organises tailor-made excursions to help travellers discover Morocco’s natural, cultural and historical wonders."}
        </p>

        <p className="mt-4 text-[#F5EADF]/90 text-[15px] leading-relaxed">
          {fr
            ? "Avec des chauffeurs expérimentés et des guides certifiés, nous proposons des escapades vers des lieux incontournables tels que la vallée de l’Ourika, les cascades d’Ouzoud, la ville côtière d’Essaouira, le désert de Merzouga ou encore des visites guidées de la médina de Marrakech."
            : "With experienced drivers and certified guides, we offer trips to must-see places like Ourika Valley, Ouzoud Waterfalls, Essaouira, Merzouga desert or guided tours of Marrakech’s medina."}
        </p>

        <p className="mt-4 text-[#F5EADF]/90 text-[15px] leading-relaxed">
          {fr
            ? "D’autres excursions sont également possibles selon vos envies : montagnes de l’Atlas, villages berbères, plages ou circuits personnalisés."
            : "Other excursions are possible upon request: Atlas mountains, Berber villages, beaches or fully customised circuits."}
        </p>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
        <img
          src={imgCity}
          alt="City visit"
          className="w-full h-[360px] md:h-[420px] object-cover"
        />
      </div>
    </div>
  </div>
</section>


      {/* ===== ARRIVAL INFO FORM (gold) ===== */}
      <section className="bg-brand-gold/90 text-brand-forest py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-center font-serif text-2xl md:text-3xl">
            {fr ? "Informations d’arrivée" : "Arrival information"}
          </h3>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {/* Left help text */}
            <div className="md:col-span-1">
              <p className="font-semibold">
                {fr
                  ? "Profitez de votre service dès votre arrivée,"
                  : "Enjoy your service from the moment you arrive,"}
                <br />
                {fr
                  ? "et commencez votre séjour l’esprit tranquille"
                  : "and start your stay with peace of mind"}
              </p>
              <div className="mt-4 space-y-1 text-[15px]">
                <p>Phone: +212-808-653-506</p>
                <p>
                  Email:{" "}
                  <a
                    className="underline"
                    href="mailto:riad4jardins@gmail.com"
                  >
                    riad4jardins@gmail.com
                  </a>
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <ArrivalForm fr={fr} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Image + Dark Testimonial band ===== */}
{/* === Rooftop Testimonial Section === */}
<section className="py-14 md:py-16 bg-white">
  <div className="mx-auto max-w-6xl grid md:grid-cols-2">
    {/* LEFT IMAGE — fills the block fully */}
    <div className="overflow-hidden">
      <img
        src={imgRooftop}
        alt="Rooftop"
        className="w-full h-[420px] object-cover"
      />
    </div>

    {/* RIGHT DARK TESTIMONIAL — no rounded corners */}
    <div className="bg-[#36291F] text-[#F5EADF] flex flex-col items-center justify-center text-center p-10">
      <div className="text-[#EBCB84] tracking-[0.3em] text-xl">★★★★★</div>

      <blockquote className="mt-4 font-serif text-xl md:text-2xl leading-relaxed max-w-md">
        {fr
          ? "Un séjour inoubliable au riad, ambiance apaisante et activités enrichissantes. Je recommande vivement !"
          : "An unforgettable stay at the riad — relaxing atmosphere and enriching activities. Highly recommended!"}
      </blockquote>

      <img
        src={avaSophie}
        onError={(e) => (e.currentTarget.style.display = 'none')}
        alt="Sophie L."
        className="mt-6 h-12 w-12 rounded-full ring-2 ring-[#F5EADF]/50 object-cover"
      />

      <div className="mt-2 text-base font-medium">Sophie L.</div>
    </div>
  </div>
</section>


    </div>
  );
}

/* ================= helpers ================= */

function HeroCard({ img, title, body }) {
  return (
    <article className="relative group">
      <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black/10">
        <img
          src={img}
          alt={title}
          className="w-full h-[240px] md:h-[260px] object-cover group-hover:scale-[1.02] transition"
        />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-[88%] md:w-[78%] bg-white text-brand-charcoal shadow-lg ring-1 ring-black/10 p-5">
        <h3 className="font-serif text-xl text-brand-teal">{title}</h3>
        <p className="mt-2 text-[14px] opacity-80 leading-relaxed">{body}</p>
      </div>
      {/* spacer for overlap */}
      <div className="h-10" />
    </article>
  );
}

function ArrivalForm({ fr }) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-white rounded-xl p-5 md:p-6 shadow-lg ring-1 ring-black/10 grid grid-cols-2 gap-4"
    >
      <FormInput label={fr ? "Nom" : "Name"} placeholder={fr ? "Nom" : "Name"} />
      <FormInput label={fr ? "Téléphone" : "Phone"} placeholder="+212…" />

      <FormInput
        label={fr ? "Numéro de vol" : "Flight number"}
        placeholder={fr ? "Ex. AT123 / FR5678" : "e.g. AT123 / FR5678"}
      />
      <FormInput
        label={fr ? "Ville de départ" : "Departure city"}
        placeholder={fr ? "Ex. Madrid" : "e.g. Madrid"}
      />

      <FormInput
        label={fr ? "Date d’arrivée" : "Arrival date"}
        type="date"
      />
      <FormInput
        label={fr ? "Heure d’arrivée" : "Arrival time"}
        type="time"
      />

      <div className="col-span-2">
        <label className="block text-sm font-medium mb-1">
          {fr ? "Message (optionnel)" : "Message (optional)"}
        </label>
        <textarea
          rows={3}
          className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
          placeholder={
            fr
              ? "Observations, demandes spéciales…"
              : "Notes, special requests…"
          }
        />
      </div>

      <div className="col-span-2 flex justify-center pt-2">
        <button type="submit" className="btn-gold">
          {fr ? "Envoyer" : "Send"}
        </button>
      </div>
    </form>
  );
}

function FormInput({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        className="w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-brand-gold"
        placeholder={placeholder}
      />
    </div>
  );
}
