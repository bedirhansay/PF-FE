export const Truncate = (
  text: string,
  maxLength: number,
  indicator = "..."
) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + indicator;
  }
};
