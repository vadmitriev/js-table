import makeDraggable from './features/draggable';
import sortTable from './features/sortable';

import { columns } from 'api/fetchAPI';

import { tableHeader } from './tableHeader';
import { pagination } from './pagination';

const tableWrapper = document.querySelector('.table-wrapper');

export default class Table {
  constructor({ store, onUpdate, onSave, onClear, onChangePage }) {
    this.store = store;

    this.onUpdate = onUpdate;
    this.onClear = onClear;
    this.onChangePage = onChangePage;

    this.data = store.getState().data;
    this.render();
    this.table = null;
  }

  hide() {
    tableWrapper.classList.add('hide');
  }

  show() {
    tableWrapper.classList.remove('hide');
  }

  makeHead() {
    const createHeadRow = (item) => {
      return `
	 	    <th id=${item.key}>
          <span>
            ${item.name}
          </span>
          <span class="arrow up-down">⬍</span>
        </th> 
	    `;
    };

    return columns.map(createHeadRow).join(' ');
  }

  makeBody() {
    const createBodyRow = (item) => {
      const row = columns
        .map((col) => {
          return `<td id="${col.key}">${item[col.key]}</td>`;
        })
        .join(' ');

      return `<tr>${row}</tr>`;
    };

    return this.data.map(createBodyRow).join(' ');
  }

  makeSortable() {}

  makeColumnsResizable() {}

  makeRowsResizable() {}

  makeRowsRemovable() {}

  handleDragEnd(e) {
    console.log('dragEnd', e);
  }

  handleDrop(e) {
    console.log('drop', e);
  }

  handleMouseUp(e) {
    console.log('mouseUp', e.target.parentNode);
  }

  makeDraggable() {
    this.table.addEventListener('mouseup', this.handleMouseUp);

    makeDraggable(this.table);
  }

  handleFirstPage() {
    const currentPage = this.store.getState().page;
    if (currentPage === 1) {
      return;
    }

    this.onChangePage(1);
  }

  handleLastPage() {
    const totalItems = this.store.getState().totalItems;
    const itemsPerPage = this.store.getState().itemsPerPage;
    const pageCount = totalItems / itemsPerPage;
    const currentPage = this.store.getState().page;

    if (currentPage === pageCount - 1) {
      return;
    }

    this.onChangePage(pageCount - 1);
  }

  handleChangePage(btn) {
    const page = Number(btn.textContent);
    const currentPage = this.store.getState().page;
    if (Number(page) === currentPage) {
      return;
    }
    
    this.onChangePage(page);
  }

  bindEvents() {
    this.makeDraggable();
    this.makeSortable();
    this.makeRowsResizable();
    this.makeColumnsResizable();
    this.makeRowsRemovable();

    const clearBtn = tableWrapper.querySelector('#clear');
    const loadBtn = tableWrapper.querySelector('#load');

    clearBtn.addEventListener('click', this.onClear);
    loadBtn.addEventListener('click', this.onUpdate);

    const firstBtn = tableWrapper.querySelector('#first');
    const lastBtn = tableWrapper.querySelector('#last');

    firstBtn.addEventListener('click', (e) => this.handleFirstPage(e.target));
    lastBtn.addEventListener('click', (e) => this.handleLastPage(e.target));

    const pageBtns = tableWrapper.querySelectorAll('#page');
    pageBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleChangePage(e.target));
    });
  }

  renderTable() {
    const currentPage = this.store.getState().page;
    const totalItems = this.store.getState().totalItems;
    const itemsPerPage = this.store.getState().itemsPerPage;
    const pageCount = totalItems / itemsPerPage;

    const html = `
	  	<div class="table-header">${tableHeader()}</div>
      <table class="draggable-table">
		  	<thead>
          ${this.makeHead()}
        </thead>
        <tbody>
          ${this.makeBody()}
        </tbody>
		  </table>
		  <div class="pagination-wrapper">${pagination(currentPage, pageCount)}</div>	
	  `;

    tableWrapper.innerHTML = html;

    this.table = tableWrapper.querySelector('table');

    if (!this.table) {
      this.show();
      return;
    }

    this.bindEvents();

    this.show();
  }

  render() {
    this.store.substribe(() => {
      this.data = this.store.getState().data;

      if (this.data?.length === 0) {
        this.hide();
        return;
      }

      this.renderTable();
    });
  }
}
