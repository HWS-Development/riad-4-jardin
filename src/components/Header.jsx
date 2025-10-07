// src/components/Header.jsx
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const langBtn = useRef(null);

  // Transparent initially on ALL pages. Turn solid after scrolling 60px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdowns on outside click / Esc
  useEffect(() => {
    const onDown = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        menuBtn.current &&
        !menuBtn.current.contains(e.target)
      ) setMenuOpen(false);

      if (
        langOpen &&
        langRef.current &&
        !langRef.current.contains(e.target) &&
        langBtn.current &&
        !langBtn.current.contains(e.target)
      ) setLangOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && (setMenuOpen(false), setLangOpen(false));
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [menuOpen, langOpen]);

  const currentLang = i18n.language?.startsWith("fr") ? "FR" : "EN";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-brand-teal/95 text-white shadow-md backdrop-blur-sm border-b border-black/10"
          : "bg-transparent text-white"
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl h-20 px-4 flex items-center justify-between">
        {/* LEFT — Menu */}
        <div className="relative">
          <button
            ref={menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            className="group inline-flex items-center gap-1 text-[22px] md:text-[24px] font-serif"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            Menu ▾
          </button>

          {menuOpen && (
            <div
              ref={menuRef}
              role="menu"
              className="absolute left-0 mt-3 w-[300px] md:w-[320px] rounded-xl bg-brand-teal text-white shadow-2xl p-6"
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

        {/* CENTER — Logo */}
        <NavLink to="/" className="inline-flex items-center">
          <img
            src={logo}
            alt="Riad 4 jardins – Charme et traditions"
            className="h-10 md:h-12 object-contain drop-shadow"
          />
        </NavLink>

        {/* RIGHT — Language dropdown + Reserve */}
        <div className="flex items-center gap-4">
          <LangDropdown
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            langBtn={langBtn}
            langRef={langRef}
            currentLang={currentLang}
          />

          {/* Gold CTA with hover invert */}
          <a
            href="https://riad-4-jardins-spa.hotelrunner.com/bv3/search"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-2 rounded-full bg-brand-gold text-brand-forest font-semibold shadow transition-all duration-300 hover:shadow-lg hover:bg-brand-forest hover:text-brand-gold"
          >
            {i18n.language.startsWith("fr") ? "Réservez" : "Book"}
          </a>
        </div>
      </div>
    </header>
  );
}

function LangDropdown({ langOpen, setLangOpen, langBtn, langRef, currentLang }) {
  const { i18n } = useTranslation();
  const langs = [
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
  ];

  return (
    <div className="relative">
      <button
        ref={langBtn}
        onClick={() => setLangOpen((v) => !v)}
        className="group inline-flex items-center gap-1 text-[18px] md:text-[20px]"
        aria-expanded={langOpen}
        aria-haspopup="true"
      >
        {currentLang} ▾
      </button>

      {langOpen && (
        <div
          ref={langRef}
          role="menu"
          className="absolute right-0 mt-3 w-52 rounded-xl bg-brand-teal text-white shadow-2xl p-4"
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
                    "text-left w-full py-2 font-serif text-[20px] rounded",
                    "focus:outline-none focus:ring-2 focus:ring-brand-gold/60",
                    active
                      ? "text-brand-gold underline decoration-brand-gold/80 underline-offset-[6px]"
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
