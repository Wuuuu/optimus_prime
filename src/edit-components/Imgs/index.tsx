import type { FC } from 'react';
interface ImgsProps {
  complexid: string;
  propValue?: string;
  style?: object;
}
const ImgComponent: FC<ImgsProps> = (props) => {
  const { complexid, propValue } = props;
  return (
    <img
      data-complexid={complexid}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      src={propValue}
      alt=""
    />
  );
};

export default ImgComponent;
