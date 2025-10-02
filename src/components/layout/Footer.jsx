import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-brown text-white pt-16 pb-10">
      <div className="container mx-auto max-w-content grid md:grid-cols-3 gap-12">
        {/* Left: short text + socials */}
        <div>
          <p className="max-w-sm text-white/90 font-serif text-[18px]">
            Réservez votre séjour dans notre riad authentique.
          </p>
          <div className="flex items-center gap-6 mt-6">
            <a href="#" aria-label="Instagram" className="text-4xl font-bold">𝙸</a>
            <a href="#" aria-label="LinkedIn" className="text-4xl font-bold">in</a>
          </div>
        </div>

        {/* Middle: Contact */}
        <div className="text-center md:text-left">
          <h3 className="font-serif text-3xl mb-4">{t("footer.contact")}</h3>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <Phone className="w-4 h-4" /> +212-808-653-506
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2 mt-2">
            <Mail className="w-4 h-4" />
            <a href="mailto:riad4jardins@gmail.com" className="underline">
              riad4jardins@gmail.com
            </a>
          </p>
        </div>

        {/* Right: newsletter input + large dark pill button */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col items-stretch gap-4">
          <label className="text-sm opacity-90">{t("footer.emailPH")}</label>
          <input
            type="email"
            placeholder={t("footer.emailPH")}
            className="rounded-pill px-5 py-3 text-brand-dark bg-white"
          />
          <button
            type="submit"
            className="rounded-pill bg-[#3A2F28] px-8 py-4 text-white font-medium hover:opacity-90 text-sm md:text-base"
          >
            {t("footer.newsletterBtn")}
          </button>
        </form>
      </div>

      <div className="container mx-auto max-w-content mt-10 text-center opacity-80 text-sm">
        © {new Date().getFullYear()} · Tous droits réservés
      </div>
    </footer>
  );
}
