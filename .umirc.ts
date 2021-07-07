import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: '配置系统',
    locale: false,
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
