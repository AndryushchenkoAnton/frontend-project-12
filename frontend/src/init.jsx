import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import resources from './Locales/index.js';
import App from './App.jsx';

const localeInit = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'ru',
      debug: true,
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false,
      },
    });

  leoProfanity.add(leoProfanity.getDictionary('ru'));

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default localeInit;
