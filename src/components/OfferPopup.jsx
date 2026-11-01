import { useEffect, useRef, useState } from 'react';
import { useCopy } from '../content/ContentContext.jsx';

export default function OfferPopup() {
  const copy = useCopy();
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  useEffect(() => {
    try { if (sessionStorage.getItem('r4j-offers-dismissed')) return; } catch { /* Storage can be disabled. */ }
    const timer = setTimeout(() => setOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    dialog.current.querySelector('button').focus();
    return () => previous?.focus();
  }, [open]);
  const close = () => { setOpen(false); try { sessionStorage.setItem('r4j-offers-dismissed', '1'); } catch { /* Dismissal still works without storage. */ } };
  if (!open) return null;
  const onKey = event => {
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const items = [...dialog.current.querySelectorAll('button,a')];
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus(); }
    }
  };
  return <div id="r4j-offers-overlay" onClick={event => { if (event.currentTarget === event.target) close(); }} onKeyDown={onKey}>
    <div ref={dialog} id="r4j-offers-modal" role="dialog" aria-modal="true" aria-labelledby="r4j-offers-title">
      <button className="r4j-close" onClick={close} aria-label={copy('home.popupClose', 'Fermer la fenêtre', 'Close dialog')}>×</button>
      <div className="r4j-badge">{copy('home.popupBadge', 'Offres Spéciales', 'Special Offers')}</div>
      <h2 id="r4j-offers-title">{copy('home.popupTitle', 'Long séjour à Marrakech', 'Long stays in Marrakech')}</h2>
      <ul className="r4j-lines">
        <li>{copy('home.popup5', 'Séjour 5 nuits — transfert offert', '5-night stay — complimentary transfer')}</li>
        <li>{copy('home.popup7', 'Séjour 7 nuits — transfert + massage offert', '7-night stay — complimentary transfer and massage')}</li>
      </ul>
      <a className="r4j-btn" href="#offres-speciales" onClick={close}>{copy('home.popupCta', 'Voir les offres', 'View offers')}</a>
      <p className="r4j-note">{copy('home.popupNote', 'Offres valables uniquement pour les réservations directes sur notre site officiel.', 'Offers apply only to direct bookings on our official website.')}</p>
    </div>
  </div>;
}
