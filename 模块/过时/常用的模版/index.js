import React from 'react';
import FuserToolbar from './FuserToolbar';
import FuserTable from './FuserTable';
import FuserViewer from './FuserViewer';
import Info from './InfoForm';
import moment from 'moment';
import styles from './index.less';

import { Typography, Row, Col, Button, Card } from 'antd';
const { Title } = Typography;

class ApplyProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: null,
    };
  }
  // 按钮点击查询事件
  onSearch = values => {
    let { time } = values;
    this.setState({
      // 清空之前数据
      rowData: null,
    });
    console.log('点击查询的数据', values);
    if (time) {
      console.log('开始时间', moment(time[0]).format('YYYY-MM-DD'));
      console.log('结束时间', moment(time[1]).format('YYYY-MM-DD'));
    }
  };
  // 按钮点击重置  表单重置事件
  onClear = () => {
    console.log('点击了重置');
    this.setState({
      rowData: null,
    });
  };

  onPorpsSetState = (obj = {}) => {
    this.setState(obj);
  };

  render() {
    let { rowData } = this.state;

    return (
      // title={'车位申请管理'}
      <div>
        <Card style={{ marginBottom: 20 }}>
          <Title level={3}>车位申请管理</Title>
          {/* 顶部搜索 */}
          <FuserToolbar onSearch={this.onSearch} onClear={this.onClear} />
          <FuserTable onPorpsSetState={this.onPorpsSetState} />
        </Card>
        {rowData && <FuserViewer data={rowData} onPorpsSetState={this.onPorpsSetState} />}
      </div>
    );
  }
}

export default ApplyProduct;
