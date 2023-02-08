const sanityId = import.meta.env.SANITY_ID;
const sanityDataset = import.meta.env.SANITY_DATASET;
const sanityToken = import.meta.env.SANITY_TOKEN;

export const sanityConfig = {
  projectId: sanityId,
  dataset: sanityDataset,
  token: sanityToken,
  ignoreBrowserTokenWarning: true,
  useCdn: true,
};
