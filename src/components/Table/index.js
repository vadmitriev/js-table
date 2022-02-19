import makeDraggable from './features/draggable';
import sortTable from './features/sortable';

import { columns } from 'api/fetchAPI';

import { TableHeader } from './tableHeader';
import { Pagination } from './pagination';

import { get } from 'utils/utils';
import { actions } from 'store';

const tableWrapper = document.querySelector('.table-wrapper');
const tableHeader = tableWrapper.querySelector('.table-header');
const pagination = tableWrapper.querySelector('.pagination-wrapper');
const table = tableWrapper.querySelector('table');

export default class Table {
  constructor({ store, onUpdate, onSave, onClear }) {
    this.store = store;

    this.onUpdate = onUpdate;
    this.onClear = onClear;
    this.onSave = onSave;

    this.data = store.getState().data;
    this.render();
    this.table = table;
  }

  hide() {
    tableWrapper.classList.add('hide');
  }

  show() {
    tableWrapper.classList.remove('hide');
  }

  calcPageCount() {
    const totalItems = this.store.getState().totalItems;
    const itemsPerPage = this.store.getState().itemsPerPage;
    return Math.ceil(totalItems / itemsPerPage);
  }

  makeHead() {
    const makeArrow = (item) => {
      let arrow = '⬍';
      let className = 'arrow';

      const state = this.store.getState();

      const key = this.store.getState().sortBy.key;
      const direction = this.store.getState().sortBy.direction;
      // <span class="arrow up-down">⬍</span>
      if (item.key === key && direction) {
        if (direction === 'up') {
          className += ' up';
          arrow = '▲';
        } else {
          className += ' down';
          arrow = '▼';
        }
      } else {
        className += 'up-down';
      }

      return `
        <span class="${className}">${arrow}</span>
      `;
    };

    const createHeadRow = (item) => {
      return `
	 	    <th id=${item.key}>
          <span>
            ${item.name}
          </span>
          ${makeArrow(item)}
        </th> 
	    `;
    };

    const createDeleteAction = () => {
      return `
        <th id="delete">
          ❌ Delete
        </th>
      `;
    };

    const html = columns.map(createHeadRow).join(' ') + createDeleteAction();

    return html;
  }

  makeBody() {
    const createBodyRow = (item) => {
      const deleteBtnHtml = `
        <td id="delete">
          <button class="btn-small danger">
            X
          </button>
        </td>
      `;

      const getValue = (item, col) => {
        if (col.link_key) {
          return `
            <a href="${get(item, col.link_key, '')}" target="_blank">
              ${get(item, col.key, '-')}
            </a>
          `;
        }
        return get(item, col.key, '-');
      };

      const row =
        columns
          .map((col) => {
            return `
              <td id="${col.key}">
                ${getValue(item, col)}
              </td>
            `;
          })
          .join(' ') + deleteBtnHtml;

      return `<tr id="${item.id}">${row}</tr>`;
    };

    const currentPage = this.store.getState().page;
    const itemsPerPage = this.store.getState().itemsPerPage;

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const slice = this.data.slice(start, end);
    const html = slice.map(createBodyRow).join(' ');

    return html;
  }

  makeHeader() {
    tableHeader.innerHTML = TableHeader();

    const clearBtn = tableHeader.querySelector('#clear');
    const loadBtn = tableHeader.querySelector('#load');

    clearBtn.addEventListener('click', this.onClear);
    loadBtn.addEventListener('click', this.onUpdate);
  }

  makePagination() {
    const currentPage = this.store.getState().page;
    const pageCount = this.calcPageCount();

    const prevHtml = pagination.innerHTML;
    const newHtml = Pagination(currentPage, pageCount);

    if (prevHtml.toLowerCase() === newHtml.toLowerCase()) {
      return;
    }

    pagination.innerHTML = newHtml;

    const firstBtn = pagination.querySelector('#first');
    const lastBtn = pagination.querySelector('#last');

    firstBtn.addEventListener('click', (e) => this.handleFirstPage(e.target));
    lastBtn.addEventListener('click', (e) => this.handleLastPage(e.target));

    const pageBtns = tableWrapper.querySelectorAll('#page');
    pageBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleChangePage(e.target));
    });
  }

  makeSortable() {}

  makeColumnsResizable() {}

  makeRowsResizable() {}

  makeRowsRemovable() {}

  handleSort(el) {
    let th;
    let arrow;

    const elType = el.tagName.toLowerCase();
    if (elType === 'span') {
      th = el.closest('th');
      arrow = el;
    }
    if (elType === 'th') {
      th = el;
      arrow = el.querySelector('.arrow');
    }

    const id = th.id;

    const up = arrow.classList.contains('up-down') || arrow.classList.contains('up');
    const direction = up ? 'down' : 'up';

    this.store.dispatch(actions.sortData(id, direction));
    this.onSave();
  }

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

    this.handleChangePage(1);
  }

  handleLastPage() {
    const pageCount = this.calcPageCount();
    const currentPage = this.store.getState().page;

    if (currentPage === pageCount) {
      return;
    }

    this.handleChangePage(pageCount);
  }

  handleChangePage(btn) {
    const page = Number(btn.textContent);
    const currentPage = this.store.getState().page;
    if (Number(page) === currentPage) {
      return;
    }

    this.store.dispatch(actions.changePage(page));
  }

  handleDelete(btn) {
    const row = btn.parentElement.parentElement;
    row.remove();
    const id = Number(row.id);
    this.store.dispatch(actions.deleteRow(id));
    this.onSave();
  }

  bindEvents() {
    const thArray = tableWrapper.querySelectorAll('th');
    thArray.forEach((th) => {
      th.addEventListener('click', (e) => this.handleSort(e.target));
    });

    const pageBtns = tableWrapper.querySelectorAll('#delete');
    pageBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleDelete(e.target));
    });

    this.makeDraggable();
    this.makeSortable();
    this.makeRowsResizable();
    this.makeColumnsResizable();
    this.makeRowsRemovable();
  }

  renderTable() {
    const html = `
      <thead>
        ${this.makeHead()}
      </thead>
      <tbody>
        ${this.makeBody()}
      </tbody>		  
	  `;

    table.classList.add('draggable-table');
    table.innerHTML = html;

    if (!this.table) {
      this.show();
      return;
    }

    this.makePagination();

    this.bindEvents();

    this.show();
  }

  render() {
    this.makeHeader();
    this.makePagination();

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
