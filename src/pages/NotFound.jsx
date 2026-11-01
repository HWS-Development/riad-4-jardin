import { useCopy, useContent } from '../content/ContentContext.jsx';
import { pagePath } from '../site/routes.js';
export default function NotFound() {
  const copy = useCopy(), { locale } = useContent();
  return <section className="bg-brand-teal text-white px-6 pt-48 pb-24 min-h-[70vh] text-center">
    <h1 className="text-white text-4xl md:text-5xl">{copy('notFound.title', 'Page introuvable', 'Page not found')}</h1>
    <p className="my-8">{copy('notFound.message', 'Cette adresse n’existe pas ou a été déplacée.', 'This address does not exist or has moved.')}</p>
    <a className="btn-gold inline-block" href={pagePath('home', locale)}>{copy('notFound.home', 'Retour à l’accueil', 'Back to home')}</a>
  </section>;
}
