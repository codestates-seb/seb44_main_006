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
