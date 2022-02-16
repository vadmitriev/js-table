export function addToLocalStorage(key, item) {
	localStorage.setItem(key, JSON.stringify(item));
};

export function removeFromLocalStorage(key) {
	localStorage.removeItem(key);
};

export function getFromLocalStorage (key) {
	const item = localStorage.getItem(key)
	if (!item) {
		return null
	}

	return JSON.parse(item)
}