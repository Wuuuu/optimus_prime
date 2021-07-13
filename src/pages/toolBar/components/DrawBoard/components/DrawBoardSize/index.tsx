import React from 'react';
import { Input, Select } from 'antd';

import styles from './index.less';

const { Option } = Select;

interface DeviceModelList {
  key: string;
  label: string;
  size: {
    w: number;
    h: number;
  };
}

interface DrawBoardSizeFProps {
  deviceList: DeviceModelList[];
  canvasSize: { w: number; h: number };
  onChange: (e: string, type: string) => void;
  onSelectChange: (value: string) => void;
}

const DrawBoardSize: React.FC<DrawBoardSizeFProps> = ({
  deviceList,
  canvasSize,
  onChange,
  onSelectChange,
}) => {
  const handleSelectChange = (value: string) => {
    if (onSelectChange) {
      onSelectChange(value);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>, type: string) => {
    e.preventDefault();
    const { value } = e.currentTarget;
    if (onChange) {
      onChange(value, type);
    }
  };

  return (
    <div className={styles.drawBoardChangeSizeWrapper}>
      <Select
        defaultValue="Iphone6/7/8"
        onChange={handleSelectChange}
        style={{ width: 140, marginRight: 16 }}
      >
        {deviceList.map((item: DeviceModelList) => (
          <Option value={item?.key}>{item.label}</Option>
        ))}
      </Select>
      <Input
        placeholder="w"
        style={{ width: 60 }}
        value={canvasSize?.w}
        onChange={(e) => handleChange(e, 'w')}
      />
      <span style={{ display: 'inline-block', margin: '0 8px' }}>x</span>
      <Input
        placeholder="h"
        style={{ width: 60 }}
        value={canvasSize?.h}
        onChange={(e) => handleChange(e, 'h')}
      />
      <span style={{ paddingLeft: 8 }}>px</span>
    </div>
  );
};

export default DrawBoardSize;
