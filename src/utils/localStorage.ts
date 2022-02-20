export function saveToLocalStorage(key: string, item: any) {
  localStorage.setItem(key, JSON.stringify(item));
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function getFromLocalStorage(key: string): any {
  const item = localStorage.getItem(key);
  if (!item) {
    return null;
  }

  return JSON.parse(item);
}
