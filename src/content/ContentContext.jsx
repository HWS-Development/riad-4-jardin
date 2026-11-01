import { createContext, useContext } from 'react';

const ContentContext = createContext(null);
// The provider and its small consumer hooks intentionally share one context module.
/* eslint-disable react-refresh/only-export-components */
export const ContentProvider = ContentContext.Provider;

export function useContent() {
  const content = useContext(ContentContext);
  if (!content) throw new Error('ContentProvider is required');
  return content;
}

// Stable, explicit keys keep editorial fields independent of layouts and URLs.
export function useCopy() {
  const { locale, texts = {} } = useContent();
  return (key, fr, en) => texts[key] ?? (locale === 'fr' ? fr : en);
}
