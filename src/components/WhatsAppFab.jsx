import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFab() {
  const phone = "212718919926"; // change this to your WhatsApp number
  const message = "Hello! I'd like to get more information about your riad.";
  const url = `https://api.whatsapp.com/send/?phone=${phone}&text&type=phone_number&app_absent=0`;

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
