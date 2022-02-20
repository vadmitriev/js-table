export const get = (object, path, defaultValue) => {
  const pathArray = Array.isArray(object) ? path : path.split('.').filter((key) => key);

  const pathArrayFlat = pathArray.flatMap((part) =>
    typeof part === 'string' ? part.split('.') : part
  );

  return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || defaultValue;
};

export const move = (array, oldIndex, newIndex) => {
  const result = [...array];

  const startIndex = oldIndex < 0 ? result.length : oldIndex;

  if (startIndex >= 0 && startIndex < result.length) {
    const endIndex = startIndex < 0 ? result.length + newIndex : newIndex;

    const [item] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, item);
  }

  return result;
};
