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

    return (
      <div id="Viewer" className={styles.Viewer} style={{ marginTop: 10 }}>
        {data && (
          <Card title="物料详情" style={{ marginBottom: 20 }}>
            <Descriptions column={2}>
              <Descriptions.Item label="物料号">{data.mNo ? data.mNo : ''}</Descriptions.Item>
              <Descriptions.Item label="物料描述">{data.mDesc ? data.mDesc : ''}</Descriptions.Item>
              <Descriptions.Item label="包装类型">
                {data.mPkgType ? data.mPkgType : ''}
              </Descriptions.Item>
              <Descriptions.Item label="包装个数">
                {data.mPerPkgQantity ? data.mPerPkgQantity : ''}
              </Descriptions.Item>
              <Descriptions.Item label="存储位置">
                {data.mStorageLoc ? data.mStorageLoc : ''}
              </Descriptions.Item>
              <Descriptions.Item label="超市架位">
                {data.rackId ? data.rackId : ''}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      </div>
    );
  }
}

export default FuserViewer;
