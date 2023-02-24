import type { WebSite } from 'schema-dts';
import { seoConfig } from '../config';

const getGraphWebsite = () => {
  const website: WebSite = {
    '@type': 'WebSite',
    '@id': `${seoConfig.baseURL}/#website`,
    url: `${seoConfig.baseURL}/`,
    name: 'Article invité',
    description: seoConfig.description,
    inLanguage: 'fr-FR',
  };

  return website;
};

export default getGraphWebsite;
