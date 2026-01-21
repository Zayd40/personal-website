const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const onReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
    return;
  }
  fn();
};

const markRevealed = (el) => {
  el.classList.add('is-revealed', 'is-in');
};

const revealAll = () => {
  document.querySelectorAll('[data-reveal]').forEach(markRevealed);
};

const loadAnime = async () => {
  try {
    const mod = await import(
      'https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.es.js'
    );
    return mod.default || mod;
  } catch (error) {
    return null;
  }
};

const initHero = (anime, reduceMotion) => {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const items = hero.querySelectorAll('[data-hero-item]');
  const underline = hero.querySelector('[data-hero-underline]');

  if (reduceMotion || !anime) {
    items.forEach((item) => {
      item.style.opacity = '1';
      item.style.transform = 'none';
      item.classList.add('is-revealed', 'is-in');
    });
    if (underline) {
      underline.style.transform = 'scaleX(1)';
    }
    return;
  }

  const timeline = anime.timeline({
    easing: 'easeOutQuad'
  });

  timeline.add({
    targets: items,
    opacity: [0, 1],
    translateY: [16, 0],
    delay: anime.stagger(120),
    duration: 520
  });

  if (underline) {
    timeline.add(
      {
        targets: underline,
        scaleX: [0, 1],
        duration: 500
      },
      '-=300'
    );
  }
};

const initHoverLines = (anime, reduceMotion) => {
  const hoverTargets = document.querySelectorAll('[data-hover-line]');
  if (!hoverTargets.length) return;

  hoverTargets.forEach((el) => {
    const line = el.querySelector('.u-line');
    if (!line) return;

    const showLine = () => {
      line.style.transform = 'scaleX(1)';
    };

    const hideLine = () => {
      line.style.transform = 'scaleX(0)';
    };

    const animateIn = () => {
      if (reduceMotion || !anime) {
        showLine();
        return;
      }
      anime.remove(line);
      anime({
        targets: line,
        scaleX: 1,
        duration: 320,
        easing: 'easeOutQuad'
      });
    };

    const animateOut = () => {
      if (reduceMotion || !anime) {
        hideLine();
        return;
      }
      anime.remove(line);
      anime({
        targets: line,
        scaleX: 0,
        duration: 220,
        easing: 'easeOutQuad'
      });
    };

    el.addEventListener('mouseenter', animateIn);
    el.addEventListener('mouseleave', animateOut);
    el.addEventListener('focus', animateIn);
    el.addEventListener('blur', animateOut);

    hideLine();
  });
};

const initScrollReveal = (anime, reduceMotion) => {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  if (reduceMotion || !anime || !('IntersectionObserver' in window)) {
    elements.forEach(markRevealed);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        observer.unobserve(target);
        anime({
          targets: target,
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 480,
          easing: 'easeOutQuad'
        });
        markRevealed(target);
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach((el) => observer.observe(el));
};

const initFloatingAccent = (anime, reduceMotion) => {
  const orb = document.querySelector('[data-hero-orb]');
  if (!orb || reduceMotion || !anime) return;

  anime({
    targets: orb,
    translateY: [0, -12],
    direction: 'alternate',
    duration: 3200,
    easing: 'easeInOutSine',
    loop: true
  });
};

const initMotion = async () => {
  const reduceMotion = prefersReducedMotion();
  if (reduceMotion) {
    revealAll();
    initHero(null, true);
    initHoverLines(null, true);
    return;
  }

  const anime = await loadAnime();

  if (!anime) {
    revealAll();
  }

  initHero(anime, reduceMotion);
  initHoverLines(anime, reduceMotion);
  initScrollReveal(anime, reduceMotion);
  initFloatingAccent(anime, reduceMotion);
};

onReady(() => {
  initMotion();
});
