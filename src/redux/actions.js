export const types = {
  INIT: 'INIT',
  LOAD_DATA: 'LOAD_DATA',
  LOAD_DATA_SUCCESS: 'LOAD_DATA_SUCCESS',
  LOAD_DATA_ERROR: 'LOAD_DATA_ERROR',
  CLEAR_TABLE: 'CLEAR_TABLE',
  DELETE_ROW: 'DELETE_ROW',
  CHANGE_PAGE: 'CHANGE_PAGE',
  TOGGLE_LOADING: 'TOGGLE_LOADING'
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

  loadDataSuccess: (data) => {
    return {
      type: types.LOAD_DATA_SUCCESS,
      payload: data
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

  toggleLoading: () => {
    return {
      type: types.TOGGLE_LOADING
    };
  }
};

export default actions;
