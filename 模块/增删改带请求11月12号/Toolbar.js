import React, { Component } from 'react';
import { Input, Button, Icon, Select, DatePicker, Row, Col, Form, Radio } from 'antd';
import styles from './index.less';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

class Fuser extends React.Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      this.props.onSearch(values);
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
          {/* <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              待审核 (17)
            </Button>
            <Button
              type="primary"
              htmlType="reset"
              style={{ marginRight: 8 }}
              onClick={this.onClear}
            >
              全 部
            </Button>

          </Form.Item> */}

          <Form.Item label="名称">
            {getFieldDecorator(`name`, {
              rules: [],
            })(<Input placeholder="关键字" style={{ width: 150, marginRight: 10 }} />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              查 询
            </Button>
            <Button
              // type="primary"
              htmlType="reset"
              style={{ marginRight: 8 }}
              onClick={this.onClear}
            >
              重 置
            </Button>
            {/* <Button onClick={this.props.onAdd} icon="plus" type="primary">
              新建
            </Button> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const FuserToolbar = Form.create({ name: 'customized_form_controls' })(Fuser);
export default FuserToolbar;
