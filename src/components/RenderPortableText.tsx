import { PortableText } from '@portabletext/react';

interface Props {
  portableText: any[];
}

const RenderPortableText = ({ portableText }: Props) => {
  return <PortableText value={portableText} />;
};

export default RenderPortableText;
