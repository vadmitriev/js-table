/* eslint-disable no-param-reassign */

import { columns } from 'api/fetchAPI';
import { get } from 'utils';
import { actions } from 'store';
import { makeColumnsResizable, makeDraggable, makeRowsResizable } from './features';

import TableHeader from './tableHeader';
import Pagination from './pagination';

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

    this.table = table;
    this.render();
  }

  static hide() {
    tableWrapper.classList.add('hide');
  }

  static show() {
    tableWrapper.classList.remove('hide');
  }

  handleUpdate(input) {
    if (!input) {
      input = tableHeader.querySelector('input');
    }

    const title = input.value;
    if (title.trim() === '') return;

    this.store.dispatch(actions.setTitle(title));

    input.value = '';

    this.onUpdate();
  }

  handleClear() {
    const input = tableHeader.querySelector('input');
    input.value = '';

    this.onClear();
  }

  calcPageCount() {
    const { totalItems } = this.store.getState();
    const { itemsPerPage } = this.store.getState();
    return Math.ceil(totalItems / itemsPerPage);
  }

  makeHead() {
    const styles = this.store.getState().columnsWidth;

    const makeArrow = (item) => {
      let arrow = '⬍';
      let className = 'arrow';

      const { key } = this.store.getState().sortBy;
      const { direction } = this.store.getState().sortBy;

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
      if (styles && styles[item.key]) {
        style = `width: ${styles[item.key]};`;
      }

      return `
	 	    <th id="${item.key}" style="${style}">
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

    return columns.map(createHeadRow).join(' ') + createDeleteAction();
  }

  makeBody() {
    const styles = this.store.getState().rowsHeight;

    const createBodyRow = (item, index) => {
      const deleteBtnHtml = `
        <td id="delete">
          <button class="btn-small danger">
            X
          </button>
        </td>
      `;

      const getValue = (col) => {
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
                ${getValue(col)}
              </td>
            `;
          })
          .join(' ') + deleteBtnHtml;

      let style = '';
      if (styles && styles[index]) {
        style = `height: ${styles[index]};`;
      }
      return `
        <tr id="${item.id}" style="${style}">
          ${row}
        </tr>
      `;
    };

    const currentPage = this.store.getState().page;
    const { itemsPerPage } = this.store.getState();

    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const slice = this.data.slice(start, end);

    return slice.map(createBodyRow).join(' ');
  }

  makeHeader() {
    tableHeader.innerHTML = TableHeader();

    const input = tableHeader.querySelector('input');

    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.handleUpdate(input);
      }
    });

    const clearBtn = tableHeader.querySelector('#clear');
    const loadBtn = tableHeader.querySelector('#load');

    clearBtn.addEventListener('click', () => this.handleClear());
    loadBtn.addEventListener('click', () => this.handleUpdate());
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

    const { id } = th;

    const up = arrow.classList.contains('up-down') || arrow.classList.contains('up');
    const direction = up ? 'down' : 'up';

    this.store.dispatch(actions.sortData(id, direction));
    this.onSave();
  }

  handleRowDrag(oldIndex, newIndex) {
    if (newIndex === oldIndex || newIndex === -1 || oldIndex === -1) {
      return;
    }
    const { itemsPerPage } = this.store.getState();
    const page = this.store.getState().page - 1;

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

  handleRowResize() {
    const body = this.table.querySelector('tbody');
    const rows = body.querySelectorAll('tr');
    const styles = {};
    rows.forEach((row, index) => {
      styles[index] = row.style.height;
    });

    this.store.dispatch(actions.rowResize(styles));
    this.onSave();
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

    makeDraggable(this.table, (row, newIndex) => this.handleRowDrag(row, newIndex));
    makeRowsResizable(this.table, () => this.handleRowResize());
    makeColumnsResizable(this.table, () => this.handleColumnResize());
  }

  renderTable() {
    table.innerHTML = `
      <thead>
        ${this.makeHead()}
      </thead>
      <tbody>
        ${this.makeBody()}
      </tbody>		  
	  `;

    if (!this.table) {
      Table.show();
      return;
    }

    this.makePagination();

    this.bindEvents();

    Table.show();
  }

  render() {
    this.makeHeader();
    this.makePagination();

    this.store.substribe(() => {
      this.data = this.store.getState().data;

      if (this.data?.length === 0) {
        Table.hide();
        return;
      }

      this.renderTable();
    });
  }
}
