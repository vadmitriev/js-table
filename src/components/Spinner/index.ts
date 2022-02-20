import { Store } from "constants/types";

const spinnerWrapper = document.querySelector(".spinner-wrapper");

export default class Spinner {
  store: Store;

  constructor(store: Store) {
    this.store = store;
    this.render();
  }

  hide() {
    spinnerWrapper.classList.add("hide");
  }

  show() {
    spinnerWrapper.classList.remove("hide");
  }

  render() {
    this.store.substribe(() => {
      const isLoading = this.store.getState().isLoading;
      const fn = isLoading ? this.show : this.hide;
      fn();
    });
  }
}
