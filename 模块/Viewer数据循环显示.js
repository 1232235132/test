import React, { Component } from 'react';
import moment from 'moment';
import styles from './index.less';
import { Typography, Row, Col, Descriptions, Card } from 'antd';

const { Text } = Typography;
class FuserViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};
  //数据显示的处理
  onDispose = (value, name) => {
    if (name == 'updatedAt') {
      value = moment(Number(value)).format('YYYY-MM-DD HH:mm:ss');
    }
    if (name == 'createdAt') {
      value = moment(Number(value)).format('YYYY-MM-DD HH:mm:ss');
    }

    return value;
  };

  render() {
    const { data = {} } = this.props;
    let keys = {
      name: '名称',
      code: 'code',
      updatedAt: '更新时间',
      createdAt: '创建时间',
    };
    let arr = [];
    for (const key in keys) {
      if (keys.hasOwnProperty(key)) {
        const element = keys[key];
        if (data[key]) {
          const item = (
            <Descriptions.Item label={element}>{this.onDispose(data[key], key)}</Descriptions.Item>
          );
          arr.push(item);
        }
      }
    }

    return (
      <div id="Viewer" className={styles.Viewer} style={{ marginTop: 10 }}>
        {data && (
          <Card
            title={`详情${data.code ? '(' + data.code + ')' : ''}`}
            style={{ marginBottom: 20 }}
          >
            <Descriptions column={3}>{arr}</Descriptions>
          </Card>
        )}
      </div>
    );
  }
}

export default FuserViewer;
