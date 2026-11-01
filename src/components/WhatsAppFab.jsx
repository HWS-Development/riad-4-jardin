import { FaWhatsapp } from "react-icons/fa";
import { useContent } from '../content/ContentContext.jsx';

export default function WhatsAppFab() {
  const { settings, locale } = useContent();
  const message = locale === 'fr' ? 'Bonjour, je souhaite des informations sur le Riad 4 Jardins.' : 'Hello, I would like information about Riad 4 Jardins.';
  const url = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
}
