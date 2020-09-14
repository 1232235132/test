import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import moment from 'moment';
import InfoForm from './InfoForm';
import Logs from './Logs';
import styles from './index.less';
import { Typography, Row, Col, Descriptions, Card } from 'antd';

const { Text } = Typography;
class FuserViewer extends Component {
  state = {
    data: this.props.rowData || null,
    // data: {
    //   code: 11241521,
    //   id: 1234,
    //   guardName: '保安姓名1',
    //   applyAddress: '申请位置11',
    //   guardContact: '17237302',
    //   garageName: '车位名',
    //   garagePhoto: '车位照片',
    //   garageType: '车位类型',
    //   garageNote: '车位描述描述描述车位 ',
    //   createdAt: '2018-12-12 12:11',
    //   Enter: '入口',
    //   garageTitle: '场库名称',
    //   businessHours: ['09:12', '23:12'],
    //   attribution: '归属',
    //   costNote: '费用描述费用描述费 ',
    //   payType: '付款方式',
    //   state: '状态',
    //   associated: '123124124',
    // },
  };
  componentDidMount = () => {};

  render() {
    // const { data } = this.state;
    const { data } = this.props;

    // TODO
    return (
      <div id="申请信息">
        {data && (
          <Card title="申请信息" style={{ marginBottom: 20 }}>
            <Row>
              <Col span={9}>
                <Descriptions column={1}>
                  <Descriptions.Item label="保安姓名">
                    {data.guardName ? data.guardName : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="保安电话">
                    {data.guardContact ? data.guardContact : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请位置">
                    {data.applyAddress ? data.applyAddress : ''}
                    <a className={styles.marginLeft20}>查看</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="车位名称">
                    {data.garageName ? data.garageName : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="车位类型">
                    {data.garageType ? data.garageType : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="车位描述">
                    {data.garageNote ? data.garageNote : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="出入口">
                    {data.Enter ? data.Enter : ''}
                    <a className={styles.marginLeft20}>查看</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="场库名">
                    {data.garageTitle ? data.garageTitle : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="归属">
                    {data.attribution ? data.attribution : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="费用描述" span={2}>
                    {data.costNote ? data.costNote : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="付款方式">
                    {data.payType ? data.payType : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="场库服务时间" span={2}>
                    {data.businessHours
                      ? moment(data.businessHours[0], 'HH:mm').format('HH:mm') +
                        '-' +
                        moment(data.businessHours[1]).format('HH:mm')
                      : ''}
                  </Descriptions.Item>
                  <Descriptions.Item label="申请时间">
                    {data.createdAt ? moment(data.createdAt).format('YYYY-MM-DD HH:mm') : ''}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={15}>{<InfoForm data={data} />}</Col>
            </Row>
          </Card>
        )}
        <Logs />
        {/* <Card title="日志" style={{ marginBottom: 50 }}>
          ====
        </Card> */}
      </div>
    );
  }
}

export default FuserViewer;
