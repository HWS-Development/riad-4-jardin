import { useTranslation } from "react-i18next";
import frenchConditions from "../data/booking-conditions.fr.json";
import englishConditions from "../data/booking-conditions.en.json";

export default function BookingConditions() {
  const { i18n } = useTranslation();
  const isFrench = i18n.language.startsWith("fr");
  const conditions = isFrench ? frenchConditions : englishConditions;

  return (
    <div className="bg-brand-cream text-brand-charcoal">
      <section className="bg-brand-teal text-white pt-44 pb-16 px-6 text-center">
        <h1 className="text-white text-4xl md:text-5xl max-w-4xl mx-auto">
          {conditions.title}
        </h1>
        <p className="mt-5 max-w-2xl mx-auto">
          {isFrench
            ? "Les modalités applicables à vos réservations directes au Riad 4 Jardins à Marrakech."
            : "The conditions applicable to your direct bookings at Riad 4 Jardins in Marrakech."}
        </p>
        <p className="mt-4 text-sm">
          {isFrench ? "Mise à jour : " : "Last updated: "}
          <time dateTime={conditions.updatedAt}>
            {conditions.updatedAt.split("-").reverse().join("/")}
          </time>
        </p>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-14 md:py-20">
        <nav
          aria-label={isFrench ? "Sommaire des conditions" : "Booking conditions contents"}
          className="rounded-xl border border-brand-teal/20 bg-white/50 p-6 mb-12"
        >
          <h2 className="text-2xl mb-4">{isFrench ? "Sommaire" : "Contents"}</h2>
          <ol className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {conditions.sections.map((section) => (
              <li key={section.id}>
                <a href={`#conditions-${section.id}`} className="underline underline-offset-4">
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {conditions.sections.map((section) => (
          <section
            key={section.id}
            id={`conditions-${section.id}`}
            className="scroll-mt-40 mb-10"
          >
            <h2 className="text-2xl md:text-3xl mb-5">{section.title}</h2>
            {section.paragraphs?.map((paragraph, index) => (
              <p key={index} className="text-[16px] leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
            {section.items && <Items items={section.items} />}
            {section.rates?.map((rate) => (
              <div key={rate.id} className="mb-8 rounded-xl bg-white/50 p-5 md:p-7 ring-1 ring-brand-teal/10">
                <h3 className="text-xl md:text-2xl mb-4">{rate.title}</h3>
                <Items items={rate.items} />
              </div>
            ))}
          </section>
        ))}

        <a
          href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold inline-block mt-4"
        >
          {isFrench ? "Consulter les disponibilités" : "Check availability"}
        </a>
      </div>
    </div>
  );
}

function Items({ items }) {
  return (
    <ul className="list-disc pl-6 space-y-3 text-[16px] leading-relaxed">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}
