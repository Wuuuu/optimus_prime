import React, { lazy, Suspense, useState } from 'react';
import produce from 'immer';
import { Skeleton } from 'antd';

import { MOBILE_DEVICE_MODEL_LIST } from './constant';

import styles from './index.less';

const DrawBoardSize = lazy(() => import('./components/DrawBoardSize'));

const DrawBoard: React.FC<{}> = () => {
  const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({ w: 375, h: 667 });
  console.log('🚀 ~ file: index.tsx ~ line 9 ~ canvasSize', canvasSize);

  const handleChange = (value: string, type: string) => {
    const reg = /^-?\d*(\.\d*)?$/;

    if ((!isNaN(Number(value)) && reg.test(value)) || value === '' || value === '-') {
      setCanvasSize(
        produce(canvasSize, (draft) => {
          draft[type] = Number(value) < 1000 ? Number(value) : 1000;
        }),
      );
    }
  };

  const handleSelectChange = (value: string) => {
    const currDeviceSize = MOBILE_DEVICE_MODEL_LIST?.find((item) => item?.key === value);
    console.log(
      '🚀 ~ file: index.tsx ~ line 29 ~ handleSelectChange ~ currDeviceSize',
      currDeviceSize,
    );
    // setCanvasSize(currDeviceSize.size);
  };

  const drawBoardSizeProps = {
    deviceList: MOBILE_DEVICE_MODEL_LIST,
    canvasSize,
    onChange: handleChange,
    onSelectChange: handleSelectChange,
  };

  return (
    <div className={styles.drawBoardContainer}>
      <Suspense fallback={<Skeleton.Button active size="default" shape="round" />}>
        <DrawBoardSize {...drawBoardSizeProps} />
      </Suspense>
      <div
        className={styles.drawBoardWrapper}
        style={{
          width: canvasSize?.w,
          height: canvasSize?.h,
        }}
      >
        <div className={styles.drawBoardCard}>123</div>
      </div>
    </div>
  );
};

export default DrawBoard;
