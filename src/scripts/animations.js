import anime from 'animejs/lib/anime.es.js';

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const onReady = (fn) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
    return;
  }
  fn();
};

const initHero = (reduceMotion) => {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const items = hero.querySelectorAll('[data-hero-item]');
  const underline = hero.querySelector('[data-hero-underline]');

  if (reduceMotion) {
    items.forEach((item) => item.classList.add('is-revealed'));
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

const initHoverLines = (reduceMotion) => {
  const hoverTargets = document.querySelectorAll('[data-hover-line]');
  if (!hoverTargets.length) return;

  hoverTargets.forEach((el) => {
    const line = el.querySelector('.u-line');
    if (!line) return;

    const animateIn = () => {
      anime.remove(line);
      anime({
        targets: line,
        scaleX: 1,
        duration: 320,
        easing: 'easeOutQuad'
      });
    };

    const animateOut = () => {
      anime.remove(line);
      anime({
        targets: line,
        scaleX: 0,
        duration: 220,
        easing: 'easeOutQuad'
      });
    };

    const onEnter = () => {
      if (reduceMotion) {
        line.style.transform = 'scaleX(1)';
        return;
      }
      animateIn();
    };

    const onLeave = () => {
      if (reduceMotion) {
        line.style.transform = 'scaleX(0)';
        return;
      }
      animateOut();
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('focus', onEnter);
    el.addEventListener('blur', onLeave);

    if (reduceMotion) {
      line.style.transform = 'scaleX(0)';
    }
  });
};

const initScrollReveal = (reduceMotion) => {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  if (reduceMotion) {
    elements.forEach((el) => el.classList.add('is-revealed'));
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
        target.classList.add('is-revealed');
      });
    },
    {
      threshold: 0.2
    }
  );

  elements.forEach((el) => observer.observe(el));
};

const initFloatingAccent = (reduceMotion) => {
  const orb = document.querySelector('[data-hero-orb]');
  if (!orb || reduceMotion) return;

  anime({
    targets: orb,
    translateY: [0, -12],
    direction: 'alternate',
    duration: 3200,
    easing: 'easeInOutSine',
    loop: true
  });
};

export const initAnimations = () => {
  onReady(() => {
    const reduceMotion = prefersReducedMotion();
    initHero(reduceMotion);
    initHoverLines(reduceMotion);
    initScrollReveal(reduceMotion);
    initFloatingAccent(reduceMotion);
  });
};
