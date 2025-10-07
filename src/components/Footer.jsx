// src/components/Footer.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMsg(i18n.language.startsWith("fr") ? "Entrez un e-mail valide." : "Enter a valid email.");
      return;
    }
    setMsg(i18n.language.startsWith("fr") ? "Merci ! Nous revenons vers vous rapidement." : "Thanks! We’ll get back to you soon.");
    setEmail("");
  };

  return (
    <footer className="bg-[#6E5D53] text-white">
      {/* === Footer 3 Columns === */}
      <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-12 items-start">
        {/* LEFT: social + short message */}
        <div className="space-y-6">
          <p className="max-w-sm leading-relaxed text-[17px]">
            {i18n.language.startsWith("fr")
              ? "Réservez votre séjour dans notre riad authentique."
              : "Book your stay in our authentic riad."}
          </p>

          <div className="flex items-center gap-8">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/riad4jardins/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex"
            >
              <svg viewBox="0 0 24 24" className="w-14 h-14 fill-none stroke-white" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.6" cy="6.6" r="1.1" fill="white" stroke="none" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/riad-4-jardins/?viewAsMember=true"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex"
            >
              <svg viewBox="0 0 24 24" className="w-14 h-14 fill-white">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.08 3.79-2.08 4.05 0 4.8 2.7 4.8 6.18V23h-4v-6.58c0-1.6-.03-3.62-2.2-3.62-2.2 0-2.54 1.74-2.54 3.51V23h-4V8.5z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* MIDDLE: Contact */}
        <div className="space-y-4">
          <h3 className="font-serif text-4xl">Contact</h3>
          <p className="text-lg">+212-808-653-506</p>
          <a
            href="mailto:riad4jardins@gmail.com"
            className="underline text-lg underline-offset-4 decoration-white/60 hover:decoration-white"
          >
            riad4jardins@gmail.com
          </a>
        </div>

        {/* RIGHT: Email form */}
        <form onSubmit={onSubmit} className="space-y-3">
          <label htmlFor="footerEmail" className="block text-lg">
            {i18n.language.startsWith("fr") ? "Votre adresse e-mail ici" : "Your email address here"}
          </label>
          <input
            id="footerEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={i18n.language.startsWith("fr") ? "Entrez votre e-mail valide" : "Enter a valid email"}
            className="w-full rounded-md bg-white text-brand-charcoal px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-brand-gold"
            required
          />
          <button
            type="submit"
            className="inline-block px-8 py-3 rounded-full bg-[#2F241E] text-white font-semibold hover:opacity-95 transition"
          >
            {t("footer.cta")}
          </button>
          {msg && <p className="text-sm opacity-90 mt-1">{msg}</p>}
        </form>
      </div>
    </footer>
  );
}
