import { useState, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createI18n } from './i18n.js';
import { ContentProvider } from './content/ContentContext.jsx';
import Layout from './components/Layout.jsx';

export default function App({ Page, data, onHydrated }) {
  const [i18n] = useState(() => createI18n(data.locale, data.translations));
  useEffect(() => { onHydrated?.(); }, [onHydrated]);
  return <ContentProvider value={data}>
    <I18nextProvider i18n={i18n}>
      <Layout><Page /></Layout>
    </I18nextProvider>
  </ContentProvider>;
}
