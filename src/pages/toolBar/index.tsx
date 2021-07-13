import React, { useState, lazy, Suspense } from 'react';
import { Button, Skeleton, Input } from 'antd';
// import { CrownOutlined, UserOutlined, SmileOutlined } from '@ant-design/icons';
import ProLayout, { PageContainer } from '@ant-design/pro-layout';

import styles from './index.less';

const DrawBoard = lazy(() => import('./components/DrawBoard'));
const ToolMateria = lazy(() => import('./components/ToolMateria'));
const ToolPropertiesPane = lazy(() => import('./components/ToolPropertiesPane'));

const ToolPage: React.FC<{}> = () => {
  const [pathname, setPathname] = useState('/welcome');
  return (
    <>
      <ProLayout
        pure
        location={{
          pathname,
        }}
        title="返回"
        navTheme="light"
        fixSiderbar
        headerRender={false}
        // rightContentRender={() => (
        //   <div>
        //     <Avatar shape="square" size="small" icon={<UserOutlined />} />
        //   </div>
        // )}
      >
        <PageContainer
          onBack={() => {
            window.history.go(-1);
          }}
          className={styles.toolProLayoutContainer}
          header={{
            style: {
              padding: '4px 16px',
              position: 'fixed',
              top: 0,
              width: '100%',
              left: 0,
              zIndex: 999,
              boxShadow: '0 2px 8px #f0f1f2',
            },
          }}
          extra={[
            <Input.Search
              key="search"
              style={{
                width: 240,
              }}
            />,
            <Button key="3">操作一</Button>,
            <Button key="2" type="primary">
              操作一
            </Button>,
          ]}
        >
          <div
            style={{
              height: 'calc(100vh-48px)',
            }}
          >
            <div className={styles.toolMaterialArea}>
              <Suspense fallback={<Skeleton />}>
                <ToolMateria />
              </Suspense>
            </div>
            <div className={styles.toolDrawBoardArea}>
              <Suspense fallback={<Skeleton />}>
                <DrawBoard />
              </Suspense>
            </div>
            <div className={styles.toolConfigArea}>
              <Suspense fallback={<Skeleton />}>
                <ToolPropertiesPane />
              </Suspense>
            </div>
          </div>
        </PageContainer>
      </ProLayout>
    </>
  );
};

export default ToolPage;
