const onReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
    return;
  }
  fn();
};

export const initProjectFilters = () => {
  onReady(() => {
    const filterGroup = document.querySelector('[data-filter-group]');
    if (!filterGroup) return;

    const buttons = Array.from(filterGroup.querySelectorAll('[data-filter]'));
    const cards = Array.from(document.querySelectorAll('[data-project-card]'));

    const setActive = (filter) => {
      buttons.forEach((button) => {
        const isActive = button.dataset.filter === filter;
        button.setAttribute('aria-pressed', String(isActive));
        button.classList.toggle('border-accent', isActive);
        button.classList.toggle('text-fg', isActive);
        button.classList.toggle('text-muted', !isActive);
      });

      cards.forEach((card) => {
        const tags = (card.dataset.tags || '')
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean);
        const show = filter === 'All' || tags.includes(filter);
        card.hidden = !show;
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        setActive(button.dataset.filter || 'All');
      });
    });

    setActive('All');
  });
};
