import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { htmlToBlocks } from '@sanity/block-tools';
import schemaArticle from '@/schemas/article.schema';
import type { SanityCategory } from '@/interfaces/SanityCategory';
import type { SanityArticle } from '@/interfaces/SanityArticle';
import { toHTML } from '@portabletext/to-html';
import type { IFormArticle } from '@/interfaces/FomArticle';
import SelectCategory from '@/features/AddEditArticle/components/SelectCategory';
import type { IFormState } from '../interfaces/IFormState';
import BlockContent from './BlockContent';
import countWord from '@/utils/countWord';
import CONST from '@/config/CONST';
import type { IErrorForm } from '../interfaces/IErrorForm';
import checkError from '../functions/checkError';
import useError from '../hooks/useError';

const blockContentType = schemaArticle
  .get('article')
  .fields.find((field: any) => field.name === 'content').type;

interface Props {
  article?: SanityArticle;
  categories: SanityCategory[];
}

const FormArticle = ({ categories, article }: Props) => {
  const contentHTML = toHTML(article?.content, {
    components: {
      /* optional object of custom components to use */
    },
  });

  const [formState, setFormState] = useState<IFormState>({
    articleId: article?._id,
    title: article?.title || '',
    articleCategory: article?.articleCategory._ref || '',
    content: contentHTML || '',
  });

  console.log(formState);

  const [error, setError] = useState<IErrorForm>();

  const mutation = useMutation((dataToPost: IFormArticle) => {
    return fetch(`/api/save-form`, {
      method: 'POST',
      body: JSON.stringify(dataToPost),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    });
  });

  const cleanText = formState.content.replace(/<\/?[^>]+(>|$)/g, '').trim();
  const isDisabled =
    countWord(cleanText) < CONST.minWordsForText || mutation.isLoading;

  function postArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isDisabled) {
      return false;
    }

    const blockContent = htmlToBlocks(formState.content, blockContentType);
    const dataToPost: IFormArticle = {
      articleId: article?._id,
      title: formState.title,
      articleCategory: formState.articleCategory,
      content: blockContent,
    };

    mutation.mutate(dataToPost);
  }

  return (
    <form onSubmit={postArticle}>
      <div>
        <label>
          titre (h1)
          <input
            type="text"
            value={formState.title}
            onChange={(event) =>
              setFormState({ ...formState, title: event.target.value })
            }
          />
        </label>
      </div>
      <SelectCategory
        categories={categories}
        formState={formState}
        setFormState={setFormState}
      />
      <BlockContent setFormState={setFormState} formState={formState} />

      <button type="submit" disabled={isDisabled}>
        Envoyer
      </button>

      {mutation?.data && mutation?.data?.status !== 200 ? (
        <div>Une erreur est survenue</div>
      ) : null}
      {mutation?.data && mutation?.data?.status === 200 ? (
        <div>Congratulations</div>
      ) : null}
    </form>
  );
};

export default FormArticle;
