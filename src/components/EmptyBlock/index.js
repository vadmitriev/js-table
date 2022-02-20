import { actions } from 'store';

const emptyBlock = document.querySelector('.empty');

export default class EmptyBlock {
  constructor(store, onClick) {
    this.store = store;
    this.onClick = onClick;
    this.error = store.getState().error;

    this.input = null;

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

  handleLoad() {
    const title = this.input.value;

    if (title.trim() === '') return;
    this.store.dispatch(actions.setTitle(title));

    this.input.value = '';

    this.hide();
    this.onClick();
  }

  addButtonAction() {
    const button = emptyBlock.querySelector('#load');
    button.addEventListener('click', () => this.handleLoad());
  }

  addInputAction() {
    this.input = emptyBlock.querySelector('input');
    this.input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.handleLoad();
      }
    });
  }

  inputWrapperHtml() {
    return `
      <div class="empty-header__input-wrapper">
        <input 
          type="text" 
          class="empty-input" 
          placeholder="Поиск"
        >
        <span class="focus-border"></span>
      </div>
    `;
  }

  defaultHtml() {
    const html = `
      <div class="empty-header">
        <div class="emtpy-header__text">
          Тут ничего нет...
        </div>  
        ${this.inputWrapperHtml()}
      </div>
      ${this.formLoadContentBlock()}
    `;

    return html;
  }

  errorHtml() {
    const html = `
      <div class="empty-header">
        <div class="emtpy-header__text">
          Произошла ошибка
        </div>  
        ${this.inputWrapperHtml()}
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

    this.addInputAction();

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
