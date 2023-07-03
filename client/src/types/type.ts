import { ReactNode } from 'react';

export type TextStyleT = {
  size?: string;
  color?: string;
  weight?: 'Bold' | 'Medium' | 'Light';
};

export interface Props {
  children: ReactNode;
}
