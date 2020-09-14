import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Card, Col, Row, Tree, Input, Button, Popconfirm, Switch, Menu, Dropdown, Select } from 'antd';
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { show } from '@/utils/utils';
import CreateModal from './CreateModal';
const { Search } = Input;
const { Option } = Select;

class Index extends React.Component<any,  any> {
  constructor(props:any) {
    super(props);

    this.state = {
      columns:  [
        {
          title: '用户编号',
          dataIndex: 'code',
          hideInSearch: true,
          hideInForm: true,
          width: 100,
          fixed: 'left',
        },
        {
          title: '用户名称',
          dataIndex: '用户名称key',

          rules: [
            {
              required: true,
              message: '用户呢称为必填项',
            },
          ],
        },
        {
          title: '用户呢称',
          dataIndex: '用户呢称key',
          hideInSearch: true,

        },
        {
          title: '部门',
          dataIndex: '部门key',
          // hideInSearch: true,
          renderFormItem: (item: any, { type, defaultRender, ...rest }: any, form: any) => {

            let list = this.getList()
            return (
              <Select  {...rest} placeholder="请选择部门"   >
                {list.map(e => (
                  <Option key={e.value} value={e.value} >
                    {e.name}
                  </Option>
                ))}
              </Select>

            )
          },
        },
        {
          title: '手机号码',
          dataIndex: '手机号码key',

        },
        {
          title: '状态',
          dataIndex: '状态key',
          initialValue: false,
          valuePropName: "checked",
          render: (e: any) => (
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              onChange={() => show('success', '操作成功')}
              defaultChecked={!!e}
            ></Switch>
          ),
          renderFormItem: ({ initialValue }: any, { type, defaultRender, ...rest }: any, form: any) => {
            if (type === 'form') {

              return <Switch    {...rest} checkedChildren="启用" unCheckedChildren="禁用" />;
            }
            return <Select  {...rest}       >
              <Option value={1}>启用</Option>
              <Option value={0}>禁用</Option>

            </Select>

          },

        },
        {
          title: '创建时间',
          dataIndex: '创建时间key',
          hideInForm: true,
          valueType: 'dateTime',
          // valueType: 'dateTimeRange',

        },

        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          width: 100,
          fixed: 'right',
          render: (_: any, rowData: {}) => [
            <a onClick={() => { this.setState({ modalShow: rowData }) }}>修改</a>,
            <Popconfirm placement="left" title="确认删除?" onConfirm={() => show()}>
              <a>删除</a>
            </Popconfirm>,
          ],
        },
      ],
      treeData: [
        {
          title: '智慧水务',
          key: '智慧水务key',
          children: [
            {
              title: '深圳总公司',
              key: '深圳总公司key',
              children: [
                {
                  title: '财务部门',
                  key: '深圳总公司key-财务部门key',
                },
                {
                  title: '市场部门',
                  key: '深圳总公司key-市场部门key',
                },
              ],
            },
            {
              title: '福建公司',
              key: '福建公司key',
              children: [
                {
                  title: '财务部门',
                  key: '福建公司-财务部门key',
                },
                {
                  title: '市场部门',
                  key: '福建公司-市场部门key',
                },
              ],
            },
          ],
        },
      ]
    }; 

   
  }

  
  
  // 获取部门列表

  getList = () => {
    return [
      {
        name: '开发部',
        value: '开发部'
      },
      {
        name: '开发部2',
        value: '开发部2'
      }
    ]
  }

  // onTreeData = () => {
  //   let treeData: any = [
  //     {
  //       title: '智慧水务',
  //       key: '智慧水务key',
  //       children: [
  //         {
  //           title: '深圳总公司',
  //           key: '深圳总公司key',
  //           children: [
  //             {
  //               title: '财务部门',
  //               key: '深圳总公司key-财务部门key',
  //             },
  //             {
  //               title: '市场部门',
  //               key: '深圳总公司key-市场部门key',
  //             },
  //           ],
  //         },
  //         {
  //           title: '福建公司',
  //           key: '福建公司key',
  //           children: [
  //             {
  //               title: '财务部门',
  //               key: '福建公司-财务部门key',
  //             },
  //             {
  //               title: '市场部门',
  //               key: '福建公司-市场部门key',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ]
  //   let { kw = '' } = this.state;

  //   treeData = this.onFilter(treeData, kw)

  //   console.log('treeData==', treeData)

  //   return treeData
  // }

  // onFilter = (list: any, kw = '') => {
  //   return list.map((e: any) => {
  //     if (e.title && e.title.indexOf(kw) != -1) {
  //       if (Array.isArray(e.children)) {
  //         e.children = this.onFilter(e.children, kw)
  //       }
  //       return e
  //     } else if (Array.isArray(e.children)) {
  //       //console.log('===',e.title, this.onFilter(e.children, kw))
  //       e.children = this.onFilter(e.children, kw);
  //       return e
  //       // if (this.onFilter(e.children, kw).length > 0) {
  //       //   return e
  //       // }
  //     }
  //   }).filter((e = { title: null }) => e && e.title)
  // }


  render() {
    let { columns = [], treeData } = this.state;



    // const loop = (data:any) =>
    // data.map((item:any) => {
    //     const index = item.title.indexOf(searchValue);
    //     const beforeStr = item.title.substr(0, index);
    //     const afterStr = item.title.substr(index + searchValue.length);
    //     const title =
    //         index > -1 ? item.title : '' 
    //     if (item.children) {
    //         return { title, key: item.key, children: loop(item.children) };
    //     }

    //     return {
    //         title: item.title,
    //         key: item.key,
    //     };
    // });





    return (
      <PageHeaderWrapper>
        <Row gutter={16}>
          <Col span={5}>
            <Card>
              <Search onChange={(e) => this.setState({ kw: e.target.value })} style={{ marginBottom: 8 }} placeholder="Search" />
              <Tree
                onSelect={(e) => {
                  console.log('点击节点触发', e);

                }}
                defaultExpandedKeys={['智慧水务key']}
                onExpand={(e) => {
                  console.log('onExpand', e);
                }}
                treeData={treeData}
              />
            </Card>
          </Col>
          <Col span={19}>
            <Card>
              <ProTable<any>
         
                request={(params = {}) => {
                  console.log('请求数据', params);  
                  return Promise.resolve({
                    data: [
                      {
                        code: 123,
                        用户名称key: '用户名称',
                        用户呢称key: '用户呢称',
                        部门key: '开发部',
                        手机号码key: '17521723702',
                        状态key: true,
                        创建时间key: new Date().getTime(),
                      },
                      {
                        code: 1232,
                        用户名称key: '用户名称2',
                        用户呢称key: '用户呢称2',
                        部门key: '开发部2',
                        手机号码key: '17521722222',
                        状态key: 0,
                        创建时间key: new Date().getTime(),
                      },
                    ],
                    success: true,
                  });
                }
                }
                rowKey="code"
                toolBarRender={(_, { selectedRowKeys }) => [
                  <Button
                    key="1"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => { this.setState({ modalShow: {} }) }}
                  >
                    新建
                  </Button>,

                  <Button
                    key="2"
                    onClick={() => show()}
                    type="primary"
                    className="button-color-gray"
                  >
                    导入
                  </Button>,
                  <Button
                    key="3"
                    onClick={() => show()}
                    type="primary"
                    className="button-color-sunset"
                  >
                    导出
                  </Button>,
                  selectedRowKeys && selectedRowKeys.length && (
                    <Popconfirm key="4" title="确认批量删除?" onConfirm={() => show()}>
                      <Button key="3" type="primary" className="button-color-dust">
                        删除
                      </Button>
                    </Popconfirm>
                  ),
                ]}
                scroll={{ x: 1200 }}
                rowSelection={{}}
                columns={columns}
                actionRef={(e: any) => this.refs = e}
              />
            </Card>
          </Col>
        </Row>

        {/* 创建更新 */}
        <CreateModal onCancel={() => { this.setState({ modalShow: false }) }} modalVisible={!!this.state.modalShow}>
          <ProTable<any, any>
            onSubmit={async (newData) => {
              let data = this.state.modalShow;
              console.log('提交', {
                ...data,
                ...newData
              })
              show('success', '提交成功')
               //  this.refs.reload() //刷新重新请求数据
              this.setState({ modalShow: false })

            }}
            rowKey="code"
            type="form"
            form={{ initialValues: this.state.modalShow ? this.state.modalShow : {} }}

            columns={columns}
            rowSelection={{}}
          />
        </CreateModal>
      </PageHeaderWrapper>
    );
  }
}
export default Index;