const headerWrapper = document.querySelector('.header-wrapper');

export default class Header {
  constructor(title = 'Заголовок') {
    this.title = title;
    this.render();
  }

  render() {
    headerWrapper.innerHTML = `
			<div class="header">
				${this.title}
			</div>
		`;
  }
}
