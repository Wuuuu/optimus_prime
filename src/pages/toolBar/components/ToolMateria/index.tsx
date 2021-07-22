import type { DragEvent} from 'react';
import React, { lazy, Suspense } from 'react';
import { Tabs } from 'antd';
import type { TabItem } from './data.d';
import { IMGS_COMPONENTS_LIST } from '@/edit-components';
import styles from './index.less';

const { TabPane } = Tabs;

// event: DragEvent<HTMLDivElement>

const tabsList = [
  {
    key: 'components',
    name: '组件',
    icon: 'makeUp_menu_components_icon',
    componentList: IMGS_COMPONENTS_LIST,
  },
  {
    key: 'images',
    name: '图片',
    icon: 'makeUp_menu_images_icon',
    componentList: IMGS_COMPONENTS_LIST,
  },
  {
    key: 'decorate',
    name: '装饰',
    icon: 'makeUp_menu_decorate_icon',
    componentList: IMGS_COMPONENTS_LIST,
  },
];

const renderDetail = (file: string) => {
  const DynamicComponent = lazy(() => import(`../../../../edit-components/${file}/index.tsx`));
  return DynamicComponent;
};

const ToolMateria: React.FC<{}> = () => {
  const customTab = (item: TabItem) => {
    return (
      <div className={styles.customTabBox}>
        <img src={require(`../../../../../public/toolBar/makeUpPage/${item?.icon}.png`)} alt="" />
        <span>{item?.name}</span>
      </div>
    );
  };

  const handleComplexDragStart = (e: React.DragEvent<HTMLInputElement>) => {
    const { complexid } = (e.target as HTMLInputElement).dataset;
    e.dataTransfer.setData('complexid', complexid || '');
    console.log('拖拽开始', e);
  };

  const handleDragEnd = (e: DragEvent) => {
    console.log('拖拽结束', e);
  };

  return (
    <div className={styles.toolMateriaContainer}>
      <Tabs tabPosition="left">
        {tabsList.map((item) => (
          <TabPane tab={customTab(item)} key={item?.key}>
            <div
              className={styles.complexComponentsBox}
              onDragStart={handleComplexDragStart}
              onDragEnd={handleDragEnd}
            >
              {item?.componentList?.map((ele) => {
                const DynamicComponent = renderDetail(ele.component);
                const dynameicProps = {
                  draggable: true,
                  'data-complexid': ele.complexid,
                  ...ele,
                };
                return (
                  <div className={styles.complexComponentsItem} draggable>
                    <Suspense fallback="loading~">
                      <DynamicComponent {...dynameicProps} />
                    </Suspense>
                  </div>
                );
              })}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ToolMateria;
