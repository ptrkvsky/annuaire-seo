import { AstroAuth, type AstroAuthConfig } from 'auth-astro';
import GitHub from '@auth/core/providers/github';
import Discord from '@auth/core/providers/discord';
import Google, { GoogleProfile } from '@auth/core/providers/google';
import type { OAuthUserConfig } from '@auth/core/providers';

export const authOpts: AstroAuthConfig = {
  providers: [
    // @ts-ignore
    GitHub({
      clientId: import.meta.env.GITHUB_ID,
      clientSecret: import.meta.env.GITHUB_SECRET,
    }),
    // @ts-ignore
    Discord({
      clientId: import.meta.env.DISCORD_ID,
      clientSecret: import.meta.env.DISCORD_SECRET,
    }),
    // @ts-ignore
    Google({
      clientId: import.meta.env.GOOGLE_ID,
      clientSecret: import.meta.env.GOOGLE_SECRET,
    }),
  ],
  trustHost: true,
  secret: import.meta.env.SECRET,
};

export const { get, post } = AstroAuth(authOpts);
