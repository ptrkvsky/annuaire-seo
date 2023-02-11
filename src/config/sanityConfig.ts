export const sanityConfig = {
  projectId: import.meta.env.SANITY_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: '2021-08-31',
  token: import.meta.env.SANITY_TOKEN,
  ignoreBrowserTokenWarning: true,
  useCdn: true,
};
