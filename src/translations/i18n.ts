import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/en.json";
import ruTranslation from "./locales/ru.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: enTranslation },
  ru: { translation: ruTranslation },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "ru",
  defaultNS,
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
