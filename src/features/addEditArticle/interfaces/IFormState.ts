export interface IFormState {
  articleId: string | undefined;
  title: string;
  metaTitle: string;
  metaDesc: string;
  articleCategory: string;
  content: string;
  intro: string;
  imageMain?: File;
}
