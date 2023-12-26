export const StringToArray = (data: string[]) => {
  const itemList = data
    ?.toString()
    .split(",")
    .map((item) => item.trim());
  return itemList;
};

export const ArrayToString = (data: string[]) => {
  const concatenatedString = data?.join(", ");
  return concatenatedString;
};
