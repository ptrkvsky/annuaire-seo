/**
 * Defines the default SEO configuration for the website.
 */
export const seoConfig = {
  author: 'Johan Petrikovsky',
  baseURL: import.meta.env.PUBLIC_URL, // Change this to your production URL.
  productionURL: 'https://article-invité.com', // Change this to your production URL.
  description:
    'Article invité - Écrivez pour nous et augmentez votre visibilité en ligne.', // Change this to be your website's description.
  type: 'website',
  image: {
    url: 'https://cdn.sanity.io/images/3nvlsugj/production/fc4a8a703219770244df213783540aee1307cee3-640x427.jpg', // Change this to your website's thumbnail.
    alt: 'Article invité.', // Change this to your website's thumbnail description.
    width: 640,
    height: 427,
  },
  siteName: 'Article invité', // Change this to your website's name,
  twitter: {
    card: 'summary_large_image',
  },
};
