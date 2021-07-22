
export const commonStyle = {
  rotate: 0, 
  opacity: 1,
}

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
}


export const IMGS_COMPONENTS_LIST = [
  {
    complexid: 'imgs_01',
    component: 'Imgs', 
    path: './Imgs/index.tsx', 
    label: '图片1', 
    propValue: 'https://img2.baidu.com/it/u=3834396650,2600895298&fm=26&fmt=auto&gp=0.jpg',
    style: {
        width: 200,
        height: 200,
        borderRadius: '',
    },
  },
  {
    complexid: 'imgs_02',
    component: 'Imgs', 
    path: './Imgs/index.tsx', 
    label: '图片2', 
    propValue: 'https://img0.baidu.com/it/u=2954925222,977582745&fm=26&fmt=auto&gp=0.jpg',
    style: {
        width: 250,
        height: 375,
        borderRadius: '',
    },
  },
];
