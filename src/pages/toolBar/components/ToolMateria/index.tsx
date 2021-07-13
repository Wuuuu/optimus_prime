import React from 'react';
import { Tabs } from 'antd';
import type { TabItem } from './data.d';

import styles from './index.less';

const { TabPane } = Tabs;

const tabsList = [
  {
    key: 'components',
    name: '组件',
    icon: 'makeUp_menu_components_icon',
  },
  {
    key: 'images',
    name: '图片',
    icon: 'makeUp_menu_images_icon',
  },
  {
    key: 'decorate',
    name: '装饰',
    icon: 'makeUp_menu_decorate_icon',
  },
];

const ToolMateria: React.FC<{}> = () => {
  const customTab = (item: TabItem) => {
    return (
      <div className={styles.customTabBox}>
        <img src={require(`../../../../../public/toolBar/makeUpPage/${item?.icon}.png`)} alt="" />
        <span>{item?.name}</span>
      </div>
    );
  };
  return (
    <div className={styles.toolMateriaContainer}>
      <Tabs tabPosition="left">
        {tabsList.map((item) => (
          <TabPane tab={customTab(item)} key={item?.key}>
            我是{item?.name}区域
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ToolMateria;
