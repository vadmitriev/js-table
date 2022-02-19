import { actions } from 'store';

const spinnerWrapper = document.querySelector('.spinner-wrapper');

export default class Spinner {
  constructor(store) {
    this.store = store;
    this.render();
  }

  hide() {
    // this.store.dispatch(actions.changeLoading(false));
    spinnerWrapper.classList.add('hide');
  }

  show() {
    // this.store.dispatch(actions.changeLoading(true));
    spinnerWrapper.classList.remove('hide');
  }

  render() {
    this.store.substribe(() => {
      const isLoading = this.store.getState().isLoading;
      if (isLoading) {
        this.show();
      } else {
        this.hide();
      }
    });
  }
}
