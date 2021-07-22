export interface ToolBarEditState {
  componentData: componentDataProps[];
}


export interface componentDataProps{
    complexid: string,
    component: string, 
    path: string, 
    label: string, 
    propValue: any,
    style: object,
}