import type { IFormState } from './../interfaces/IFormState';
import type { IErrorForm } from './../interfaces/IErrorForm';
import { useState, useEffect } from 'react';
import checkError from '../functions/checkError';

const useError = (formState: IFormState) => {
  const [error, setError] = useState<IErrorForm>();
  const errorChecked = checkError(formState);

  useEffect(() => {
    setError(errorChecked);
  }, [formState]);

  return error;
};

export default useError;
