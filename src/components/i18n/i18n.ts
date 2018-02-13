function getLang(defaultLang: string) {
  if (!document) return defaultLang;
  return document.querySelector('html').lang || defaultLang;
}

// TODO: Figure out how to load only the required translation.
const lang = getLang('en');
const translation = {
  'es': {
  },
  'fr': {
  }
}[lang] || {};

export function _t(text: string) {
  return translation[text] || text;
}
