import React from 'react';
import Toolbar from './Toolbar';
import Table from './Table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card } from 'antd';
import CreateModal from './CreateModal';

export default class Material extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerData: false,
    };
  }
  // 按钮点击查询事件
  onSearch = search => {
    // console.log('点击查询的数据', search);

    this.setState({ search }, this.table.getData);
  };
  // 按钮点击重置  表单重置事件
  onClear = () => {
    // console.log('点击了重置');
    this.setState({ search: {} }, this.table.getData);
  };

  onAdd = () => {
    this.createModal.showModal();
  };

  onEditor = (rowData, index) => {
    this.createModal.showModal(rowData, index);
  };

  onSave = (data, index = -1) => {
    if (data.code) {
      // 有code 编辑 没有保存
      this.table.editRow(data, index);
    } else {
      this.table.addRow(data, index);
    }
  };
  render() {
    let { viewerData } = this.state;

    return (
      <PageHeaderWrapper>
        <Card style={{ marginBottom: 20 }}>
          <Toolbar onAdd={this.onAdd} onSearch={this.onSearch} onClear={this.onClear} />
          <Table
            onEditor={this.onEditor}
            ref={e => (this.table = e)}
            onPorpsSetState={this.onPorpsSetState}
          />
        </Card>
        <CreateModal onSave={this.onSave} ref={e => (this.createModal = e)} />
      </PageHeaderWrapper>
    );
  }
}
