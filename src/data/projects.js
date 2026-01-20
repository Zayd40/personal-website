export const projectTags = [
  'All',
  'Web',
  'DevOps/Homelab',
  'Automation',
  'Community',
  'Media',
  'Design'
];

export const projects = [
  {
    title: 'AZC Website & Infrastructure',
    slug: 'azc',
    outcome: 'Rebuilt the site and deployment flow so updates, events, and donations stay reliable.',
    tags: ['Web', 'DevOps/Homelab', 'Community'],
    stack: ['Astro', 'Netlify', 'Cloudflare', 'Docker'],
    links: {
      live: '#',
      github: '#',
      caseStudy: '/projects/azc'
    },
    featured: true
  },
  {
    title: 'Event Streaming & Media System',
    slug: 'event-streaming',
    outcome: 'Built a redundant capture-to-stream workflow for live events with minimal downtime.',
    tags: ['Media', 'Automation', 'Community'],
    stack: ['OBS', 'Nginx', 'Linux', 'Automation'],
    links: {
      live: '#',
      github: '#',
      caseStudy: '#'
    },
    featured: true
  },
  {
    title: 'Longhill Promotional Video',
    slug: 'longhill-promo',
    outcome: 'Directed and delivered a short promo with consistent editing and sound polish.',
    tags: ['Media', 'Design'],
    stack: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
    links: {
      live: '#',
      github: '#',
      caseStudy: '#'
    },
    featured: true
  },
  {
    title: 'Property Photography',
    slug: 'property-photo',
    outcome: 'Created a repeatable shoot-to-delivery system for property listings and media packs.',
    tags: ['Media', 'Design'],
    stack: ['Lightroom', 'Capture One', 'Delivery Workflow'],
    links: {
      live: '#',
      github: '#',
      caseStudy: '#'
    },
    featured: false
  },
  {
    title: 'Bronze Arts Award',
    slug: 'bronze-arts-award',
    outcome: 'Completed the Bronze Arts Award with a creative portfolio and documented process.',
    tags: ['Community', 'Design'],
    stack: ['Creative Portfolio', 'Documentation'],
    links: {
      live: '#',
      github: '#',
      caseStudy: '#'
    },
    featured: false
  }
];
