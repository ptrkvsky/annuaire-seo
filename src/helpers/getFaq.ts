import type { FAQItem } from '@interfaces/FAQItem';
import type { FAQPage } from 'schema-dts';

export function getFaq(faqItems: FAQItem[]) {
  const mainEntity = faqItems.map((faqItem) => {
    const item = {
      '@type': 'Question',
      name: faqItem.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqItem.answer,
      },
    };
    return item;
  });

  const faq: FAQPage = {
    '@type': 'FAQPage',
    mainEntity: mainEntity as any,
  };
  return faq;
}
