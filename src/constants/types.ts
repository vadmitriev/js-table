export interface Store {
  dispatch: (arg0: any) => void;
  getState: () => State;
  substribe: (arg0: any) => void;
}

export enum Direction {
  up = "up",
  down = "down",
}

export interface State {
  title: string;
  isLoading: boolean;
  error: any;
  data: any[];
  page: number;
  columnsWidth: any[];
  rowsHeight: any[];
  showEmpty: boolean;
  totalItems: null | number;
  itemsPerPage: number;
  sortBy: {
    key: string;
    direction: Direction;
  };
}

export type Api = {
  data: any[];
  totalItems: number;
  itemsPerPage?: number;
};

export interface ItemProps {}

export interface ColumnProps {
  name: string;
  key: string;
  link_key?: string;
}

export interface ActionProps {
  type: string;
  payload?: any;
}
