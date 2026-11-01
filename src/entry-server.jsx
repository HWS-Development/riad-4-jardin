import { renderToString } from 'react-dom/server';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Rooms from './pages/Rooms.jsx';
import Spa from './pages/Spa.jsx';
import Services from './pages/Services.jsx';
import Restaurant from './pages/Restaurant.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import BookingConditions from './pages/BookingConditions.jsx';

const components = { home: Home, rooms: Rooms, spa: Spa, services: Services, restaurant: Restaurant, gallery: Gallery, contact: Contact, conditions: BookingConditions, notFound: NotFound };
export function render(data) {
  return renderToString(<App Page={components[data.pageId]} data={data} />);
}
