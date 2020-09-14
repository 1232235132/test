import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MyTable from '@/components/MyTable';

import moment from 'moment';
import { Input, Card, Button, Icon, Select, DatePicker, Row, Col, Form } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const InputGroup = Input.Group;
class Search extends React.Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      this.props.onSearch && this.props.onSearch(values);
      console.log('点击搜索的数据', values);
    });
  };
  onClear = () => {
    this.props.form.resetFields();
    this.props.onClear && this.props.onClear();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div
        style={{
          marginBottom: 25,
        }}
      >
        <Form onSubmit={this.onSubmit} layout="inline">
          <Form.Item>
            {getFieldDecorator(`time`, {})(
              <RangePicker format="YYYY-MM-DD " style={{ width: 250, marginRight: 10 }} />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator(`type`, {
              rules: [],
              initialValue: '全部',
            })(
              <Select style={{ minWidth: 80, marginRight: 10 }}>
                <Select.Option value="全部">全部</Select.Option>
                <Select.Option value="操作动作1">操作动作1</Select.Option>
                <Select.Option value="操作动作2">操作动作2</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator(`kw`, {
              rules: [],
            })(<Input placeholder="操作人" style={{ width: 150, marginRight: 50 }} />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              查 询
            </Button>
            <Button
              type="primary"
              htmlType="reset"
              style={{ marginRight: 8 }}
              onClick={this.onClear}
            >
              重 置
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const SearchForm = Form.create({ name: 'search' })(Search);

class FuserTable extends Component {
  state = {
    note: '拒绝理由',
    // 表主题数据
    // 表主题数据
    dataSource: {
      list: [
        {
          code: 11241521,
          id: 1234,
          operation: '操作动作',
          updatedAt: '2018-12-12 12:11',
          name: '操作人',
          note: '备注备注备注备注备注备注备注备注备注',
        },
      ],
      total: 1,
    }, //表定义
    columns: [
      {
        title: '操作动作',
        dataIndex: 'operation',
      },
      {
        title: '通过/拒绝时间',
        dataIndex: 'updatedAt',
        render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '操作人',
        dataIndex: 'name',
      },
      {
        title: '拒绝理由',
        dataIndex: 'note',
      },
    ],
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

    return (
      <div>
        <Card title="操作日志" style={{ marginBottom: 50 }}>
          <SearchForm />
          <MyTable rowKey={e => e.code} data={dataSource} columns={columns} />
        </Card>
      </div>
    );
  }
}

export default FuserTable;
