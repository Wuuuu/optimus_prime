import React, { useState, useEffect, useRef } from 'react';
import { connect, ConnectRC, Dispatch } from 'umi';
import { RedoOutlined } from '@ant-design/icons';
import classnames from 'classnames';
// import { throttle } from 'lodash/throttle';
import { POINT_PLACEMENT, INIT_ANGLE, ANGLE_2_CURSOR } from '../../constant';
import { mod360 } from '../../../../utils';
import { ToolBarEditState } from '../../../../data';
import styles from './index.less';

interface ShapeWrapperProps {
  dispatch: Dispatch;
  index: number | string;
  active: boolean;
  element: object;
  defaultStyle: any;
  toolBarEditData: ToolBarEditState;
  children: React.ReactNode;
}

const ShapeWrapper: ConnectRC<ShapeWrapperProps> = ({
  dispatch,
  index,
  active,
  element,
  defaultStyle,
  children,
  toolBarEditData,
}) => {
  const { curComponent } = toolBarEditData;
  console.log('🚀 ~ file: index.tsx ~ line 30 ~ curComponent', curComponent);
  const cursors = useRef({});
  const handleSelectCurComponent = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleMouseDownOnShape = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'toolBarEditData/setClickComponentStatus',
      payload: true,
    });
    dispatch({
      type: 'toolBarEditData/setCurComponent',
      payload: { ...element, index },
    });

    cursors.current = getCursor() || {}; // 根据旋转角度获取光标位置

    const pos = { ...defaultStyle };
    const startY = e.clientY;
    const startX = e.clientX;
    // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
    const startTop = Number(pos.top);
    const startLeft = Number(pos.left);

    // 如果元素没有移动，则不保存快照
    let hasMove = false;
    const move = (moveEvent: MouseEvent) => {
      console.log('move');
      hasMove = true;
      const curX = moveEvent.clientX;
      const curY = moveEvent.clientY;
      pos.top = curY - startY + startTop;
      pos.left = curX - startX + startLeft;

      console.log('pos', pos);
      
      // 修改当前组件样式
      // this.$store.commit('setShapeStyle', pos)
      // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
      // 如果不使用 $nextTick，吸附后将无法移动
      // this.$nextTick(() => {
      //     // 触发元素移动事件，用于显示标线、吸附功能
      //     // 后面两个参数代表鼠标移动方向
      //     // curY - startY > 0 true 表示向下移动 false 表示向上移动
      //     // curX - startX > 0 true 表示向右移动 false 表示向左移动
      //     eventBus.$emit('move', curY - startY > 0, curX - startX > 0)
      // })
    };

    const up = () => {
      console.log('up');
      // hasMove && this.$store.commit('recordSnapshot')
      // 触发元素停止移动事件，用于隐藏标线
      // eventBus.$emit('unmove')
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };

  const handleMouseDownOnPoint = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    placement: string,
  ) => {};

  const getPointStyle = (point: string) => {
    const { width, height } = defaultStyle;
    const lowerStr = point.toLowerCase();
    const hasTop = /top/.test(lowerStr);
    const hasBottom = /bottom/.test(lowerStr);
    const hasLeft = /left/.test(lowerStr);
    const hasRight = /right/.test(lowerStr);
    let newLeft = 0;
    let newTop = 0;

    // 四个顶角点
    if (['leftTop', 'rightTop', 'leftBottom', 'rightBottom'].includes(point)) {
      newLeft = hasLeft ? 0 : width;
      newTop = hasTop ? 0 : height;
    } else {
      // 上下两点的点，宽度居中
      if (hasTop || hasBottom) {
        newLeft = width / 2;
        newTop = hasTop ? 0 : height;
      }
      // 左右两边的点，高度居中
      if (hasLeft || hasRight) {
        newLeft = hasLeft ? 0 : width;
        newTop = Math.floor(height / 2);
      }
    }

    const style = {
      marginLeft: hasRight ? '-4px' : '-4px',
      marginTop: '-4px',
      left: `${newLeft}px`,
      top: `${newTop}px`,
      cursor: cursors.current?.[point],
    };

    return style;
  };

  const getCursor = () => {
    if (!curComponent) return;
    const rotate = mod360(curComponent.style.rotate); // 取余 360
    const result = {};
    let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

    POINT_PLACEMENT.forEach((point) => {
      const angle = mod360(INIT_ANGLE[point] + rotate);
      const len = ANGLE_2_CURSOR.length;
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len;
        const angleLimit = ANGLE_2_CURSOR[lastMatchIndex];
        if (angle < 23 || angle >= 338) {
          result[point] = 'nw-resize';

          return;
        }

        if (angleLimit.start <= angle && angle < angleLimit.end) {
          result[point] = angleLimit.cursor + '-resize';

          return;
        }
      }
    });

    return result;
  };

  useEffect(() => {
    if (curComponent) {
      cursors.current = getCursor() || {}; // 根据旋转角度获取光标位置
    }
  }, [curComponent]);

  const shapeStyle = classnames(styles.shapeContainer, {
    [styles.shapeContainerActive]: active,
  });

  return (
    <div
      className={shapeStyle}
      style={{ top: defaultStyle.top || 0, left: defaultStyle.left || 0 }}
      onClick={handleSelectCurComponent}
      onMouseDown={handleMouseDownOnShape}
    >
      {active && (
        <>
          <RedoOutlined className={styles.rotateIcon} />
          {POINT_PLACEMENT?.map((position) => (
            <span
              key={position}
              className={styles.shapePoint}
              style={getPointStyle(position)}
              onMouseDown={(e) => handleMouseDownOnPoint(e, position)}
            />
          ))}
        </>
      )}
      {children}
    </div>
  );
};

export default connect(({ toolBarEditData }: { toolBarEditData: ToolBarEditState }) => ({
  toolBarEditData,
}))(ShapeWrapper);
