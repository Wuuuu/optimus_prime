import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#dd5044',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Optimus Prime',
  pwa: false,
  logo: 'https://z3.ax1x.com/2021/07/09/RvE1FU.jpg',
  iconfontUrl: '',
};

export default Settings;
