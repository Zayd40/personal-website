const storageKey = 'theme-preference';

const onReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
    return;
  }
  fn();
};

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
};

const updateToggle = (theme) => {
  const toggle = document.querySelector('[data-theme-toggle]');
  if (!toggle) return;
  const label = toggle.querySelector('[data-theme-label]');
  const isDark = theme === 'dark';
  toggle.setAttribute('aria-pressed', String(isDark));
  if (label) {
    label.textContent = isDark ? 'Light mode' : 'Dark mode';
  }
};

export const initThemeToggle = () => {
  onReady(() => {
    const stored = localStorage.getItem(storageKey);
    const theme = stored || getSystemTheme();
    applyTheme(theme);
    updateToggle(theme);

    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.addEventListener('click', () => {
        const current = document.documentElement.dataset.theme || getSystemTheme();
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(storageKey, next);
        applyTheme(next);
        updateToggle(next);
      });
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', (event) => {
      const hasStored = localStorage.getItem(storageKey);
      if (hasStored) return;
      const next = event.matches ? 'dark' : 'light';
      applyTheme(next);
      updateToggle(next);
    });
  });
};
