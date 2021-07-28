export const commonStyle = {
  rotate: 0,
  opacity: 1,
};

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};

const IMGS_COMPONENTS_LIST = [
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
  {
    complexid: 'imgs_03',
    component: 'Imgs',
    path: './Imgs/index.tsx',
    label: '图片3',
    propValue: 'https://z3.ax1x.com/2021/07/26/WfBGlt.jpg',
    style: {
      width: 250,
      height: 375,
      borderRadius: '',
    },
  },
];

for (let i = 0, len = IMGS_COMPONENTS_LIST.length; i < len; i++) {
  const item = IMGS_COMPONENTS_LIST[i];
  item.style = { ...commonStyle, ...item.style };
  IMGS_COMPONENTS_LIST[i] = { ...commonAttr, ...item };
}

export default IMGS_COMPONENTS_LIST;
