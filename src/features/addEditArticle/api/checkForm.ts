import type { IErrorMessage } from '../interfaces/IErrorMessage';
import checkIsMinLength from '@/utils/checkIsMinLength';

export interface ParamsCheckForm {
  formDataTitle: string;
  formDataArticleCategory: string;
  formDataContent: string;
  file?: Buffer;
}

const MIN_LENGTH_TITLE = 3;

export default function checkForm({
  formDataTitle,
  formDataArticleCategory,
  file,
  formDataContent,
}: ParamsCheckForm) {
  const errorMessage: IErrorMessage = {};

  const isTitleValid = checkIsMinLength(formDataTitle, MIN_LENGTH_TITLE);
  if (!isTitleValid) {
    errorMessage.title = `Il faut ${MIN_LENGTH_TITLE} mots min. pour le titre`;
  }

  if (!formDataArticleCategory) {
    errorMessage.category = `Une catégorie est obligatoire`;
  }

  // const isContentValid = checkIsMinLength(formDataContent as string);
  // if (!isContentValid) {
  //   errorMessage.content = "Le contenu n'est pas assez long";
  // }

  if (Object.keys(errorMessage).length) {
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 400,
    });
  }
}
