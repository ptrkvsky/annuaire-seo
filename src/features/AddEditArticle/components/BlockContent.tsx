import type { IFormState } from '../interfaces/IFormState';
import RichTextEditor from './RichTextEditor';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

function BlockContent({ formState, setFormState }: Props) {
  const cleanText = formState.content.replace(/<\/?[^>]+(>|$)/g, '').trim();
  const contentLength = cleanText.length;

  return (
    <div>
      <label>longueur : {contentLength}</label>
      <RichTextEditor formState={formState} setFormState={setFormState} />
    </div>
  );
}

export default BlockContent;
