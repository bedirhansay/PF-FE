export const Truncate = (text: string, maxLength: number) => {
  if (text === undefined) {
    return "Not defined";
  }
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};
