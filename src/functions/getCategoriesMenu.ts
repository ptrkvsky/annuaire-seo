import type { SanityCategory } from '@/interfaces/SanityCategory';
import { getElementById } from '@/services/article/getElementById';
import getSisterCategories from '@/services/article/getSisterCategories';

export async function getCategoriesMenu(categoryId: string) {
  // Get main category of the article
  const articleCategory = await getElementById<SanityCategory>(categoryId);
  if (articleCategory?.parent) {
    const sistersCategory = await getSisterCategories(
      articleCategory.parent._ref
    );
    return sistersCategory;
  }
  return articleCategory ? [articleCategory] : [];
}
