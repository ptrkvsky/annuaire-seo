import type { IFormArticle } from '@/interfaces/FomArticle';

function postArticle(dataToPost: IFormArticle) {
  return fetch(`/api/save-form`, {
    method: 'POST',
    body: JSON.stringify(dataToPost),
    headers: new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  });
}

export default postArticle;
