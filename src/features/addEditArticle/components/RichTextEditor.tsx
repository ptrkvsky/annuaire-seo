import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import type { IFormState } from '@/features/addEditArticle/interfaces/IFormState';

interface Props {
  formState: IFormState;
  setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

const toolbarOptions = [
  ['link', 'bold', 'italic'],
  [{ header: [2, 3, 4, 5, 6] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
];

const RichTextEditor = ({ formState, setFormState }: Props) => {
  const [value, setValue] = useState(
    formState.content.replace('<p><br></p>', '')
  );

  useEffect(() => {
    setFormState({
      ...formState,
      content: value,
    });
  }, [value]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={{
        toolbar: toolbarOptions,
        clipboard: {
          matchVisual: false,
        },
      }}
    />
  );
};

export default RichTextEditor;
