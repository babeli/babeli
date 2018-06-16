import i18next from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import en from './en';
import de from './de';

i18next
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },
  });

export default i18next;
