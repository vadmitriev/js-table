const headerWrapper = document.querySelector('.header-wrapper');

export default class Header {
  constructor(title = 'Title') {
    this.title = title.toUpperCase();
    this.render();
  }

  setTitle(title) {
    if (this.title.toUpperCase() === title.toUpperCase()) {
      return;
    }

    this.title = title.toUpperCase();
    this.render();
  }

  render() {
    headerWrapper.innerHTML = `
			<div class="header">
        Top 100
        <span id="title">${this.title}</span> 
        Projects
			</div>
		`;
  }
}
