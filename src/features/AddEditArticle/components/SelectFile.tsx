import type { IFormState } from '../interfaces/IFormState';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

export default function SelectFile({ formState, setFormState }: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      setFormState({ ...formState, imageMain: file });
    }
  }

  return <input type="file" onChange={handleChange} />;
}
