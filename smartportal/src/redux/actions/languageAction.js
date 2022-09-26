import { CHANGE_LANGUAGE } from './actionTypes';

export const changeLanguageMethod = ({appLanguage}) => (
    {
      type: CHANGE_LANGUAGE,
      data: {appLanguage}
    }
);