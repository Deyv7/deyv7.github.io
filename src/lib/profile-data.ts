import * as pt from '../data/profile';
import * as en from '../data/profile.en';
import type { Locale } from './i18n';

export function getProfileData(locale: Locale = 'pt-BR') {
  return locale === 'en-US' ? en : pt;
}
