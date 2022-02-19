import { actions } from 'store/actions';

const emptyBlock = document.querySelector('.empty');

export default class EmptyBlock {
  constructor(store, onClick) {
    this.store = store;
    this.onClick = onClick;
    this.error = store.getState().error;
    this.render();
  }

  hide() {
    emptyBlock.classList.add('hide');
  }

  show() {
    emptyBlock.classList.remove('hide');
  }

  formLoadContentBlock() {
    return `
      <div class="empty__load-content">
        <button id="load" class="btn-medium">
          Загрузить данные
        </button>
      </div>
    `;
  }

  addButtonAction() {
    const button = emptyBlock.querySelector('#load');
    button.addEventListener('click', () => {
      this.hide();
      this.onClick();
    });
  }

  defaultHtml() {
    const html = `
      <div class="empty__header">
        Тут ничего нет...
      </div>
      ${this.formLoadContentBlock()}
    `;

    return html;
  }

  errorHtml() {
    const html = `
      <div class="empty__header">
        Произошла ошибка
      </div>
      ${this.formLoadContentBlock()}
    `;

    return html;
  }

  showError() {
    emptyBlock.innerHTML = this.errorHtml();
    this.addButtonAction();
    this.show();
  }

  render() {
    const html = this.error ? this.errorHtml() : this.defaultHtml();
    emptyBlock.innerHTML = html;

    this.addButtonAction();

    this.store.substribe(() => {
      const showEmpty = this.store.getState().showEmpty;
      const isLoading = this.store.getState().isLoading;
      this.error = this.store.getState().error;

      if (isLoading || !showEmpty) {
        this.hide();
        return;
      }

      if (this.error) {
        this.showError();
        return;
      }

      this.show();
    });
  }
}
