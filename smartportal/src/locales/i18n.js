/* eslint-disable global-require */
import {I18nManager} from 'react-native';
import i18n from 'i18n-js';
import RNRestart from 'react-native-restart';
import {setSecureData, storageKeys} from '_utils/localStorage';

// set default app language
export const DEFAULT_LANGUAGE = 'en';

export const translationGetters = {
  en: () => require('./en.json'),
  ar: () => require('./ar.json'),
};

export const translate = (param) => {
  return i18n.t(param);
};

export const translateWithParam = (title, params) => {
  return i18n.t(title, params);
};

export const changeLanguage = async (codeLang) => {
  await setSecureData(storageKeys.selectedLanguage, codeLang);
  i18n.locale = codeLang;
  I18nManager.forceRTL(codeLang === 'ar');
  RNRestart.Restart();
};

export const setI18nConfig = async (codeLang = null) => {
  // fallback if no available language fits
  const fallback = {languageTag: DEFAULT_LANGUAGE, isRTL: false};

  const lang = codeLang
    ? {languageTag: codeLang, isRTL: codeLang === 'ar'}
    : null;

  const {languageTag, isRTL} = lang || fallback;

  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = {[languageTag]: translationGetters[languageTag]()};
  i18n.locale = languageTag;

  return languageTag;
};
