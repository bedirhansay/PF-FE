export const FormatDate = (date: string | Date | undefined) => {
  if (!date) {
    return ""; // Eğer date undefined ise boş bir string döndür
  }

  const formattedDate = new Date(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //@ts-ignore
  const turkishDate = new Intl.DateTimeFormat("tr-TR", options).format(
    formattedDate
  );

  return turkishDate;
};
