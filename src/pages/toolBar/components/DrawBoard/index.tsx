import React, { lazy, Suspense, useState, DragEvent } from 'react';
import type { ConnectRC, Dispatch } from 'umi';
import { connect } from 'umi';
import { Skeleton } from 'antd';
import produce from 'immer';
import _cloneDeep from 'lodash/cloneDeep';
import { uuid } from '@/utils/utils';
import { IMGS_COMPONENTS_LIST } from '@/edit-components';
import { MOBILE_DEVICE_MODEL_LIST } from './constant';
import type { ToolBarEditState } from '../../data';

import styles from './index.less';

const DrawBoardSize = lazy(() => import('./components/DrawBoardSize'));
const BackgroundGrid = lazy(() => import('./components/BackgroundGrid'));

export interface DrawBoardProps {
  toolBarEditData: ToolBarEditState;
  dispatch: Dispatch;
  loading: boolean;
}

const DrawBoard: ConnectRC<DrawBoardProps> = (props) => {
  const {
    dispatch,
    toolBarEditData: { componentData },
  } = props;
  console.log('🚀 ~ file: index.tsx ~ line 27 ~ componentData', componentData);
  const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({ w: 375, h: 667 });

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
    if (!currDeviceSize) return;
    setCanvasSize(currDeviceSize.size);
  };

  const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('-----', e);
    const complexid = e.dataTransfer.getData('complexid');
    const currComponent = _cloneDeep(
      IMGS_COMPONENTS_LIST.find((item) => item.complexid === complexid),
    );
    console.log('handleDrop---complexid', currComponent);
    if (!currComponent) return;
    currComponent.style = {
      ...currComponent.style,
      top: 0,
      left: 0,
    };
    dispatch({
      type: 'toolBarEditData/updateComponetData',
      payload: { ...currComponent, uuid },
    });
    // e.target.appendChild(document.getElementById(data));
    // setComponentList((list) => [currComponent?.component({}), ...list]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // 选中画布中的组件
  const handleMouseDown = () => {};

  // 取消选中布中的组件
  const deselectCurComponent = () => {};

  const handleContextMenu = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const handleComplexMouseDown = () => {};
  const drawBoardSizeProps = {
    deviceList: MOBILE_DEVICE_MODEL_LIST,
    canvasSize,
    onChange: handleChange,
    onSelectChange: handleSelectChange,
  };

  const canvasStyle = {
    width: canvasSize?.w,
    height: canvasSize?.h,
  };

  return (
    <div className={styles.drawBoardContainer}>
      <Suspense fallback={<Skeleton.Button active size="default" shape="round" />}>
        <DrawBoardSize {...drawBoardSizeProps} />
      </Suspense>
      <div className={styles.drawBoardWrapper} style={canvasStyle}>
        <div>
          <BackgroundGrid />
          <div
            className={styles.drawBoardCard}
            style={canvasStyle}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={handleMouseDown}
            onMouseUp={deselectCurComponent}
          >
            {Array.isArray(componentData) &&
              componentData.map((item) => {
                const DynamicComponent = lazy(
                  () => import(`../../../../edit-components/${item.component}/index.tsx`),
                );
                return (
                  <Suspense fallback="loading~">
                    <div
                      style={{ ...item?.style }}
                      className={styles.complexComponentsWrapper}
                      onContextMenu={handleContextMenu}
                      onMouseDown={handleComplexMouseDown}
                    >
                      <DynamicComponent {...item} />
                    </div>
                  </Suspense>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(
  ({
    toolBarEditData,
    loading,
  }: {
    toolBarEditData: ToolBarEditState;
    loading: {
      models: Record<string, boolean>;
    };
  }) => ({
    toolBarEditData,
    loading: loading.models.toolBarEdit,
  }),
)(DrawBoard);
