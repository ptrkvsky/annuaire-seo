export default function countWord(text: string) {
  if (text.length === 0) return 0;
  const words = text.split(' ');
  const wordCount = words.length;
  return wordCount;
}
