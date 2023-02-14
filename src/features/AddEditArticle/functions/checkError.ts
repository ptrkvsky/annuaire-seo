import type { IErrorForm } from '../interfaces/IErrorForm';
import type { IFormState } from '../interfaces/IFormState';

export default function checkError(formState: IFormState) {
  const error: IErrorForm = {};
  if (!formState.articleCategory || formState.articleCategory === '0') {
    error.errorCategory = 'Vous devez sélectionner une catégorie';
  }
  return error;
}
