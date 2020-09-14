import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyTable from '@/components/MyTable';
import moment from 'moment';
import { Modal, Divider, Input, Alert, message } from 'antd';
import ImagePreview from '@/components/ImagePreview';
const { TextArea } = Input;
class FuserTable extends Component {
  state = {
    note: '拒绝理由',
    // 表主题数据
    dataSource: {
      list: [
        {
          code: 11241521,
          id: 12342,
          guardName: '保安姓名1',
          applyAddress: '申请位置11',
          guardContact: '17237302',
          garageName: '车位名',
          garagePhoto: '车位照片',
          garageType: '车位类型',
          garageNote: '车位描述描述描述',
          createdAt: '2018-12-12 12:11',
          Enter: '入口',
          garageTitle: '场库名称',
          businessHours: ['09:12', Date.now()],
          attribution: '归属',
          costNote: '费用描述',
          payType: '付款方式',
          state: '状态',
          associated: '123124124',
          wayCharge: '计费方式',
        },
        {
          code: 11241521,
          id: 12314,
          guardName: '保安姓名2',
          applyAddress: '申请位置11',
          guardContact: '17237302',
          garageName: '车位名',
          garagePhoto: '车位照片',
          garageType: '车位类型',
          garageNote: '车位描述描述描述',
          createdAt: '2018-12-12 12:11',
          Enter: '入口',
          garageTitle: '场库名称',
          businessHours: ['09:12', Date.now()],
          attribution: '归属',
          costNote: '费用描述',
          payType: '付款方式',
          state: '状态',
          associated: '123124124',
          wayCharge: '计费方式',
        },
        {
          code: 11241521,
          id: 12344,
          guardName: '保安姓名3',
          applyAddress: '申请位置11',
          guardContact: '17237302',
          garageName: '车位名',
          garagePhoto: '车位照片',
          garageType: '车位类型',
          garageNote: '车位描述描述描述',
          createdAt: '2018-12-12 12:11',
          Enter: '入口',
          garageTitle: '场库名称',
          businessHours: ['09:12', Date.now()],
          attribution: '归属',
          costNote: '费用描述',
          payType: '付款方式',
          state: '状态',
          associated: '123124124',
          wayCharge: '计费方式',
        },
        {
          code: 111241521,
          id: 12334,
          guardName: '保安姓名4',
          applyAddress: '申请位置11',
          guardContact: '17237302',
          garageName: '车位名',
          garagePhoto: '车位照片',
          garageType: '车位类型',
          garageNote: '车位描述描述描述',
          createdAt: '2018-12-12 12:11',
          Enter: '入口',
          garageTitle: '场库名称',
          businessHours: ['09:12', Date.now()],
          attribution: '归属',
          costNote: '费用描述',
          payType: '付款方式',
          state: '状态',
          associated: '123124124',
          wayCharge: '计费方式',
        },
        {
          code: 11241521,
          id: 1212334,
          guardName: '保安姓名5',
          applyAddress: '申请位置11',
          guardContact: '17237302',
          garageName: '车位名',
          garagePhoto: '车位照片',
          garageType: '车位类型',
          garageNote: '车位描述描述描述',
          createdAt: '2018-12-12 12:11',
          Enter: '入口',
          garageTitle: '场库名称',
          businessHours: ['09:12', Date.now()],
          attribution: '归属',
          costNote: '费用描述',
          payType: '付款方式',
          state: '状态',
          associated: '123124124',
          wayCharge: '计费方式',
        },
      ],
      total: 5,
    },
    //表定义
    columns: [
      {
        title: '保安姓名/ID',
        dataIndex: 'guardName',
        width: 150,
        fixed: 'left',
        render: (text, rowData, index) => (
          <div>
            <span>{text}</span>
            <br />
            <span>{rowData.id}</span>
          </div>
        ),
      },
      {
        title: '保安手机号',
        width: 150,
        dataIndex: 'guardContact',
        fixed: 'left',
        render: (text, rowData, index) => <span>{text || '/'}</span>,
      },
      {
        title: '申请位置',
        width: 200,
        dataIndex: 'applyAddress',
        render: (text, rowData, index) => <span>{text || '/'}</span>,
      },
      {
        title: '车位名',
        width: 200,
        dataIndex: 'garageName',
        render: (text, rowData, index) => <span>{text || '/'}</span>,
      },
      {
        title: '车位照片',
        width: 150,
        dataIndex: 'garagePhoto',
        render: (text, rowData, index) => (
          <span>
            <a>查看</a>
          </span>
        ),
      },
      {
        title: '车位类型',
        dataIndex: 'garageType',
        width: 150,
        render: (text, rowData, index) => <span>{text || '/'}</span>,
      },
      {
        title: '车位描述',
        dataIndex: 'garageNote',
        width: 250,
        render: (text, rowData, index) => <span>{text || '/'}</span>,
      },
      {
        title: '入口',
        dataIndex: 'Enter',
        width: 150,
        render: (text, rowData, index) => (
          <span>
            {text}:<a>查看</a>
          </span>
        ),
      },
      {
        title: '场库名称',
        width: 150,
        dataIndex: 'garageTitle',
      },
      {
        title: '场库服务时间',
        width: 150,
        dataIndex: 'businessHours',
        render: text => (
          <span>
            {moment(text[0], 'HH:mm').format('HH:mm')}-{moment(text[1]).format('HH:mm')}
          </span>
        ),
      },
      {
        title: '归属',
        dataIndex: 'attribution',
        width: 150,
        render: text => <span>{text || '/'}</span>,
      },
      {
        title: '费用描述',
        dataIndex: 'costNote',
        width: 250,
        render: text => <span>{text || '/'}</span>,
      },

      {
        title: '付款方式',
        dataIndex: 'payType',
        width: 150,
        render: text => <span>{text || '/'}</span>,
      },

      {
        title: '申请时间',
        dataIndex: 'createdAt',
        width: 200,
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '通过/驳回时间',
        dataIndex: 'updatedAt',
        width: 200,
        render: text => <span>{moment(text).format('YYYY-MM-DD  HH:mm')}</span>,
      },
      {
        title: '状态',
        width: 150,
        dataIndex: 'state',
        render: text => <span>{text}</span>,
      },
      {
        title: '关联车位id',
        dataIndex: 'associated',
        fixed: 'right',
        width: 150,
        render: (id, rowData, index) => <span>{id ? <a>{id}</a> : '/'}</span>,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 150,
        render: (text, rowData, index) => (
          <span>
            <a href="#申请信息" onClick={e => this.onInfo(e, rowData)}>
              处理
            </a>
            <Divider type="vertical" />
            <a
              onClick={e => {
                this.onRefused(e, rowData, index);
              }}
            >
              拒绝
            </a>
          </span>
        ),
      },
    ],
  };
  // 点击处理显示详情
  onInfo = (e, rowData) => {
    e.stopPropagation();
    console.log('点击处理显示详情', rowData);
    this.props.onPorpsSetState && this.props.onPorpsSetState({ rowData });
  };
  // 点击拒绝事件
  onRefused = (e, rowData, index) => {
    e.stopPropagation();
    this.showModal(rowData);
  };
  showModal = rowData => {
    this.setState({
      visible: rowData,
    });
  };

  handleOk = e => {
    let { visible, note } = this.state;

    if (!note) {
      message.error('请填写拒绝理由');
      return;
    }
    console.log('拒绝列数据', visible);
    console.log('拒绝所填的理由', note);

    this.setState({
      visible: false,
      note: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    let { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { columns, dataSource } = this.state;

    if (!dataSource) {
      dataSource = {
        list: [],
        total: 0,
      };
    }
    return (
      <div>
        <MyTable
          ref={r => (this.id = r)}
          rowKey={e => e.id}
          data={dataSource}
          columns={columns}
          onRowClick={this.setViewerData}
          onChange={this.handleTableChange}
          scroll={{ x: 3000 }}
        />
        <Modal
          centered
          destroyOnClose
          title="请输入拒绝理由"
          visible={!!this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <TextArea
            name="note"
            onChange={this.onChange}
            rows={4}
            maxLength={30}
            placeholder="最多可输入30个字"
          />
        </Modal>
      </div>
    );
  }
}

export default FuserTable;
