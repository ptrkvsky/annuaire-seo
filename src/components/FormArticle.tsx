import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { htmlToBlocks } from '@sanity/block-tools';
import schemaArticle from '../schemas/article.schema';
import type { SanityCategory } from '../interfaces/SanityCategory';
import type { SanityArticle } from '../interfaces/SanityArticle';
import { toHTML } from '@portabletext/to-html';

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

  const [contentValue, setContentValue] = useState(contentHTML || '');
  const [articleCategory, setArticleCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(article?.title);

  function postArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const blockContent = htmlToBlocks(contentValue, blockContentType);
    const dataToPost = {
      title,
      articleCategory,
      content: blockContent,
    };

    fetch(`/api/save-form`, {
      method: 'POST',
      body: JSON.stringify(dataToPost),
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
        } else {
          return response.json();
        }
      })
      .then((result) => {
        if (result) {
          // setHasError(false);
          // setIsSuccess(true);
        }
      })
      .catch((err) => {
        console.error('👨‍🚒 Une terrible erreur est survenue', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  console.log(categories);

  var toolbarOptions = [['bold', 'italic'], [{ header: [2, 3, 4, 5, 6] }]];

  return (
    <form onSubmit={postArticle}>
      <div>
        <label>
          titre (h1)
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
      </div>
      <select onChange={(event) => setArticleCategory(event.target.value)}>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </select>
      <ReactQuill
        theme="snow"
        value={contentValue}
        placeholder={'Contenu de votre article'}
        onChange={setContentValue}
        modules={{
          toolbar: toolbarOptions,
        }}
      />
      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
};

export default FormArticle;
