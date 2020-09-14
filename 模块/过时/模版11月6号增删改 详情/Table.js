import React, { Component } from 'react';
import MyTable from '@/components/MyTable';
import Viewer from './Viewer';
import CreateModal from './CreateModal';
import { Badge, Divider, Input, Popconfirm, message, Button } from 'antd';

export default class PageTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewerData: false,
      fgNos: false,
      // 表主题数据
      dataSource: {
        list: [
          {
            code: '123',
            rCode: '呼叫编码',
            kbCode: '看板code',
            wbId: '产线架位id',
            rackId: '超市价位',
            rQuantity: '请求数量',
            kbLabelQuantity: '看板定义的打印标签数量',
            state: '1', //1=待打印 2=待取料 3=待送达 4=已完成 5=取消
            printState: '1', //1=未打印 2=已打印 3=有过补打
          },
        ],
        total: 1,
      },
      //表定义
      columns: [
        {
          title: '呼叫编码',
          dataIndex: 'rCode',
          fixed: 'left',
          width: 150,
        },

        {
          title: '看板code',
          dataIndex: 'kbCode',
        },

        {
          title: '产线架位Id',
          dataIndex: 'wbId',
        },
        {
          title: '请求数量',
          dataIndex: 'rQuantity',
        },

        {
          title: '打印标签数量',
          dataIndex: 'kbLabelQuantity',
        },

        {
          title: '超市架位',
          dataIndex: 'rackId',
        },

        {
          title: '状态',

          dataIndex: 'state',
          render(val) {
            const statusMap = ['', 'cyan', 'Warning', 'success', 'Default'];
            const status = ['', '待打印', '待取料', '待送达', '已完成', '取消'];
            return <Badge status={statusMap[val]} text={status[val]} />;
          },
        },

        {
          title: '打印状态',
          dataIndex: 'printState',
          render(val) {
            const statusMap = ['default', 'success', 'processing'];
            const status = ['未打', '已打', '补打'];
            return <Badge status={statusMap[val]} text={status[val]} />;
          },
        },

        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          fixed: 'right',
          render: (val, rowData, index) => (
            <span>
              <a onClick={() => this.onEditor(rowData, index)}>编辑</a>
              <Divider type="vertical" />

              <a href="#Viewer" onClick={() => this.setViewerData(rowData)}>详情</a>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除？" onConfirm={() => this.onRemove(index)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          ),
        },
      ],
    };
  }
  onEditor = (rowData, index = -1) => {
    this.createModal.showModal(rowData, index);
  };



  onRemove(index) {
    this.table.deleteRow(index);
  }

  /** add row */
  addRow = (record, index) => {
    this.table.addRow(record, index);
  };

  /** edit row */
  editRow = (newRecord, index) => {
    this.table.editRow(newRecord, index);
  };

  // 表单复选框选择
  onSelectRow = selectedRows => {
    this.setState({ selectedRows });
    console.log('选择', selectedRows);
  };
  // 显示详情
  setViewerData = viewerData => {
    this.setState({ viewerData });
  };

// 表单 保存成功的回调
  onSave = (data, index = -1) => {
    if (data.code) {
      // 有code 编辑 没有保存
      this.editRow(data, index);
    } else {
      this.addRow(data, index);
    }
  };



  render() {
    const { columns, dataSource, viewerData } = this.state;

    if (!dataSource) {
      dataSource = {
        list: [],
        total: 0,
      };
    }
    return (
      <div>
        <div style={{ marginBottom: 15 }}>
          <Button style={{ marginRight: 8 }} onClick={() => this.onEditor({})} icon="plus" type="primary">
            新增
          </Button>

        </div>
        <MyTable
          ref={r => (this.table = r)}
          rowKey={e => e.code}
          data={dataSource}
          columns={columns}
          onRowClick={this.setViewerData}
          onChange={this.onTableChange}
          onSelectRow={this.onSelectRow}
          scroll={{ x: 1500 }}
          rowSelectionComponent={
            <div>
              <Button size="small" type="primary" style={{ marginLeft: 10 }}>
              批量操作
              </Button>

            </div>
          }
        />
        {/* 详情组件 */}
        {viewerData && <Viewer data={viewerData} />}
        {/* 表单弹出层组件 */}
        <CreateModal onSave={this.onSave} ref={e => (this.createModal = e)} />
      </div>
    );
  }
}
