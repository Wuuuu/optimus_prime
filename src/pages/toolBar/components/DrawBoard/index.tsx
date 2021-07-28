import React, { lazy, Suspense, useState } from 'react';
import { connect, ConnectRC, Dispatch } from 'umi';
import { Skeleton } from 'antd';
import { RouteChildrenProps } from 'react-router';
import produce from 'immer';
import _cloneDeep from 'lodash/cloneDeep';
import { uuid } from '@/utils/utils';
import IMGS_COMPONENTS_LIST from '@/edit-components';
import { MOBILE_DEVICE_MODEL_LIST } from './constant';
import { ToolBarEditState } from '../../data';
import { getStyle } from '../../utils';

import styles from './index.less';

const DrawBoardSize = lazy(() => import('./components/DrawBoardSize'));
const BackgroundGrid = lazy(() => import('./components/BackgroundGrid'));
const ShapeWrapper = lazy(() => import('./components/ShapeWrapper'));

export interface DrawBoardProps extends RouteChildrenProps {
  toolBarEditData: ToolBarEditState;
  dispatch: Dispatch;
  loading: boolean;
}

const DrawBoard: ConnectRC<DrawBoardProps> = (props) => {
  const { dispatch, toolBarEditData } = props;
  const { componentData, isClickComponent, curComponent } = toolBarEditData;
  console.log("🚀 toolBarEditData", toolBarEditData)
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const complexid = e.dataTransfer.getData('complexid');
    const currComponent = _cloneDeep(
      IMGS_COMPONENTS_LIST.find((item) => item.complexid === complexid),
    );

    if (!currComponent) return;
    currComponent.style = {
      ...currComponent.style,
      // top: 0,
      // left: 0,
      top: e.nativeEvent.offsetY - 110,
      left: e.nativeEvent.offsetX - 59,
    };
    dispatch({
      type: 'toolBarEditData/updateComponetData',
      payload: { ...currComponent, uuid: uuid() },
    });
    // e.target.appendChild(document.getElementById(data));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // 选中画布中的组件
  const handleMouseDown = () => {
    dispatch({
      type: 'toolBarEditData/setClickComponentStatus',
      payload: false,
    });
    console.log('handleMouseDown');
  };

  const getComponentStyle = (style: React.CSSProperties) => {
    return getStyle(style, ['top', 'left', 'rotate']);
  };

  // 取消选中画布中的组件
  const deselectCurComponent = (e: React.MouseEvent) => {
    console.log('取消选中画布中的组件');
    if (!isClickComponent) {
      dispatch({
        type: 'toolBarEditData/setCurComponent',
        payload: null,
      });
    }

    // 0 左击 1 滚轮 2 右击
    // if (e.button != 2) {
    // }
  };

  const handleContextMenu = (e: React.DragEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleComplexMouseDown = (e: React.MouseEvent) => {
    if (!curComponent) {
      e.preventDefault();
    }
  };
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
    <div
      className={styles.drawBoardContainer}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseDown={handleMouseDown}
      onMouseUp={deselectCurComponent}
    >
      <Suspense fallback={<Skeleton.Button active size="default" shape="round" />}>
        <DrawBoardSize {...drawBoardSizeProps} />
      </Suspense>
      <div className={styles.drawBoardWrapper} style={canvasStyle}>
        <BackgroundGrid />
        <div
          className={styles.drawBoardCard}
          onContextMenu={handleContextMenu}
          onMouseDown={handleComplexMouseDown}
        >
          {Array.isArray(componentData) &&
            componentData.map((item, index) => {
              const DynamicComponent = lazy(
                () => import(`../../../../edit-components/${item.component}/index.tsx`),
              );
              const shapeWrapperProps = {
                index,
                dispatch,
                active: index === curComponent?.index,
                defaultStyle: item.style,
                element: item,
                curComponent,
              };
              return (
                <ShapeWrapper {...shapeWrapperProps}>
                  <div
                    style={getComponentStyle(item?.style)}
                    // style={{ ...item.style }}
                    className={styles.complexComponentsWrapper}
                  >
                    <Suspense fallback={null}>
                      <DynamicComponent {...item} />
                    </Suspense>
                  </div>
                </ShapeWrapper>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default connect(({ toolBarEditData }: { toolBarEditData: ToolBarEditState }) => ({
  toolBarEditData,
}))(DrawBoard);
