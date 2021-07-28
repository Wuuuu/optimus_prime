import { CSSProperties } from 'react';

export interface ToolBarEditState {
  componentData: componentDataProps[];
  isClickComponent: boolean;
  curComponent: componentDataProps | null;
  curComponentIndex: object | null;
}

export interface componentDataProps {
  complexid: string;
  component: string;
  path: string;
  label: string;
  propValue: any;
  style: CSSProperties;
  index?: string | number;
  uuid?: string; 
}
