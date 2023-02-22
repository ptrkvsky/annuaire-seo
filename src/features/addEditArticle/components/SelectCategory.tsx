import type { SanityCategory } from '@/interfaces/SanityCategory';
import useError from '../hooks/useError';
import type { IFormState } from '../interfaces/IFormState';
import styles from './FormArticle/styles.module.scss';

interface Props {
  categories: SanityCategory[];
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

interface IOption {
  label: string;
  value: string;
  children?: IOption[];
}

function createOptions(categories: SanityCategory[]) {
  const roots = categories.filter((category) => !category.parent); // top-level categories

  const createNode: any = (category: SanityCategory) => {
    const children = categories.filter((c) => c.parent?._ref === category._id);
    if (children.length === 0) {
      const option = {
        label: category.title,
        value: category._id,
      };
      return option;
    } else {
      const option = {
        label: category.title,
        children: children.map((child) => createNode(child)),
      };
      return option;
    }
  };

  return roots.map((root) => createNode(root));
}

const SelectCategory = ({ formState, categories, setFormState }: Props) => {
  const errorForm = useError(formState);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setFormState({ ...formState, articleCategory: event.target.value });
  }

  const options: IOption[] = createOptions(categories);
  const sortedOptions = sortOptionsByLabel(options);

  return (
    <div className={styles.wrapper}>
      <label htmlFor="categorie">
        Catégorie
        <select
          id="categorie"
          value={formState?.articleCategory}
          onChange={handleChange}
          className={`${styles.input} ${styles.mini}`}
        >
          <option value="0">Choisir une catégorie</option>
          {sortedOptions.map((option) => {
            if (!option.children) {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            }
            return option.children.map((subOption) => (
              <option key={subOption.value} value={subOption.value}>
                {option.label} - {subOption.label}
              </option>
            ));
          })}
        </select>
        {errorForm?.errorCategory && (
          <span className={styles.error}>Veuillez saisir une catégorie</span>
        )}
      </label>
    </div>
  );
};

export default SelectCategory;

function sortOptionsByLabel(array: IOption[]) {
  array.sort(function (a, b) {
    if (a.label < b.label) {
      return -1;
    }
    if (a.label > b.label) {
      return 1;
    }
    return 0;
  });
  for (var i = 0; i < array.length; i++) {
    const children = array[i].children;
    if (children) {
      sortOptionsByLabel(children);
    }
  }
  return array;
}
