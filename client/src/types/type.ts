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
