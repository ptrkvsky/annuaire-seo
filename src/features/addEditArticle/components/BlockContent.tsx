import CONST from '@/config/CONST';
import type { IFormState } from '@/features/addEditArticle/interfaces/IFormState';
import countWord from '@/utils/countWord';
import RichTextEditor from './RichTextEditor';
import styles from './FormArticle/styles.module.scss';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

function BlockContent({ formState, setFormState }: Props) {
  const cleanText = formState.content.replace(/<\/?[^>]+(>|$)/g, '').trim();
  const nbWords = countWord(cleanText);

  return (
    <div className={styles.wrapper}>
      <label>
        Contenu de mon article
        <span className={styles.info}>500 mots sont obligatoires</span>
        <RichTextEditor formState={formState} setFormState={setFormState} />
      </label>
      <p>
        Vous avez saisi <strong>{nbWords}</strong> mot{nbWords > 1 && 's'}, ils
        vous en faut au moins {CONST.minWordsForText}
      </p>
      {countWord(cleanText) < CONST.minWordsForText && (
        <p>
          Il manque encore {CONST.minWordsForText - countWord(cleanText)} mots à
          votre article{' '}
        </p>
      )}
    </div>
  );
}

export default BlockContent;
