import React, { Component } from 'react';
import MyTable from '@/components/MyTable';

// import Viewer from './Viewer';
import FgNosModal from './FgNosModal';
import moment from 'moment';
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
            code:'123',
            kbCode: '看板id',
            mNo: '物料号',
            mDesc: '物料信息',
            kbLabelQuantity: '打印标签数量',
            wbId: '产线架位',
            rackId: '超市架位',
            changeoverInd: 'X',
            printed: '0',
            fgNos: ['1321231'],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
          {  code:'1232',
            kbCode: '看板id',
            mNo: '物料号',
            mDesc: '物料信息',
            kbLabelQuantity: '打印标签数量',
            wbId: '产线架位',
            rackId: '超市架位',
            changeoverInd: 'Y',
            printed: '0',
            fgNos: ['131231'],
            createdAt: Date.now(),
            updatedAt: Date.now(),
          },
        ],
        total: 1,
      },
      //表定义
      columns: [
        {
          title: '看板id',
          dataIndex: 'kbCode',
          fixed: 'left',
          width: 150,
        },

        {
          title: '物料号',
          dataIndex: 'mNo',
        },

        {
          title: '物料信息',
          dataIndex: 'mDesc',
        },

        {
          title: '打印标签数量',
          dataIndex: 'kbLabelQuantity',
        },
        {
          title: '产线架位',
          dataIndex: 'wbId',
        },
        {
          title: '超市架位',
          dataIndex: 'rackId',
        },
        {
          title: '换型标志',
          dataIndex: 'changeoverInd',
          align: 'center',
          filters: [
            {
              text: '',
              value: '',
            },
            {
              text: 'X',
              value: 'X',
            },
            {
              text: 'Y',
              value: 'Y',
            },
          ],
          render: (val, rowData, index) =>
            val == 'X' ? <a onClick={() => this.onShowFgNosModal(rowData)}>{val}</a> : val,
        },

        {
          title: '打印标志',
          dataIndex: 'printed',
          filters: [
            {
              text: '未打',
              value: '0',
            },
            {
              text: '已打',
              value: '1',
            },
            {
              text: '补打',
              value: '2',
            },
          ],
          render(val) {
            const statusMap = ['default', 'success', 'processing'];
            const status = ['未打', '已打', '补打'];
            return <Badge status={statusMap[val]} text={status[val]} />;
          },
        },

        {
          title: '导入时间',
          dataIndex: 'createdAt',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true,
          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
        },

        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          fixed: 'right',
          render: (val, rowData, index) => (
            <span>
              <a onClick={() => this.props.onEditor(rowData, index)}>编辑</a>
              <Divider type="vertical" />

              <Popconfirm title="是否要打印？" >
                <a>打印</a>
              </Popconfirm>
              <Divider type="vertical" />
              <Popconfirm title="是否要删除此行？" onConfirm={() => this.onRemove(index)}>
                <a>删除</a>
              </Popconfirm>
           
 
              {/*  <a onClick={() => this.setViewerData(rowData)}>查看详情</a> */}
            </span>
          ),
        },
      ],
    };
  }
  // 显示成品料号
  onShowFgNosModal = ({ fgNos = [] }) => {
    this.setState({ fgNos }, () => {
      this.fgNosModal.showModal();
    });
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
  // setViewerData = viewerData => {
  //   this.setState({ viewerData });
  // };

  render() {
    const { columns, dataSource, viewerData, fgNos } = this.state;

    if (!dataSource) {
      dataSource = {
        list: [],
        total: 0,
      };
    }
    return (
      <div>
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
                导出
              </Button>
            </div>
          }
        />

        {/* {viewerData && <Viewer data={viewerData} />} */}
        {fgNos && (
          <FgNosModal
            ref={e => (this.fgNosModal = e)}
            handleCancel={() => this.setState({ fgNos: null })}
            fgNos={fgNos}
          />
        )}
      </div>
    );
  }
}
