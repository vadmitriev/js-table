export const types = {
  INIT: 'INIT',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  LOAD_DATA_ERROR: 'LOAD_DATA_ERROR',
  CLEAR_TABLE: 'CLEAR_TABLE',
  DELETE_ROW: 'DELETE_ROW',
  CHANGE_PAGE: 'CHANGE_PAGE',
  CHANGE_LOADING: 'CHANGE_LOADING',
  CHANGE_EMPTY: 'CHANGE_EMPTY',
  SORT_DATA: 'SORT_DATA',
  MOVE_ROW: 'MOVE_ROW',
  COLUMN_RESIZE: 'COLUMN_RESIZE',
  ROW_RESIZE: 'ROW_RESIZE'
};

export const actions = {
  init: () => {
    return {
      type: types.INIT
    };
  },

  loadData: () => {
    return {
      type: types.LOAD_DATA
    };
  },

  loadDataSuccess: ({ data, totalItems, itemsPerPage }) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: { data, totalItems, itemsPerPage }
    };
  },

  loadDataError: (error) => {
    return {
      type: types.LOAD_DATA_ERROR,
      payload: error
    };
  },

  clearTable: () => {
    return {
      type: types.CLEAR_TABLE
    };
  },

  deleteRow: (data) => {
    return {
      type: types.DELETE_ROW,
      payload: data
    };
  },

  changePage: (page) => {
    return {
      type: types.CHANGE_PAGE,
      payload: page
    };
  },

  changeLoading: (data) => {
    return {
      type: types.CHANGE_LOADING,
      payload: data
    };
  },

  changeEmpty: (data) => {
    return {
      type: types.CHANGE_EMPTY,
      payload: data
    };
  },

  sortData: (key, direction) => {
    return {
      type: types.SORT_DATA,
      payload: { key, direction }
    };
  },

  moveRow: (startIndex, endIndex) => {
    return {
      type: types.MOVE_ROW,
      payload: { startIndex, endIndex }
    };
  },

  columnResize: (data) => {
    return {
      type: types.COLUMN_RESIZE,
      payload: data
    };
  },

  rowResize: (data) => {
    return {
      type: types.ROW_RESIZE,
      payload: data
    };
  }
};

export default actions;
