import CONST from '@/config/CONST';
import countWord from './countWord';

/**
 * @description check if an html text as enough word - return true if text is > than minLength
 */
export default function checkIsMinLength(
  text: string,
  minLength = CONST.minWordsForText
) {
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, '').trim();
  const isValid = countWord(cleanText) > minLength;
  return isValid;
}
