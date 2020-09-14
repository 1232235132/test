import React from 'react';
import Toolbar from './Toolbar';
import Table from './Table';

export default class Workshop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {},
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

  render() {
    let { search } = this.state;
    return (
      <>
        <Toolbar onSearch={this.onSearch} onClear={this.onClear} />
        <Table ref={e => (this.table = e)} search={search} />
      </>
    );
  }
}
