import CONST from '@/config/CONST';
import type { IFormState } from '@/features/AddEditArticle/interfaces/IFormState';
import countWord from '@/utils/countWord';
import RichTextEditor from './RichTextEditor';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

function BlockContent({ formState, setFormState }: Props) {
  const cleanText = formState.content.replace(/<\/?[^>]+(>|$)/g, '').trim();
  const nbWords = countWord(cleanText);

  return (
    <div>
      <p>
        Vous avez saisi <strong>{nbWords}</strong> mot{nbWords > 1 && 's'}, ils
        vous en faut au moins {CONST.minWordsForText}
      </p>
      <RichTextEditor formState={formState} setFormState={setFormState} />

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
