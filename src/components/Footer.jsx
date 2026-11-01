// src/components/Footer.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCopy, useContent } from '../content/ContentContext.jsx';
import { pagePath } from '../site/routes.js';
import { sendEmail } from '../utils/sendEmail.js';
import { initialFormValues } from '../utils/formValues.js';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState(() => initialFormValues('footer-form', { email: '' }).email);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const copy = useCopy();
  const { settings, locale } = useContent();

  const onSubmit = async (e) => {
    e.preventDefault();
    const submittedEmail = new FormData(e.currentTarget).get('email');
    setEmail(submittedEmail);
    if (!/^\S+@\S+\.\S+$/.test(submittedEmail)) {
      setMsg(copy('footer.invalidEmail', 'Entrez un e-mail valide.', 'Enter a valid email.'));
      return;
    }
    if (loading) return;
    setLoading(true); setMsg('');
    const result = await sendEmail({ email: submittedEmail, message: locale === 'fr' ? 'Demande de contact depuis le site.' : 'Contact enquiry from the website.' }, 'Contact');
    setLoading(false);
    if (result.success) { setMsg(copy('footer.sent', 'Votre demande a bien été envoyée.', 'Your enquiry has been sent.')); setEmail(''); }
    else setMsg(copy('footer.failed', 'Envoi indisponible. Contactez-nous directement par e-mail ou par téléphone.', 'Unable to send. Please contact us directly by email or phone.'));
  };

  return (
    <footer className="bg-[#6E5D53] text-white">
      {/* === Footer 3 Columns === */}
      <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-12 items-start">
        {/* LEFT: social + short message */}
        <div className="space-y-6">
          <p className="max-w-sm leading-relaxed font-semibold text-[14px]">
            {copy('footer.intro', 'Réservez votre séjour dans notre riad authentique.', 'Book your stay in our authentic riad.')}
          </p>

          <div className="flex items-center ml-6 w-full gap-6">
            {/* Instagram */}
            <a
              href={settings.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex"
            >
              <svg viewBox="0 0 24 24" className="w-12 h-12 fill-none stroke-white" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.6" cy="6.6" r="1.1" fill="white" stroke="none" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex"
            >
              <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.08 3.79-2.08 4.05 0 4.8 2.7 4.8 6.18V23h-4v-6.58c0-1.6-.03-3.62-2.2-3.62-2.2 0-2.54 1.74-2.54 3.51V23h-4V8.5z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* MIDDLE: Contact */}
        <div className="space-y-4">
          <h2 className="font-serif text-4xl text-white font-bold">{copy('footer.contact', 'Contact', 'Contact')}</h2>
          <p className="py-3"><a href={`tel:${settings.phone}`}>{settings.phoneDisplay}</a></p>
          {settings.streetAddress && <p>{settings.streetAddress}, Marrakech</p>}
          <a
            href={`mailto:${settings.email}`}
            className="underline underline-offset-4 decoration-white/60 hover:decoration-white"
          >
            {settings.email}
          </a>
        </div>

        {/* RIGHT: Email form */}
        <form id="footer-form" action={`mailto:${settings.email}`} method="post" encType="text/plain" onSubmit={onSubmit} className="space-y-3">
          <label htmlFor="footerEmail" className="block text-lg font-semibold">
            {copy('footer.emailLabel', 'Votre adresse e-mail', 'Your email address')}
          </label>
          <input
            id="footerEmail"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy('footer.emailPlaceholder', 'Entrez votre e-mail valide', 'Enter a valid email')}
            className="w-full rounded-md bg-white text-brand-charcoal px-4 py-3 text-[16px] outline-none focus:ring-2 focus:ring-brand-gold"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-block px-8 py-3 rounded-full bg-[#2F241E] text-white font-semibold hover:opacity-95 transition"
          >
            {loading ? copy('footer.sending', 'Envoi…', 'Sending…') : t("footer.cta")}
          </button>
          {msg && <p role="status" className="text-sm opacity-90 mt-1">{msg}</p>}
        </form>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-8">
        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm font-semibold">
            {copy('footer.payments', 'Paiement par carte bancaire', 'Card payments')}
          </p>
          <ul className="flex flex-wrap items-center gap-3" aria-label={i18n.language.startsWith("fr") ? "Moyens de paiement" : "Payment methods"}>
            {[
              { file: "chaabi-payment.png", name: "Chaabi Payment", width: 784, height: 260 },
              { file: "verified-by-visa.png", name: "Verified by Visa", width: 600, height: 265 },
              { file: "mastercard-securecode.png", name: "Mastercard SecureCode", width: 500, height: 230 },
            ].map(({ file, name, width, height }) => (
              <li key={file} className="flex h-16 w-32 items-center justify-center rounded-md bg-[#F7F7F7] p-2 sm:w-36">
                <img
                  src={`/images/payments/${file}`}
                  alt={name}
                  width={width}
                  height={height}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-6 text-xs flex flex-wrap items-center justify-between gap-4">
          <nav aria-label={copy('footer.informationNav', 'Informations pratiques', 'Practical information')} className="flex flex-wrap gap-4">
            <a href={pagePath('contact', locale)} className="underline underline-offset-4">{copy('footer.contactLink', 'Contact & accès', 'Contact & directions')}</a>
            <a href={pagePath('conditions', locale)} className="underline underline-offset-4">{copy('footer.conditionsLink', 'Conditions de réservation', 'Booking conditions')}</a>
          </nav>
          <p>Developed by <a href="https://www.hospitalitywebservices.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">HWS</a></p>
        </div>
      </div>
    </footer>
  );
}
