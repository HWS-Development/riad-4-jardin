import { resolveRoute } from './routes.js';
import { mediaSlots } from './media-slots.js';

export function pageData(path, snapshot, media) {
  const route = resolveRoute(path);
  const localeContent = snapshot.locales[route.locale];
  const keys = [...mediaSlots.shared, ...mediaSlots[route.id]];
  const images = Object.fromEntries(keys.map(key => [key, localeContent.images[`${route.id}:${key}`] || localeContent.images[`shared:${key}`]]).filter(([, image]) => image));
  const mediaKeys = keys.map(key => images[key]?.src || key);
  return {
    pageId: route.id, locale: route.locale, path: route.path,
    settings: snapshot.settings, translations: localeContent.translations,
    texts: Object.fromEntries(Object.entries(localeContent.texts).filter(([key]) => key.startsWith(`${route.id}.`) || /^(header|footer|shared)\./.test(key))),
    images, media: Object.fromEntries(mediaKeys.map(key => [key, media[key]])),
    ...(route.id === 'conditions' ? { conditions: localeContent.conditions } : {}),
  };
}
