import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const Spinner = () => {
  const spinnerStyle = {
    fontSize: 24,
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
  };

  return (
    <div style={containerStyle}>
      <Spin
        indicator={
          <LoadingOutlined
            style={spinnerStyle}
            spin
          />
        }
      />
    </div>
  );
}

export default Spinner;
