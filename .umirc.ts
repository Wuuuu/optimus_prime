import { defineConfig } from 'umi';

export default defineConfig({
  title: 'optimus prime',
  favicon: '/public/favicon.png',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
});
