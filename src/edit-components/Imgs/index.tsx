import type { FC } from 'react';
import React from 'react';

interface ImgsProps {
  complexid: string;
  propValue?: string;
  style?: object;
}
const ImgComponent: FC<ImgsProps> = (props) => {
  const { complexid, propValue } = props;
  // console.log('🚀 ~ file: index.tsx ~ line 4 ~ props', props);
  return (
    <img
      data-complexid={complexid}
      style={{ width: '100%', height: '100%' }}
      src={propValue}
      alt=""
    />
  );
};

export default ImgComponent;
