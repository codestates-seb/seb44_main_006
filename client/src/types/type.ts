import { ReactNode } from 'react';

export type MouseEventfunc = (e: React.MouseEvent<HTMLButtonElement>) => void;

export type TextStyleT = {
  size?: string;
  color?: string;
  weight?: number;
};

export type TextareaT = {
  width?: string;
  height?: string;
  size?: string;
  type?: string;
};

export interface Props {
  children: ReactNode;
}

export type IconStyle = {
  iconWidth: number;
  iconHeight: number;
  color?: string;
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
  bgcolor?: string;
  boxShadow?: string;
  border?: string;
  brradius?: string;
  gap?: string;
  isActive?: boolean;
  title?: string;
  onSubmit?: () => void;
  tagname?: string;
  categoryname?: string;
  disabled?: boolean;
  fontsize?: string;
  selectedid?: string | undefined;
  isreset?: boolean;
}

export interface IArgButtonStyle extends IButtonStyle {
  onClick?: (arg0?: string | undefined) => void;
}

export interface IEventButtonStyle extends IButtonStyle {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type LikeBookMarkButtonT = IEventButtonStyle & {
  status?: 'add' | 'del';
  courseId: number;
  className?: string;
};

export type PlacesSearchResult = PlacesSearchResultItem[];

export interface PlacesSearchResultItem {
  id: string;
  place_name: string;
  category_name?: string;
  category_group_code?: `${CategoryCode}` | `${Exclude<CategoryCode, ''>}`[];
  category_group_name: string;
  phone: string;
  address_name?: string;
  road_address_name: string;
  x: string;
  y: string;
  place_url: string;
  distance?: string;
}

export type TScheduleList = IScheduleListItem[];

export interface IScheduleListItem {
  placeName: string; // 장소 이름
  placeUrl: string; // 카카오API place_url,
  roadAddressName: string; // 장소 도로명 주소,, ex) "서울 강남구 테헤란로84길 17"
  id: string; // 카카오API의 장소 고유번호
  phone: string; // 장소 전화번호, ex) "02-558-5476"
  categoryGroupCode:
    | `${CategoryCode}`
    | `${Exclude<CategoryCode, ''>}`[]
    | undefined
    | string; // 카카오API 장소 그룹코드
  categoryGroupName: string; // 카카오API 장소 그룹이름
  x: string; // 경도
  y: string; // 위도
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

export interface ContCardInfo {
  userName?: string;
  title?: string;
  text?: string;
  likeCount?: number;
  thumbnail?: string;
  tag?: string[];
  onClick?: (arg0?: number) => void;
  selectId?: number | null;
  postId?: number;
  courseId?: number;
  children?: ReactNode;
  likeStatus?: boolean;
  bookmarkStatus?: boolean;
  type: 'post' | 'course';
  date?: string;
  isMine?: boolean;
}

export interface LocationCardInfo {
  id: string;
  title?: string;
  category?: string;
  address?: string;
  phone?: string;
  isAction?: boolean;
  onClick?: () => void;
  place_url?: string;
  x: string;
  y: string;
}

export interface MapLocationCardInfo {
  indexNum?: number;
  location?: string;
  latlng?: { lat: string; lng: string };
  id?: string;
  placeId?: string;
  onClick?: ({ id }: { id: string | undefined }) => void;
  type?: 'register';
}

export interface RouteState {
  state?: string | number | undefined;
}

export interface ILatLng {
  lat: string;
  lng: string;
}

export type IdT = {
  markerId: string;
  center: ILatLng;
  scroll?: null | number;
  prevCenter?: ILatLng;
};

export interface ICSearchState {
  radius?: number;
  category?: string;
}
export interface ICourseData {
  courseDday: string;
  courseTitle: string;
  courseContent: string;
  courseThumbnail: string;
}

export interface IScheduleRequest {
  courseData: ICourseData;
  destinationList: TScheduleList;
}
