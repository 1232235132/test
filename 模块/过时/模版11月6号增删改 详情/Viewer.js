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

  render() {
    const { data = {} } = this.props;
    let states = ['', '待打印', '待取料', '待送达', '已完成', '取消'];
    let printStates = ['', '未打印', '已打印', '补打'];
    return (
      <div id="Viewer" className={styles.Viewer} style={{ marginTop: 10 }}>
        {data && (
          <Card title="详情" style={{ marginBottom: 20 }}>
            <Descriptions column={2}>
              <Descriptions.Item label="呼叫编码">{data.rCode ? data.rCode : ''}</Descriptions.Item>
              <Descriptions.Item label="看板code">
                {data.kbCode ? data.kbCode : ''}
              </Descriptions.Item>
              <Descriptions.Item label="产线架位id">{data.wbId ? data.wbId : ''}</Descriptions.Item>
              <Descriptions.Item label="超市价位">
                {data.rackId ? data.rackId : ''}
              </Descriptions.Item>
              <Descriptions.Item label="请求数量">
                {data.rQuantity ? data.rQuantity : ''}
              </Descriptions.Item>
              <Descriptions.Item label="看板打印标签数量">
                {data.kbLabelQuantity ? data.kbLabelQuantity : ''}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                {data.state ? states[data.state] : ''}
              </Descriptions.Item>
              <Descriptions.Item label="打印状态">
                {data.printState ? printStates[data.printState] : ''}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </div>
    );
  }
}

export default FuserViewer;
