import { useTranslation } from "react-i18next";

export default function Hero({
  image = "https://images.unsplash.com/photo-1526779249673-74f1a6f2f7d5?q=80&w=1920&auto=format&fit=crop",
  bookingAnchor = "#book"
}) {
  const { t } = useTranslation();

  return (
    <section className="relative h-[86vh] min-h-[560px] w-full">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-brand-overlay" />

      <div className="relative z-10 h-full">
        <div className="container mx-auto max-w-content h-full flex items-center">
          <div className="text-white max-w-xl">
            <h1 className="font-serif text-4xl md:text-5xl mb-3">
              {t("hero.title")}
            </h1>
            <p className="text-base md:text-lg opacity-95 mb-6">
              {t("hero.subtitle")}
            </p>
            <a
              href={bookingAnchor}
              className="inline-flex items-center rounded-pill bg-brand-gold text-black px-6 py-3 font-medium hover:opacity-90"
            >
              {t("hero.cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
