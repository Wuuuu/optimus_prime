import { CSSProperties } from 'react';

export interface ToolBarEditState {
  componentData: componentDataProps[];
  isClickComponent: boolean;
<<<<<<< HEAD
  curComponent: componentDataProps | null;
=======
  curComponent: componentDataProps;
>>>>>>> eb811d80603b5fa5cd6aa1cdaa92293efb9f7a9c
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
<<<<<<< HEAD
  uuid?: string; 
=======
>>>>>>> eb811d80603b5fa5cd6aa1cdaa92293efb9f7a9c
}
