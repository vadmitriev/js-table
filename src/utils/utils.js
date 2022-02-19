export const get = (object, path, defaultValue) => {
  const pathArray = Array.isArray(object) ? path : path.split('.').filter((key) => key);

  const pathArrayFlat = pathArray.flatMap((part) =>
    typeof part === 'string' ? part.split('.') : part
  );

  return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || defaultValue;
};
