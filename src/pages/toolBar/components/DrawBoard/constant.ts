export const MOBILE_DEVICE_MODEL_LIST = [
  {
    key: 'Galaxy S5',
    label: 'Galaxy S5',
    size: {
      w: 360,
      h: 640,
    },
  },
  {
    key: 'iPhone6/7/8',
    label: 'iPhone6/7/8',
    size: {
      w: 375,
      h: 677,
    },
  },
  {
    key: 'iPhone6/7/8 Plus',
    label: 'iPhone6/7/8 Plus',
    size: {
      w: 414,
      h: 736,
    },
  },
  {
    key: 'iPhone X',
    label: 'iPhone X',
    size: {
      w: 375,
      h: 812,
    },
  },
];

export const POINT_PLACEMENT = [
  'leftTop',
  'top',
  'rightTop',
  'right',
  'rightBottom',
  'bottom',
  'leftBottom',
  'left',
];

export const INIT_ANGLE = {
  // 每个点对应的初始角度
  top: 45,
  bottom: 225,
  left: 315,
  right: 135,
  leftTop: 0,
  leftBottom: 270,
  rightTop: 90,
  rightBottom: 180,
};

export const ANGLE_2_CURSOR = [
  // 每个范围的角度对应的光标
  { start: 338, end: 23, cursor: 'nw' },
  { start: 23, end: 68, cursor: 'n' },
  { start: 68, end: 113, cursor: 'ne' },
  { start: 113, end: 158, cursor: 'e' },
  { start: 158, end: 203, cursor: 'se' },
  { start: 203, end: 248, cursor: 's' },
  { start: 248, end: 293, cursor: 'sw' },
  { start: 293, end: 338, cursor: 'w' },
];
