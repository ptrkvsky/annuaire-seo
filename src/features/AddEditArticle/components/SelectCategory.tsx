import type { SanityCategory } from '@/interfaces/SanityCategory';
import useError from '../hooks/useError';
import type { IFormState } from '../interfaces/IFormState';

interface Props {
  categories: SanityCategory[];
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

const SelectCategory = ({ formState, categories, setFormState }: Props) => {
  const errorForm = useError(formState);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormState({ ...formState, articleCategory: event.target.value });
  }

  return (
    <p>
      <select value={formState?.articleCategory} onChange={handleChange}>
        <option value="0">Choisir une catégorie</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.title}
          </option>
        ))}
      </select>
      {errorForm?.errorCategory && <span>Veuillez saisir une catégorie</span>}
    </p>
  );
};

export default SelectCategory;
