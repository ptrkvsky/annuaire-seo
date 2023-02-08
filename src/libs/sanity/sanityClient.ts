import { sanityConfig } from '../../config/sanityConfig';
import sanityClient from '@sanity/client';

const sanity = {
  instance: sanityClient(sanityConfig),
};

Object.freeze(sanity);

export default sanity;
