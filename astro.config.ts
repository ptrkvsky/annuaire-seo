import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  //@ts-ignore
  integrations: [react()],
});
