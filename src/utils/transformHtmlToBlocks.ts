import schemaArticle from '@/schemas/article.schema';
import { htmlToBlocks } from '@sanity/block-tools';

export default function transformHtmlToBlocks(text: string) {
  const blockContentType = schemaArticle
    .get('article')
    .fields.find((field: any) => field.name === 'content').type;

  const blockContent = htmlToBlocks(text, blockContentType);

  return blockContent;
}
