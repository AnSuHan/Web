const translationsCache = {};

// JSON 파일 불러오기
export async function loadTranslations(lang) {
  if (translationsCache[lang]) {
    return translationsCache[lang];
  }
  const res = await fetch(`./locales/${lang}.json`);
  if (!res.ok) {
    throw new Error(`Failed to load ${lang} translations`);
  }
  const data = await res.json();
  translationsCache[lang] = data;
  return data;
}

// 화면 내 data-i18n 텍스트 치환
export function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = translations[key];
    if (translation) {
      if (el.tagName.toLowerCase() === 'title') {
        document.title = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
}

// 언어 변경 시 호출 함수
export async function changeLanguage(lang) {
  const translations = await loadTranslations(lang);
  applyTranslations(translations);
  return translations;
}
