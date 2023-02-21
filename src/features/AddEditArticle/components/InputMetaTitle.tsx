import type { IFormState } from '../interfaces/IFormState';
import styles from './FormArticle/styles.module.scss';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

export default function InputMetaTitle({ formState, setFormState }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newMetaTitle = e.target.value;
    setFormState({ ...formState, metaTitle: newMetaTitle });
  }

  return (
    <input
      id="metaTitle"
      className={styles.input}
      type="text"
      onChange={(e) => handleChange(e)}
      value={formState.metaTitle}
    />
  );
}
