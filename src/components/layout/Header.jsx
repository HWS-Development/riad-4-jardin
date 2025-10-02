import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const pages = [
  { to: "/", key: "nav.home" },
  { to: "/rooms", key: "nav.rooms" },
  { to: "/spa", key: "nav.spa" },
  { to: "/services", key: "nav.services" },
  { to: "/restaurant", key: "nav.restaurant" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/blog", key: "nav.blog" }
];

export default function Header({ logoSrc = "/logo.svg", bookingUrl = "#book" }) {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const menuRef = useRef(null);
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdowns on outside click or route change
  useEffect(() => {
    const onDoc = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);
  useEffect(() => { setOpen(false); setLangOpen(false); }, [pathname]);

  const switchLang = (lng) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng;
    setLangOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${scrolled ? "bg-brand-teal" : "bg-transparent"} transition-colors`}>
      {/* bar height */}
      <div className="h-[72px]">
        <div className="container mx-auto max-w-content h-[72px] flex items-center justify-between relative">
          {/* LEFT: Menu with dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((s) => !s)}
              className="flex items-center gap-2 text-[18px] font-serif text-white"
            >
              <span className="underline decoration-brand-gold/60 underline-offset-4">{t("nav.menu")}</span>
              <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} color="white" />
            </button>
            {/* dropdown */}
            <div
              className={`absolute left-0 mt-3 w-64 rounded-xl bg-[#14333C] text-white shadow-dropdown transition origin-top
              ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
            >
              <nav className="p-4">
                {pages.map((p) => (
                  <NavLink
                    key={p.to}
                    to={p.to}
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg text-[20px] leading-tight font-serif ${
                        isActive ? "underline decoration-brand-gold underline-offset-8" : "hover:bg-white/5"
                      }`
                    }
                  >
                    {t(p.key)}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>

          {/* CENTER: logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
            <img src={logoSrc} alt="Logo" className="h-9 object-contain" />
          </Link>

          {/* RIGHT: FR dropdown + gold button */}
          <div className="flex items-center gap-4">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((s) => !s)}
                className="flex items-center gap-2 text-white"
              >
                <span className="text-[18px] font-serif uppercase">{i18n.language === "fr" ? "FR" : "EN"}</span>
                <ChevronDown className={`w-4 h-4 transition ${langOpen ? "rotate-180" : ""}`} color="white" />
              </button>
              <div
                className={`absolute right-0 mt-3 w-28 rounded-xl bg-[#14333C] text-white shadow-dropdown transition origin-top
                ${langOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
              >
                <button onClick={() => switchLang("fr")} className="w-full text-left px-4 py-2 hover:bg-white/5">FR</button>
                <button onClick={() => switchLang("en")} className="w-full text-left px-4 py-2 hover:bg-white/5">EN</button>
              </div>
            </div>

            <a
              href={bookingUrl}
              className="inline-flex items-center rounded-pill bg-brand-gold text-black px-6 py-3 text-[18px] font-serif hover:opacity-90"
            >
              {t("nav.book")}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
