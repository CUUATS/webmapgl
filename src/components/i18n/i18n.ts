import Polyglot from 'node-polyglot';

import { phrases as enPhrases } from './en';
const phraseMap = {
  en: enPhrases
};

(window as any).polyglot =
  (window as any).polyglot || new Polyglot({locale: 'en'});
const polyglot = (window as any).polyglot;
const locale = polyglot.locale();

polyglot.extend(enPhrases);
if (locale !== 'en') polyglot.extend(phraseMap[locale] || {});

export function _t(phrase: string,
    interpolationOptions?: Polyglot.InterpolationOptions) : string {
  return polyglot.t(phrase, interpolationOptions);
}
