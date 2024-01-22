export const QueryHandler = (e: string) => {
  const newParams = e.replace(" ", "-").toLocaleLowerCase().trim();

  return newParams;
};
