// eslint-disable-next-line import/no-unresolved
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

  static hide() {
    emptyBlock.classList.add('hide');
  }

  static show() {
    emptyBlock.classList.remove('hide');
  }

  static formLoadContentBlock() {
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

    EmptyBlock.hide();
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

  static inputWrapperHtml() {
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

  static defaultHtml() {
    return `
      <div class="empty-header">
        <div class="emtpy-header__text">
          Тут ничего нет...
        </div>  
        ${EmptyBlock.inputWrapperHtml()}
      </div>
      ${EmptyBlock.formLoadContentBlock()}
    `;
  }

  static errorHtml() {
    return `
      <div class="empty-header">
        <div class="emtpy-header__text">
          Произошла ошибка
        </div>  
        ${EmptyBlock.inputWrapperHtml()}
      </div>
      ${EmptyBlock.formLoadContentBlock()}
    `;
  }

  showError() {
    emptyBlock.innerHTML = EmptyBlock.errorHtml();

    this.addButtonAction();
    EmptyBlock.show();
  }

  render() {
    emptyBlock.innerHTML = this.error ? EmptyBlock.errorHtml() : EmptyBlock.defaultHtml();

    this.addInputAction();

    this.addButtonAction();

    this.store.substribe(() => {
      const { showEmpty } = this.store.getState();
      const { isLoading } = this.store.getState();
      this.error = this.store.getState().error;

      if (isLoading || !showEmpty) {
        EmptyBlock.hide();
        return;
      }

      if (this.error) {
        this.showError();
        return;
      }

      EmptyBlock.show();
    });
  }
}
