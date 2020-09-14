import React, { Component } from 'react';
import moment from 'moment';
import { post } from '@/utils/utils';
import { Divider, Popconfirm, message, Button } from 'antd';
import MyTable from '@/components/MyTable';
import CreateModal from './CreateModal';

// dataSource = 表数据
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //表定义
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '最后更新用户',
          dataIndex: 'operationName',
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '更新时间2',
          dataIndex: 'updatedAt2',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },

        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          render: (text, rowData, index) => (
            <span>
              <a onClick={() => this.showModal(rowData, index)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.onRemove(index)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          ),
        },
      ],
    };
  }

  componentDidMount = () => {
    this.getData();
  };

  // 获取数据 搜索栏的数据 search
  getData = async (search = this.props.search) => {
    let {
      params = { // 默认请求参数
        current: 1,
        pageSize: 10,
      },
    } = this.state;

    let res = await post('/api/workshop/list', {
      ...params,
      search,
    });
    // console.log('返回的数据', res);

    this.setState({ dataSource: res });
  };

  // 当前第几页 = current 每多少分一页 = pageSize  field = 排序字段名 order = 排序方式 上还是下
  // 参数 pagination / 分页, filters /过滤, sorter /分选 排序
  onTableChange = ({ current, pageSize }, filters, { field, order }) => {
    let params = {
      current,
      pageSize,
      field,
      order,
    };
    // 设置请求参数 
    this.setState({ params }, this.getData);
  };

  // 新建 / 编辑 提交回调
  onSave = (data, index) => {
    if (index == -1) {
      // 新增

      this.addRow(data, 0);
    } else {
      //编辑
      this.editRow(data, index);
    }
  };

  onRemove(index) {
    this.table.deleteRow(index);
  }

  onChange = e => {
    let { value, name } = e.target;
    this.setState({ [name]: value });
  };
  // 表单复选框选择
  onSelectRow = selectedRows => {
    this.setState({ selectedRows });
    console.log('选择', selectedRows);
  };
  /** add row */
  addRow = (record, index) => {
    this.table.addRow(record, index);
  };

  /** edit row */
  editRow = (newRecord, index) => {
    this.table.editRow(newRecord, index);
  };
  // 打开新增编辑弹框
  showModal = (rowData = {}, index = -1) => {
    this.CreateModal.showModal(rowData, index);
  };

  render() {
    const {
      columns,

      dataSource = {
        list: [],
        total: 0,
      },
    } = this.state;

    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => this.showModal({})}
            icon="plus"
            type="primary"
          >
            新增
          </Button>
        </div>
        <MyTable
          ref={r => (this.table = r)}
          // key={'code'}
          rowKey={e => e.code}
          data={dataSource}
          columns={columns}
          onRowClick={this.setViewerData}
          onChange={this.onTableChange}
          onSelectRow={this.onSelectRow}
          rowSelectionComponent={
            <div>
              <Button
                size="small"
                type="primary"
                style={{ marginLeft: 30 }}
                onClick={this.onOpenTagManager}
              >
                导出
              </Button>
            </div>
          }
        />

        <CreateModal ref={e => (this.CreateModal = e)} onSave={this.onSave} />
      </div>
    );
  }
}
