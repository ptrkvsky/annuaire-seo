import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import image from '@astrojs/image';

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  //@ts-ignore
  integrations: [
    react(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
  ],
});
