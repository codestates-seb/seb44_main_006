import { ReactNode } from 'react';

export type TextStyleT = {
  size?: string;
  color?: string;
  weight?: number;
};

export type TextareaT = {
  width?: string;
  height?: string;
  size?: string;
};

export interface Props {
  children: ReactNode;
}

export type IconStyle = {
  width: number;
  height: number;
  color: string;
};

export interface IButtonStyle {
  children?: ReactNode;
  width?: string;
  height?: string;
  svgWidth?: string;
  svgHeight?: string;
  padding?: string;
  margin?: string;
  color?: string;
  backgroundColor?: string;
  boxShadow?: string;
  border?: string;
  borderRadius?: string;
  gap?: string;
  isActive?: boolean;
  title?: string;
  onClick?: () => void;
  onSubmit?: () => void;
}

export type MarkerT = {
  markerId: number | null;
};

export type PlacesSearchResult = PlacesSearchResultItem[];

export interface PlacesSearchResultItem {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code?: `${CategoryCode}` | `${Exclude<CategoryCode, ''>}`[];
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance: string;
}

export enum CategoryCode {
  BLANK = '',
  MT1 = 'MT1',
  CS2 = 'CS2',
  PS3 = 'PS3',
  SC4 = 'SC4',
  AC5 = 'AC5',
  PK6 = 'PK6',
  OL7 = 'OL7',
  SW8 = 'SW8',
  BK9 = 'BK9',
  CT1 = 'CT1',
  AG2 = 'AG2',
  PO3 = 'PO3',
  AT4 = 'AT4',
  AD5 = 'AD5',
  FD6 = 'FD6',
  CE7 = 'CE7',
  HP8 = 'HP8',
  PM9 = 'PM9',
}

export interface Pagination {
  nextPage(): void;
  prevPage(): void;
  gotoPage(page: number): void;
  gotoFirst(): void;
  gotoLast(): void;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  current: number;
  first: number;
  last: number;
}
