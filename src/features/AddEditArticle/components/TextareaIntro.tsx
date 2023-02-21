import type { IFormState } from '../interfaces/IFormState';
import styles from './FormArticle/styles.module.scss';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

export default function TextareaIntro({ formState, setFormState }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newIntro = e.target.value;
    setFormState({ ...formState, intro: newIntro });
  }

  return (
    <textarea
      id="intro"
      className={`${styles.input} ${styles.textArea}`}
      onChange={(e) => handleChange(e)}
      value={formState.intro}
    />
  );
}
