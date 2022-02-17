// import App from './app.js';
// import { notReact } from './notReact';

// const render = () => {
//   const root = document.createElement('root');
//   notReact.init(root, App);
// };

// window.addEventListener('DOMContentLoaded', () => render());

// const root = document.getElementById('root');

// const wrapper = document.createElement('div');
// wrapper.className = 'content-wrapper';
// root.appendChild(wrapper);

// wrapper.innerHTML = '<div class="content-wrapper">test</div>';

// const button = document.createElement('button');
// wrapper.appendChild(button);
// button.addEventListener('click', () => {
//   store.dispatch(actions.LOAD_DATA);
// });

import { fetchData, columns } from './api/fetchAPI';
import { saveToLocalStorage, getFromLocalStorage } from './utils/utils.js';
import { LS_KEY } from './utils/constants';
import createDraggable from './utils/table/draggable';
import sortTable from './utils/table/sortable';

// import { actions, reducer, initialState, createStore } from './redux';
import { createStore } from './redux/createStore';
import { actions } from './redux/actions';
import { reducer, initialState } from './redux/reducer';

import './styles/style.css';

const lsData = getFromLocalStorage(LS_KEY);

const prevState = lsData ? lsData : initialState;
const store = createStore(reducer, prevState);

const root = document.getElementById('root');

const wrapper = document.createElement('div');
wrapper.className = 'content-wrapper';
root.appendChild(wrapper);

const spinnerWrapper = document.createElement('div');
spinnerWrapper.className = 'spinner-wrapper';

const spinner = document.createElement('div');
spinner.className = 'spinner';

spinnerWrapper.appendChild(spinner);
root.appendChild(spinnerWrapper);

let emptyBlock = null;

const showEmptyPage = () => {
  if (!emptyBlock) {
    emptyBlock = document.createElement('div');
    emptyBlock.className = 'empty';
    emptyBlock.innerHTML = `
    <div class="empty__header">
      Тут ничего нет...
    </div>
    <div class="emtpy__load-content">
      <button id="load" class="btn-medium">
        Загрузить данные
      </button>
    </div>
  `;
    wrapper.appendChild(emptyBlock);
  }

  const btn = document.getElementById('load');
  btn.addEventListener('click', () => {
    emptyBlock.classList.toggle('hide');
    // emptyBlock.style.visibility = 'hidden';
    store.dispatch(actions.loadData());
  });
};

store.substribe(() => {
  const state = store.getState();

  const isLoading = state.isLoading;
  if (isLoading) {
    spinner.classList.remove('hide');
  } else {
    spinner.classList.add('hide');
  }

  const data = state.data;
  if (data.length > 0) {
    console.log('data', data);
  } else {
    showEmptyPage();
  }
});

store.dispatch(actions.init());

// let page = 0;
// let data = [];

// const showSpinner = () => {
//   spinnerWrapper.style.display = 'flex';
// };

// const hideSpinner = () => {
//   spinnerWrapper.style.display = 'none';
// };

// const handleSortTable = (e) => {
//   sortTable(e, table);
// };

// const handleDragTable = () => {
//   // TODO
// };

// const handleResizeColumn = () => {
//   // TODO
// };

// const handleResizeRow = () => {
//   // TODO
// };

// const handleDeleteRow = () => {
//   // TODO
// };

// const showHeader = () => {
//   // TODO
// };

// const showTable = (tableData) => {
//   const table = document.createElement('table');
//   table.className = 'draggable-table';

//   const createHeadRow = (item) => {
//     return `
//       <th id=${item.key}>
//         <span>
//           ${item.name}
//         </span>
//         <span class="arrow up-down">⬍</span>
// 		  </th>
//     `;
//   };

//   const head = `
// 	  <thead class="header">
//       ${columns.map(createHeadRow).join(' ')}
// 	  </thead>
//   `;

//   const createRow = (item) => {
//     const row = columns
//       .map((col) => {
//         return `<td>${item[col.key]}</td>`;
//       })
//       .join(' ');

//     return `<tr>${row}</tr>`;
//   };

//   const body = `
//   	<tbody>
// 	    ${tableData.map((item) => createRow(item)).join(' ')}
//   	</tbody>
//   `;

//   const html = head + body;

//   table.innerHTML = html;
//   wrapper.appendChild(table);

//   table.addEventListener('click', handleSortTable);
//   createDraggable(table);

//   // console.log('drag');
// };

// const buildPage = () => {
//   if (!data.length) {
//     showEmptyPage();
//     return;
//   }

//   showHeader();
//   showTable(data);
//   saveToLocalStorage(LS_KEY, data);
// };

// const createPage = () => {
//   showSpinner();

//   if (prevData) {
//     data = prevData;
//     buildPage();
//   } else {
//     fetchData().then((res) => {
//       data = res.results;
//       buildPage();
//     });
//   }

//   hideSpinner();
// };

// createPage();
//window.addEventListener('load', createPage);
