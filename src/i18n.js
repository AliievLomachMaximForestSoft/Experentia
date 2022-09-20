import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '../src/locales/en/en.json'
import hi from '../src/locales/hi/hi.json'

const resources = {
	en: {
		translation: en,
	},
	hi: {
		translation: hi,
	},
}

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'en',
		debug: true,
		detection: {
			order: ['queryString', 'cookie'],
			cache: ['cookie'],
		},
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
