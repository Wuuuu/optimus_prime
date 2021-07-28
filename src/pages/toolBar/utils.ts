import { CSSProperties } from 'react';

export function mod360(deg: number) {
  return (deg + 360) % 360;
}

export function getStyle(style: CSSProperties, filter: string[] = []) {
  const needUnit = [
    'fontSize',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius',
  ];

  const result: CSSProperties = {};

  Object.keys(style).forEach((key: any) => {
    if (!filter.includes(key as never)) {
      if (key !== 'rotate') {
        result[key] = style[key];

        if (needUnit.includes(key)) {
          result[key] += 'px';
        }
      } else {
        result.transform = key + '(' + style[key] + 'deg)';
      }
    }
  });

  return result;
}
