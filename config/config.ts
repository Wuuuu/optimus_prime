import { defineConfig } from 'umi';
import defaultSettings from '@ant-design/pro-layout/lib/defaultSettings';
console.log("🚀 ~ file: config.ts ~ line 3 ~ defaultSettings", defaultSettings)

export default defineConfig({
  title: 'optimus prime',
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  links: [
    // href的图片你可以放在public里面，直接./图片名.png 就可以了，也可以是cdn链接
     { rel: 'icon', href: '../public/favicon.png' },
   ],
});
