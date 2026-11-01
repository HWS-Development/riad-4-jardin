import { useContent, useCopy } from '../content/ContentContext.jsx';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import { useEffect, useRef, useState } from 'react';
export default function Contact() {
  const { settings } = useContent(), copy = useCopy();
  return <div className="bg-brand-cream">
    <section className="bg-brand-teal pt-44 pb-16 px-6 text-center text-white">
      <h1 className="text-white text-4xl md:text-5xl">{copy('contact.title', 'Contact & accès au Riad 4 Jardins', 'Contact & directions to Riad 4 Jardins')}</h1>
      <p className="max-w-2xl mx-auto mt-5">{copy('contact.intro', 'Notre équipe vous accompagne pour préparer votre séjour à Marrakech, un transfert aéroport ou une demande particulière.', 'Our team can help you plan your Marrakech stay, arrange an airport transfer or discuss a special request.')}</p>
    </section>
    <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl mb-6">{copy('contact.details', 'Échangeons sur votre séjour', 'Let’s plan your stay')}</h2>
        <address className="not-italic space-y-5">
          <p>Riad 4 Jardins<br />{settings.streetAddress ? `${settings.streetAddress}, ` : ''}Marrakech, {copy('contact.country', 'Maroc', 'Morocco')}</p>
          <p><a className="underline underline-offset-4" href={`tel:${settings.phone}`}>{settings.phoneDisplay}</a></p>
          <p><a className="underline underline-offset-4 break-all" href={`mailto:${settings.email}`}>{settings.email}</a></p>
        </address>
        <a className="btn-gold inline-block mt-8" href={settings.bookingUrl} target="_blank" rel="noopener noreferrer">{copy('contact.booking', 'Consulter les disponibilités', 'Check availability')}</a>
      </div>
      <ResponsiveImage src="home/garden.jpg" alt={copy('contact.photo', 'Les jardins du Riad 4 Jardins à Marrakech', 'The gardens at Riad 4 Jardins in Marrakech')} priority className="w-full h-[420px] object-cover rounded-[22px] shadow-lg" />
    </section>
    {settings.mapsEmbedUrl && <section className="max-w-6xl mx-auto px-6 pb-16">
      <h2 className="text-3xl mb-6">{copy('contact.access', 'Rejoindre le riad', 'Find the riad')}</h2>
      <div className="rounded-[22px] overflow-hidden shadow-lg ring-1 ring-black/10">
        <MapEmbed src={settings.mapsEmbedUrl} title={copy('contact.map', 'Plan d’accès au Riad 4 Jardins', 'Map showing Riad 4 Jardins')} />
      </div>
      {settings.mapsUrl && <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 underline underline-offset-4">{copy('contact.directions', 'Ouvrir l’itinéraire dans Google Maps', 'Open directions in Google Maps')}</a>}
    </section>}
  </div>;
}

function MapEmbed({ src, title }) {
  const ref = useRef(null), [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setVisible(true); observer.disconnect(); }
    }, { rootMargin: '100px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="w-full h-[360px] md:h-[450px] bg-[#E8E2D7]">
    <iframe src={visible ? src : undefined} title={title} width="1104" height="450" className="w-full h-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
  </div>;
}
