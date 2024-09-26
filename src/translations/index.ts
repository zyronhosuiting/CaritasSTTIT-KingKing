import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

i18n.use(initReactI18next).init({
  resources: {
    en: require('./locales/en-US.json'),
    hk: require('./locales/zh-HK.json'),
    zh: require('./locales/zh-CN.json'),
  },
  lng: Localization.getLocales()[0].languageCode || '', // set translation = local language from device
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  compatibilityJSON: 'v3',
});
export default i18n;
