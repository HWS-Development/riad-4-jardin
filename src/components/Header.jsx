import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo-full.png";

const LINKS = [
  { to: "/", fr: "Accueil", en: "Home" },
  { to: "/chambres", fr: "Chambres", en: "Rooms" },
  { to: "/spa", fr: "Spa & Bien-être", en: "Spa & Wellness" },
  { to: "/services-activites", fr: "Services & Activités", en: "Services & Activities" },
  { to: "/restaurant", fr: "Restaurant", en: "Restaurant" },
  { to: "/galerie", fr: "Galerie", en: "Gallery" },
];

export default function Header() {
  const { i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const menuBtn = useRef(null);

  const langRef = useRef(null);
  const currentLang = i18n.language?.startsWith("fr") ? "FR" : "EN";

  // Change background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Disable scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-brand-teal/95 text-white shadow-md backdrop-blur-sm border-b border-black/10"
          : "bg-transparent text-white",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl md:h-32 h-24 px-4 flex items-center justify-between">
        
        {/* LEFT — Menu */}
        <div className="hidden md:inline relative">
          <button
            ref={menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            className="group inline-flex items-center justify-cente gap-1 text-[22px] md:text-[24px] font-serif"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            Menu {!menuOpen ? <span>▾</span>  : <span className="transform rotate-180">▾</span>}
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              className="hidden md:block absolute left-0 mt-3 w-[300px] md:w-[320px] rounded-xl bg-brand-teal text-white shadow-2xl p-6"
            >
              <nav className="flex flex-col">
                {LINKS.map(({ to, fr, en }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        "py-2 text-[22px] md:text-[24px] font-serif rounded",
                        "focus:outline-none focus:ring-2 focus:ring-brand-gold/60",
                        isActive
                          ? "text-brand-gold underline decoration-brand-gold/80 underline-offset-[6px]"
                          : "hover:text-brand-gold",
                      ].join(" ")
                    }
                  >
                    {i18n.language.startsWith("fr") ? fr : en}
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
        {/* === Left (Mobile Burger) === */}
        
        <div className="flex justify-end w-full md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold"
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* === Center Logo === */}
        <NavLink
          to="/"
          className="absolute left-16 md:left-1/2 -translate-x-1/2 top-3 md:top-0 "
        >
          <img
            src={logo}
            alt="Riad 4 Jardins – Charme et traditions"
            className="h-20 md:h-32 object-contain drop-shadow"
          />
        </NavLink>

        {/* === Right (Desktop only) === */}
        <div className="hidden md:flex items-center gap-4">
          <LangDropdown
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            langRef={langRef}
            currentLang={currentLang}
          />
          <a
            href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 rounded-[20px] bg-brand-gold text-brand-forest !font-bold shadow transition-all duration-300 hover:shadow-lg hover:bg-brand-forest hover:text-brand-gold"
          >
            {i18n.language.startsWith("fr") ? "Réservez" : "Book"}
          </a>
        </div>
      </div>

      {/* === Mobile Menu Overlay === */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-brand-teal text-white flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 text-brand-gold" />
            </button>

            <nav className="flex flex-col items-center space-y-6 text-2xl font-serif">
              {LINKS.map(({ to, fr, en }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    [
                      "transition-all duration-200",
                      isActive
                        ? "text-brand-gold underline underline-offset-4"
                        : "hover:text-brand-gold",
                    ].join(" ")
                  }
                >
                  {i18n.language.startsWith("fr") ? fr : en}
                </NavLink>
              ))}
            </nav>

            {/* Language selector */}
            <div className="pt-6 border-t border-white/20">
              <LangDropdown
                langOpen={langOpen}
                setLangOpen={setLangOpen}
                langRef={langRef}
                currentLang={currentLang}
              />
            </div>

            {/* CTA */}
            <a
              href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 rounded-full bg-brand-gold text-brand-forest font-semibold shadow-lg hover:bg-brand-forest hover:text-brand-gold transition-all"
            >
              {i18n.language.startsWith("fr") ? "Réservez" : "Book"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangDropdown({ langOpen, setLangOpen, langRef, currentLang }) {
  const { i18n } = useTranslation();
  const langs = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setLangOpen((v) => !v)}
        className="group inline-flex items-center gap-1 text-[18px] md:text-[20px]"
        aria-expanded={langOpen}
      >
        {currentLang} ▾
      </button>

      {langOpen && (
        <div
          ref={langRef}
          role="menu"
          className="absolute right-0 mt-3 w-48 rounded-xl bg-brand-teal text-white shadow-2xl p-4"
        >
          <nav className="flex flex-col">
            {langs.map((l) => {
              const active = i18n.language?.startsWith(l.code);
              return (
                <button
                  key={l.code}
                  onClick={() => {
                    i18n.changeLanguage(l.code);
                    setLangOpen(false);
                  }}
                  className={[
                    "text-left w-full py-2 font-serif text-lg rounded",
                    active
                      ? "text-brand-gold underline underline-offset-4"
                      : "hover:text-brand-gold",
                  ].join(" ")}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
