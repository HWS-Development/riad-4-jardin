export const mediaSlots = {
  shared: ['logo-full.png'],
  home: ['hero/hero.jpg', 'hero/hero-cover2.png', 'hero/hero-cover3.png', ...['rooms', 'spa', 'restaurant', 'garden', 'souk', 'airport', 'hammam', 'testimonials', 'ava-sophie', 'ava-marc'].map(name => `home/${name}.jpg`)],
  rooms: ['deluxe', 'triple', 'double'].flatMap(room => ['main', 'a', 'b'].map(name => `rooms/${room}/${name}.jpg`)).concat('home/ava-sophie.jpg'),
  spa: ['hero', 'hammam', 'massage', 'esthetique', 'form-side'].map(name => `spa/${name}.jpg`),
  services: ['services/workshops.jpg', 'services/souk.jpg', 'home/airport.jpg', 'services/city.jpg', 'services/rooftop.jpg', 'home/ava-sophie.jpg'],
  restaurant: ['restaurant/hero.jpg', 'restaurant/breakfast.jpg', 'restaurant/table.jpg', 'services/workshops.jpg'],
  gallery: Array.from({ length: 12 }, (_, index) => `gallery/g${String(index + 1).padStart(2, '0')}.jpg`),
  contact: ['home/garden.jpg'],
  notFound: [],
  conditions: ['hero/hero.jpg'],
};

export const heroImages = { home: 'hero/hero.jpg', rooms: 'rooms/deluxe/main.jpg', spa: 'spa/hero.jpg', restaurant: 'restaurant/hero.jpg', gallery: 'gallery/g01.jpg', services: 'services/workshops.jpg', contact: 'home/garden.jpg', conditions: 'hero/hero.jpg' };
export const prioritySizes = { home: '100vw', rooms: '(min-width: 896px) 482px, (min-width: 768px) 54vw, calc(100vw - 48px)', spa: '100vw', restaurant: '100vw', services: '(min-width: 1152px) 536px, (min-width: 768px) 46vw, calc(100vw - 48px)', gallery: '(min-width: 1152px) 357px, (min-width: 1024px) 31vw, (min-width: 640px) 46vw, calc(100vw - 48px)', contact: '(min-width: 1152px) 552px, (min-width: 768px) 48vw, calc(100vw - 48px)' };
