/* eslint-disable no-new */
import { fetchData } from 'api/fetchAPI';
import { saveToLocalStorage, getFromLocalStorage } from 'utils/localStorage.js';
import { LS_KEY } from 'utils/constants';

import { actions, reducer, initialState, createStore } from 'store';

import Header from 'components/Header';
import Table from 'components/Table';
import EmptyBlock from 'components/EmptyBlock';
import Spinner from 'components/Spinner';

import './styles/style.css';

const lsData = getFromLocalStorage(LS_KEY);

const prevState = lsData || initialState;
const store = createStore(reducer, prevState);

const header = new Header();

const saveData = async () => {
  const state = store.getState();
  saveToLocalStorage(LS_KEY, state);
};

const clearTable = () => {
  store.dispatch(actions.setTitle(''));
  header.setTitle('');

  store.dispatch(actions.changeEmpty(true));
  store.dispatch(actions.clearTable());
};

const loadData = async () => {
  store.dispatch(actions.changeEmpty(false));
  store.dispatch(actions.loadData());

  try {
    const { title } = store.getState();
    header.setTitle(title);

    const res = await fetchData(title);

    store.dispatch(actions.loadDataSuccess(res));

    if (res?.data?.length === 0) {
      clearTable();
    }

    await saveData();
  } catch (e) {
    store.dispatch(actions.loadDataError(e));
    store.dispatch(actions.changeEmpty(true));
  }
};

const updateData = async () => {
  store.dispatch(actions.clearTable());
  await loadData();
};

const renderPage = async () => {
  const { data } = store.getState();
  if (data?.length === 0) {
    await loadData();
  }

  const { title } = store.getState();
  header.setTitle(title);

  new Table({
    store,
    onUpdate: updateData,
    onClear: clearTable,
    onSave: saveData
  });

  new EmptyBlock(store, loadData);

  new Spinner(store);
};

renderPage();

store.dispatch(actions.init());
