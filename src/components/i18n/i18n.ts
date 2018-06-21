import Polyglot from 'node-polyglot';

import { phrases as enPhrases } from './en';
import { phrases as esPhrases } from './es';
const phraseMap = {
  en: enPhrases,
  es: esPhrases
};

function getLang(defaultLang: string) {
  if (!document) return defaultLang;
  return document.querySelector('html').lang || defaultLang;
}

(window as any).polyglot =
  (window as any).polyglot || new Polyglot({locale: getLang('en')});
const polyglot = (window as any).polyglot;
const locale = polyglot.locale();

polyglot.extend(enPhrases);
if (locale !== 'en') polyglot.extend(phraseMap[locale] || {});

export function _t(phrase: string,
    interpolationOptions?: Polyglot.InterpolationOptions) : string {
  return polyglot.t(phrase, interpolationOptions);
}
