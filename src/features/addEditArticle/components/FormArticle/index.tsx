import { useState } from 'react';
import { useMutation } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import type { SanityCategory } from '@/interfaces/SanityCategory';
import type { SanityArticle } from '@/interfaces/SanityArticle';
import { toHTML } from '@portabletext/to-html';
import SelectCategory from '@/features/addEditArticle/components/SelectCategory';
import type { IFormState } from '../../interfaces/IFormState';
import BlockContent from '../BlockContent';
import SelectFile from '../SelectFile';
import checkIsMinLength from '@/utils/checkIsMinLength';
import transformHtmlToBlocks from '@/utils/transformHtmlToBlocks';
import styles from './styles.module.scss';
import '@/styles/buttons.scss';
import InputMetaTitle from '../InputMetaTitle';
import TextareaMetadesc from '../TextareaMetaDesc';
import TextareaIntro from '../TextareaIntro';

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
    articleCategory: article?.articleCategory._id || '',
    content: contentHTML || '',
    metaTitle: article?.metaTitle || '',
    metaDesc: article?.metaDesc || '',
    intro: article?.intro || '',
  });

  const mutation = useMutation((dataToPost: FormData) => {
    return fetch(`/api/save-form`, {
      method: 'POST',
      body: dataToPost,
    });
  });

  const isDisabled =
    !checkIsMinLength(formState.content) ||
    mutation.isLoading ||
    (!formState.imageMain && !article?.imageMain) ||
    !formState.intro ||
    !formState.metaTitle ||
    !formState.metaDesc;

  function postArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isDisabled) return;

    const htmlContent = transformHtmlToBlocks(formState.content);

    const dataToPost = new FormData();
    dataToPost.append('articleId', article?._id || '');
    dataToPost.append('title', formState.title);
    dataToPost.append('metaTitle', formState.metaTitle);
    dataToPost.append('metaDesc', formState.metaDesc);
    dataToPost.append('intro', formState.intro);
    dataToPost.append('articleCategory', formState.articleCategory);
    dataToPost.append('content', JSON.stringify(htmlContent));

    if (formState.imageMain) {
      dataToPost.append('imageMain', formState.imageMain);
    }

    mutation.mutate(dataToPost);
    return;
  }

  return (
    <form onSubmit={postArticle} className={styles.wrapperForm}>
      <div className={styles.wrapper}>
        <label htmlFor="titre">
          Titre
          <span className={styles.info}>Balise H1 et titre de mon article</span>
          <input
            id="titre"
            className={styles.input}
            type="text"
            value={formState.title}
            onChange={(event) =>
              setFormState({ ...formState, title: event.target.value })
            }
          />
        </label>
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="metaTitle">
          Meta Title
          <span className={styles.info}>
            45 caractères minimum ({formState.metaTitle.length} actuellement)
          </span>
          <InputMetaTitle formState={formState} setFormState={setFormState} />
        </label>
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="metaDesc">
          Meta Description
          <span className={styles.info}>
            50 caractères minimum ({formState.metaDesc.length} actuellement)
          </span>
          <TextareaMetadesc formState={formState} setFormState={setFormState} />
        </label>
      </div>
      <div className={styles.wrapper}>
        <label htmlFor="intro">
          Introduction
          <span className={styles.info}>
            Premier paragraphe pour une meilleure présentation, environ 40 mots
          </span>
          <TextareaIntro formState={formState} setFormState={setFormState} />
        </label>
      </div>
      <SelectCategory
        categories={categories}
        formState={formState}
        setFormState={setFormState}
      />
      <BlockContent setFormState={setFormState} formState={formState} />
      <SelectFile formState={formState} setFormState={setFormState} />
      <button
        className={`${styles.submit} button-50 mini`}
        type="submit"
        disabled={isDisabled}
      >
        Envoyer
      </button>
      {mutation?.data && mutation?.data?.status !== 200 ? (
        <div>Une erreur est survenue</div>
      ) : null}
      {mutation?.data && mutation?.data?.status === 200 ? (
        <div>Congratulations</div>
      ) : null}

      {!formState.intro ? <p>Une introduction est obligatoire</p> : null}
    </form>
  );
};

export default FormArticle;
