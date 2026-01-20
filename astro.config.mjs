import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zaydabbas.co.uk',
  integrations: [
    tailwind({
      applyBaseStyles: false
    })
  ]
});
