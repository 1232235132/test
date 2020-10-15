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
    const {
      data = {},
      columns = [
       
      ],
    } = this.props;

    return (
      <div id="Viewer" className={styles.Viewer} style={{ marginTop: 10 }}>
        <Card
          title={`退料详情${data.code ? '(' + data.code + ')' : ''}`}
          style={{ marginBottom: 20 }}
        >
          <Descriptions column={3}>
            {columns.map(item => {
              let { title, dataIndex } = item;
              if (dataIndex == 'createdAt') {
                return (
                  <Descriptions.Item label={title}>
                    {moment(Number(data[dataIndex])).format('YYYY-MM-DD HH:mm:ss')}
                  </Descriptions.Item>
                );
              }

              return data[dataIndex] ? (
                <Descriptions.Item label={title}>{data[dataIndex]}</Descriptions.Item>
              ) : null;
            })}
          </Descriptions>
        </Card>
        {/* {data && (
          <Card title={`退料详情${data.code ? '(' + data.code + ')' : '' }`} style={{ marginBottom: 20 }}>
            <Descriptions column={3}>
              <Descriptions.Item label="换型编号">{data.coNo}</Descriptions.Item>
              <Descriptions.Item label="看板ID">{data.kbCode}</Descriptions.Item>
              <Descriptions.Item label="产线架位">{data.wbNo}</Descriptions.Item>
 
              <Descriptions.Item label="创建时间">
                {data.createdAt ? moment(Number(data.createdAt)).format('YYYY-MM-DD HH:mm:ss') : ''}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )} */}
      </div>
    );
  }
}

export default FuserViewer;
