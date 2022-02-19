import { types, actions } from './actions';

export const initialState = {
  isLoading: false,
  error: null,
  data: [],
  page: 1,
  columnsWidth: null,
  rowsHeight: null,
  showEmpty: false,
  totalItems: null,
  itemsPerPage: null
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_DATA:
      return {
        ...state,
        isLoading: true
      };
    case types.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        itemsPerPage: action.payload.itemsPerPage,
        totalItems: action.payload.totalItems
      };
    case types.LOAD_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case types.CLEAR_TABLE:
      return {
        ...state,
        data: initialState.data,
        page: initialState.page
      };
    case types.DELETE_ROW:
      const newData = state.data.filter((row) => row.id !== action.payload.id);
      return {
        ...state,
        data: newData
      };
    case types.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      };
    case types.CHANGE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.CHANGE_EMPTY:
      return {
        ...state,
        showEmpty: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
