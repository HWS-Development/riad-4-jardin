import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import WhatsAppFab from "./WhatsAppFab.jsx";
import { useContent } from '../content/ContentContext.jsx';



export default function Layout({ children }) {
  const { locale } = useContent();
  return (
    <div className="min-h-dvh flex flex-col bg-white text-brand-charcoal">
      <a href="#main-content" className="skip-link">{locale === 'fr' ? 'Aller au contenu' : 'Skip to content'}</a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
      <WhatsAppFab />
      <Footer />
    </div>
  );
}
