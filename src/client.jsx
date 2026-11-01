import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import { resolveRoute } from './site/routes.js';

const loaders = {
  home: () => import('./pages/Home.jsx'),
  rooms: () => import('./pages/Rooms.jsx'),
  spa: () => import('./pages/Spa.jsx'),
  services: () => import('./pages/Services.jsx'),
  restaurant: () => import('./pages/Restaurant.jsx'),
  gallery: () => import('./pages/Gallery.jsx'),
  contact: () => import('./pages/Contact.jsx'),
  conditions: () => import('./pages/BookingConditions.jsx'),
  notFound: () => import('./pages/NotFound.jsx'),
};

export async function hydrate() {
  const root = document.getElementById('root');
  const payload = document.getElementById('page-data');
  const data = payload ? JSON.parse(payload.textContent) : await fetch(`/__content?path=${encodeURIComponent(location.pathname)}`).then(r => r.json());
  const { default: Page } = await loaders[data.pageId || resolveRoute(location.pathname).id]();
  await new Promise(resolve => {
    if (payload) hydrateRoot(root, <App Page={Page} data={data} onHydrated={resolve} />);
    else createRoot(root).render(<App Page={Page} data={data} onHydrated={resolve} />);
  });
}
