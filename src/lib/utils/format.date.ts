export const FormatDate = (date: Date | string | undefined) => {
  const formattedDate = new Date(date);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };

  //@ts-ignore
  const formattedString = formattedDate.toLocaleString(undefined, options);
  return formattedString.replace(/\d+:\d+:\d+/, "");
};
