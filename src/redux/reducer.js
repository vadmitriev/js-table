import { types, actions } from './actions';

export const initialState = {
  isLoading: false,
  error: null,
  data: [],
  page: 1,
  columnsWidth: null,
  rowsHeight: null
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
        data: action.payload
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
        data: []
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
    case types.TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading
      };
    default:
      return state;
  }
}

export default reducer;
