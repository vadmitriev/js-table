export const get = (object, path, defaultValue) => {
  const pathArray = Array.isArray(object) ? path : path.split('.').filter((key) => key);

  const pathArrayFlat = pathArray.flatMap((part) =>
    typeof part === 'string' ? part.split('.') : part
  );

  return pathArrayFlat.reduce((obj, key) => obj && obj[key], object) || defaultValue;
};

export const move = (array, oldIndex, newIndex) => {
  if (newIndex >= array.length) {
    newIndex = array.length - 1;
  }
  array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
  return array;
};
