const spinnerWrapper = document.querySelector('.spinner-wrapper');

export default class Spinner {
  constructor(store) {
    this.store = store;
    this.render();
  }

  static hide() {
    spinnerWrapper.classList.add('hide');
  }

  static show() {
    spinnerWrapper.classList.remove('hide');
  }

  render() {
    this.store.substribe(() => {
      const { isLoading } = this.store.getState();
      const fn = isLoading ? Spinner.show : Spinner.hide;
      fn();
    });
  }
}
