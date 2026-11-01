import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useContent, useCopy } from '../content/ContentContext.jsx';
import { pages, pagePath } from '../site/routes.js';
import ResponsiveImage from './ResponsiveImage.jsx';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { locale, pageId, settings } = useContent();
  const copy = useCopy();
  const { t } = useTranslation();
  const labels = { home: t('nav.home'), rooms: t('nav.rooms'), spa: t('nav.spa'), services: t('nav.services'), restaurant: t('nav.restaurant'), gallery: t('nav.gallery') };
  const [scrolled, setScrolled] = useState(false);
  const menu = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const close = () => { menu.current.open = false; };
  const onKeyDown = event => {
    if (event.key === 'Escape') {
      close();
      menu.current.querySelector('summary').focus();
    }
    if (event.key === 'Tab' && menu.current.open && window.innerWidth < 768) {
      const focusable = [...menu.current.querySelectorAll('summary, a[href], button')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };
  return <header className={[
    'fixed inset-x-0 top-0 z-50 transition-all duration-500',
    scrolled ? 'bg-brand-teal/95 text-white shadow-md backdrop-blur-sm border-b border-black/10' : `bg-transparent ${['services', 'gallery'].includes(pageId) ? 'text-brand-teal' : 'text-white'}`,
  ].join(' ')}>
    <div className="mx-auto max-w-7xl md:h-32 h-24 px-4 flex items-center justify-between">
      <details ref={menu} suppressHydrationWarning className="header-menu relative max-md:ml-auto" onKeyDown={onKeyDown}>
        <summary className="list-none cursor-pointer inline-flex items-center gap-1 text-[22px] md:text-[24px] font-serif max-md:p-2" aria-label={copy('header.menu', 'Ouvrir ou fermer le menu', 'Open or close menu')}>
          <span className="hidden md:inline">Menu ▾</span>
          <Menu className="menu-open w-8 h-8 md:hidden" /><X className="menu-close w-8 h-8 md:hidden" />
        </summary>
        <div className="header-menu-panel md:absolute md:left-0 md:mt-3 md:w-[320px] md:rounded-xl bg-brand-teal text-white md:shadow-2xl md:p-6">
          <nav aria-label={copy('header.navigation', 'Navigation principale', 'Main navigation')} className="flex flex-col max-md:items-center max-md:space-y-6 max-md:text-2xl">
            {pages.filter(page => !['contact', 'conditions'].includes(page.id)).map(page => <a key={page.id} href={page.paths[locale]} aria-current={page.id === pageId ? 'page' : undefined}
              className={`font-serif rounded md:py-2 md:text-[24px] focus-visible:ring-2 focus-visible:ring-brand-gold ${page.id === pageId ? 'text-brand-gold underline underline-offset-[6px]' : 'hover:text-brand-gold'}`}>
              {labels[page.id]}
            </a>)}
          </nav>
          <div className="md:hidden pt-6 border-t border-white/20"><Languages /></div>
          <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className="md:hidden px-8 py-3 rounded-full bg-brand-gold text-brand-forest font-semibold shadow-lg">
            {t('nav.reserve')}
          </a>
        </div>
      </details>
      <a href={pagePath('home', locale)} className="absolute left-16 md:left-1/2 -translate-x-1/2 top-3 md:top-0">
        <ResponsiveImage src="logo-full.png" alt={copy('header.logo', 'Riad 4 Jardins – Charme et traditions', 'Riad 4 Jardins – Charm and traditions')} className="h-20 md:h-32 w-auto object-contain drop-shadow" sizes="(min-width: 768px) 115px, 72px" loading="eager" />
      </a>
      <div className="hidden md:flex items-center gap-4">
        <Languages />
        <a href={settings.bookingUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-[20px] bg-brand-gold text-brand-forest !font-bold shadow transition-all duration-300 hover:shadow-lg hover:bg-brand-forest hover:text-brand-gold">
          {t('nav.reserve')}
        </a>
      </div>
    </div>
  </header>;
}

function Languages() {
  const { locale, pageId } = useContent();
  return <details className="language-menu relative" suppressHydrationWarning>
    <summary className="list-none cursor-pointer inline-flex items-center gap-1 text-[18px] md:text-[20px]" aria-label={locale === 'fr' ? 'Changer de langue' : 'Change language'}>{locale.toUpperCase()} ▾</summary>
    <nav aria-label={locale === 'fr' ? 'Langues' : 'Languages'} className="absolute right-0 mt-3 w-48 rounded-xl bg-brand-teal text-white shadow-2xl p-4 flex flex-col z-10">
      {['en', 'fr'].map(language => <a key={language} href={pagePath(pageId === 'notFound' ? 'home' : pageId, language)} hrefLang={language} lang={language}
        className={`text-left w-full py-2 font-serif text-lg rounded ${locale === language ? 'text-brand-gold underline underline-offset-4' : 'hover:text-brand-gold'}`}>
        {language === 'fr' ? 'Français' : 'English'}
      </a>)}
    </nav>
  </details>;
}
