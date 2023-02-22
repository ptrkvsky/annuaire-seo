import type { IFormState } from '../interfaces/IFormState';
import styles from './FormArticle/styles.module.scss';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

export default function TextareaMetadesc({ formState, setFormState }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newMetaDesc = e.target.value;
    setFormState({ ...formState, metaDesc: newMetaDesc });
  }

  return (
    <textarea
      id="metaDesc"
      className={`${styles.input} ${styles.textArea}`}
      onChange={(e) => handleChange(e)}
      value={formState.metaDesc}
      rows={4}
      cols={40}
    />
  );
}
