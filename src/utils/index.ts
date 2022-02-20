export const get = (
  object: Object | null | any,
  path: string,
  defaultValue?: any
): any => {
  const pathArray: any | any[] = Array.isArray(object)
    ? path
    : path.split(".").filter((key) => key);

  const pathArrayFlat = pathArray.flatMap((part: string) =>
    typeof part === "string" ? part.split(".") : part
  );

  return (
    pathArrayFlat.reduce((obj: any, key: string) => obj && obj[key], object) ||
    defaultValue
  );
};

export const move = (
  array: any[],
  oldIndex: number,
  newIndex: number
): any[] => {
  const result = [...array];

  const startIndex = oldIndex < 0 ? result.length : oldIndex;

  if (startIndex >= 0 && startIndex < result.length) {
    const endIndex = startIndex < 0 ? result.length + newIndex : newIndex;

    const [item] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, item);
  }

  return result;
};
