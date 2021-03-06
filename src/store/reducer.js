import { get, move } from 'utils';
import { types } from './actions';

export const initialState = {
  title: 'JavaScript',
  isLoading: false,
  error: null,
  data: [],
  page: 1,
  columnsWidth: null,
  rowsHeight: null,
  showEmpty: false,
  totalItems: null,
  itemsPerPage: 10,
  sortBy: {
    key: null,
    direction: null
  }
};

export function reducer(state = initialState, action = {}) {
  let newData;

  switch (action.type) {
    case types.SET_TITLE:
      return {
        ...state,
        title: action.payload
      };
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
        page: initialState.page,
        sortBy: initialState.sortBy
      };
    case types.DELETE_ROW:
      newData = state.data.filter((row) => row.id !== action.payload);
      return {
        ...state,
        data: newData,
        totalItems: newData.length
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
    case types.SORT_DATA:
      // eslint-disable-next-line no-case-declarations
      const { key, direction } = action.payload;

      if (direction) {
        newData = state.data.sort((a, b) => {
          if (get(a, key) < get(b, key)) {
            return direction === 'up' ? -1 : 1;
          }

          if (get(a, key) > get(b, key)) {
            return direction === 'down' ? -1 : 1;
          }

          return 0;
        });
      } else {
        newData = initialState.data;
      }

      return {
        ...state,
        sortBy: {
          key,
          direction
        },
        data: newData
      };
    case types.MOVE_ROW:
      newData = move(state.data, action.payload.startIndex, action.payload.endIndex);
      return {
        ...state,
        data: newData
      };
    case types.COLUMN_RESIZE:
      return {
        ...state,
        columnsWidth: action.payload
      };
    case types.ROW_RESIZE:
      return {
        ...state,
        rowsHeight: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
