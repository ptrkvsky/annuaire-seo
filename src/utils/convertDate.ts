export default function convertDate(date: string) {
  const dateIso = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = dateIso.toLocaleDateString('fr-FR', options);
  return formattedDate;
}
