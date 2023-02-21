export const sanityConfig = {
  projectId: import.meta.env.PUBLIC_SANITY_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2021-08-31',
  token: import.meta.env.PUBLIC_SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
  useCdn: true,
};
