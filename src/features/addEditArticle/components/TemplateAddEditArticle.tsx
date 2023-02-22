import FormArticle from '@/features/addEditArticle/components/FormArticle';
import QueryClientProvider from '@/components/QueryClientProvider';
import type { SanityArticle } from '@/interfaces/SanityArticle';
import type { SanityCategory } from '@/interfaces/SanityCategory';

interface Props {
  article?: SanityArticle;
  categories: SanityCategory[];
}

const TemplateAddEditArticle = ({ article, categories }: Props) => {
  return (
    <div>
      <h1>{article ? 'Editer votre article' : 'Ajouter un nouvel article'}</h1>
      <QueryClientProvider>
        <FormArticle article={article} categories={categories} />
      </QueryClientProvider>
    </div>
  );
};

export default TemplateAddEditArticle;
