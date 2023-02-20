import { useState } from 'react';
import { useMutation } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import type { SanityCategory } from '@/interfaces/SanityCategory';
import type { SanityArticle } from '@/interfaces/SanityArticle';
import { toHTML } from '@portabletext/to-html';
import SelectCategory from '@/features/AddEditArticle/components/SelectCategory';
import type { IFormState } from '../../interfaces/IFormState';
import BlockContent from '../BlockContent';
import SelectFile from '../SelectFile';
import checkIsMinLength from '@/utils/checkIsMinLength';
import transformHtmlToBlocks from '@/utils/transformHtmlToBlocks';
import styles from './styles.module.scss';

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

  const mutation = useMutation((dataToPost: FormData) => {
    return fetch(`/api/save-form`, {
      method: 'POST',
      body: dataToPost,
    });
  });

  const isDisabled = !checkIsMinLength(formState.content) || mutation.isLoading;

  function postArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isDisabled || !formState.imageMain) return;

    const htmlContent = transformHtmlToBlocks(formState.content);

    const dataToPost = new FormData();
    dataToPost.append('articleId', article?._id || '');
    dataToPost.append('title', formState.title);
    dataToPost.append('articleCategory', formState.articleCategory);
    dataToPost.append('content', JSON.stringify(htmlContent));
    dataToPost.append('imageMain', formState.imageMain);

    mutation.mutate(dataToPost);
    return;
  }

  return (
    <form onSubmit={postArticle}>
      <div>
        <label className={styles.wrapper}>
          Titre de l'article
          <input
            className={styles.input}
            type="text"
            value={formState.title}
            onChange={(event) =>
              setFormState({ ...formState, title: event.target.value })
            }
          />
        </label>
        <span className={styles.info}>Info sup</span>
      </div>
      <SelectCategory
        categories={categories}
        formState={formState}
        setFormState={setFormState}
      />
      <BlockContent setFormState={setFormState} formState={formState} />
      <SelectFile formState={formState} setFormState={setFormState} />
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
