import { makeDraggable, makeColumnsResizable } from './features';

import { columns } from 'api/fetchAPI';

import { TableHeader } from './tableHeader';
import { Pagination } from './pagination';

import { get } from 'utils';
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
    this.tableData = this.data;

    this.table = table;
    this.render();
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
    const styles = this.store.getState().columnsWidth;

    const makeArrow = (item) => {
      let arrow = '⬍';
      let className = 'arrow';

      const key = this.store.getState().sortBy.key;
      const direction = this.store.getState().sortBy.direction;

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
      let style = '';
      if (styles[item.key]) {
        style = `width: ${styles[item.key]};`;
      }

      return `
	 	    <th id=${item.key} style="${style}">
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
    this.tableData = slice;

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

    if (!th || !arrow) {
      return;
    }

    const id = th.id;

    const up = arrow.classList.contains('up-down') || arrow.classList.contains('up');
    const direction = up ? 'down' : 'up';

    this.store.dispatch(actions.sortData(id, direction));
    this.onSave();
  }

  handleRowDrag(oldIndex, newIndex) {
    console.log('checkDrag', oldIndex, newIndex);

    if (newIndex === oldIndex || newIndex === -1 || oldIndex === -1) {
      return;
    }
    const itemsPerPage = this.store.getState().itemsPerPage;
    let page = this.store.getState().page - 1;

    oldIndex += itemsPerPage * page - 1;
    newIndex += itemsPerPage * page - 1;

    this.store.dispatch(actions.moveRow(oldIndex, newIndex));
    this.onSave();
  }

  handleColumnResize() {
    const cols = table.querySelectorAll('th');
    const styles = {};
    cols.forEach((col) => {
      styles[col.id] = col.style.width;
    });

    this.store.dispatch(actions.columnResize(styles));
    this.onSave();
  }

  makeRowsResizable() {}

  makeColumnsResizable() {
    makeColumnsResizable(this.table, () => this.handleColumnResize());
  }

  makeDraggable() {
    makeDraggable(this.table, (row, newIndex) => this.handleRowDrag(row, newIndex));
  }

  handleFirstPage() {
    const currentPage = this.store.getState().page;
    if (currentPage === 1) {
      return;
    }

    this.onChangePage(1);
  }

  handleLastPage() {
    const pageCount = this.calcPageCount();
    const currentPage = this.store.getState().page;

    if (currentPage === pageCount) {
      return;
    }

    this.onChangePage(pageCount);
  }

  handleChangePage(btn) {
    const page = Number(btn.textContent);
    const currentPage = this.store.getState().page;
    if (Number(page) === currentPage) {
      return;
    }

    this.onChangePage(page);
  }

  onChangePage(page) {
    this.store.dispatch(actions.changePage(page));
    this.onSave();
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
    this.makeRowsResizable();
    this.makeColumnsResizable();
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
