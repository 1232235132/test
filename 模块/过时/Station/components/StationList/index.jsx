import React, { Component } from 'react';
import { Row, Col, Button, Table, message, Typography, Card, Icon, List, Tag } from 'antd';
import moment from 'moment';
import styles from '../../style.less';
import CreateForm from './CreateForm';
import TagContent from './tagContent';
import Types from './Types';
const { Paragraph } = Typography;

// 工位列表
class StationList extends Component {
  state = {
    modalVisible: false,
    dataSource: [
      {
        name: '工位名称',
        types:  [
          { title: '类型', id: 1 },
          { title: '类型2', id: 3 },
          { title: '类型3', id: 2 },
        ],
        wbNo: '架位',
        workbinList: [
          { title: '架位名称1', id: 1 },
          { title: '架位名称2', id: 3 },
          { title: '架位名称3', id: 2 },
        ],
      },
    ], //表定义
    columns: [
      {
        title: (
          <Button icon="plus-square" onClick={() => this.handleModalVisible(true)} type="link">
            工位
          </Button>
        ),
        dataIndex: 'name',
        render: (val, item, i) => (
          <Paragraph editable={{ onChange: v => this.onChange(v, item) }}>{val}</Paragraph>
        ),
      },
      {
        title: '架位',
        dataIndex: 'workbinList',
        width: '60%',
        render: (val, item, i) => <TagContent tags={val} />,
      },
      {
        title: '类型',
        dataIndex: 'types',
        render: (val, item, i) =>{
          return <Types  tags={val}/>
        },
      },
    ],
  };

  onChange = (valeu, item) => {
    console.log('变化', valeu, item);
    item.name = valeu;
    this.setState({}); // 在这个位置需要请求修改工位名称接口
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleModalVisible = modalVisible => {
    this.setState({ modalVisible: !!modalVisible });
  };
  //添加工位返回的数据
  handleAdd = data => {
    console.log('添加工位返回的数据', data);
    let { dataSource } = this.state;
    dataSource.push(data);

    message.success('添加成功');
    this.handleModalVisible();
  };
  // onChange = e => {
  //   let { value, name } = e.target;

  //   this.setState({ [name]: value });
  // };

  render() {
    const { dataSource, columns, modalVisible } = this.state;


    return (
      <div>
        <Table bordered dataSource={dataSource} columns={columns} />
        <CreateForm
          handleModalVisible={this.handleModalVisible}
          handleAdd={this.handleAdd}
          modalVisible={modalVisible}
        />
      </div>
    );
  }
}

export default StationList;
