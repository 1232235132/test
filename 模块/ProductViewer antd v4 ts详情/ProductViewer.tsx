import React from 'react';
import { Modal, Descriptions } from 'antd';


interface ProductViewerProps {
  bordered?: boolean; // 是否边框
  // onCancel: () => void;
  // title?: string
  data?: object,
  columns: Array<any>,
  column?: number, // 多少列
} 

const Index: React.FC<ProductViewerProps> = (props) => {

  let { data = {}, columns = [] , column = 3,bordered } = props;




  let itemDom = (data = {}, keys: any) => {

    return keys.map((item: any) => {
      let { title, dataIndex, render, valueEnum } = item;
      let value = data[dataIndex];  
      //是操作隐藏
      if (dataIndex === 'option') return
      //兼容  valueEnum
      if (valueEnum &&  valueEnum[value]) {
        value =  valueEnum[value]['text'] ? valueEnum[value]['text'] : valueEnum[value]; 
      } 
      return (
        <Descriptions.Item key={dataIndex} label={title}>
          {render ? render(value) : value}
        </Descriptions.Item>
      );
      // }
    });

  };

  return (
    <Descriptions column={column} bordered={bordered}  >
      {itemDom(data, columns)}
    </Descriptions>
  );
};

export default Index;
