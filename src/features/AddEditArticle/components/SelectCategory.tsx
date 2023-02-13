import type { SanityCategory } from '@/interfaces/SanityCategory';
import type { IFormState } from '../interfaces/IFormState';

interface Props {
  categories: SanityCategory[];
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

const SelectCategory = ({ formState, categories, setFormState }: Props) => {
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormState({ ...formState, articleCategory: event.target.value });
  }

  return (
    <select value={formState?.articleCategory} onChange={handleChange}>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.title}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
