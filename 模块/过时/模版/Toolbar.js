import React, { Component } from 'react';
import { Input, Button, Icon, Select, DatePicker, Row, Col, Form, Radio } from 'antd';
import SearchSelect from '@/components/SearchSelect';
import styles from './index.less';

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
      <div style={{ marginBottom: 10 }}>
        <Form onSubmit={this.onSubmit} layout="inline">
          <Form.Item label="看板ID">
            {getFieldDecorator(`kbCode`, {
              rules: [],
            })(<Input placeholder="关键字" style={{ width: 130, marginRight: 10 }} />)}
          </Form.Item>
          <Form.Item label="产线架位">
            {getFieldDecorator(`wbId`, {
              rules: [],
            })(<Input placeholder="产线、工位、架位" style={{ width: 130, marginRight: 10 }} />)}
          </Form.Item>
          <Form.Item label="物料号">
            {getFieldDecorator(`mNo`, {
              rules: [],
            })(<Input placeholder="关键字" style={{ width: 130, marginRight: 10 }} />)}
          </Form.Item>
          <Form.Item label="换型标识">
            {getFieldDecorator(`changeoverInd`, {
              rules: [],
            })(
              <Select
                mode="multiple"
                placeholder="换型标识"
                style={{ width: 130, marginRight: 10 }}
              >
                <Option value="全部">全部</Option>
                <Option value="无">无</Option>
                <Option value="x">x</Option>
                <Option value="Y">Y</Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item label="打印状态">
            {getFieldDecorator(`changeoverInd`, {
              rules: [],
            })(
              <Select
                mode="multiple"
                placeholder="打印状态"
                style={{ width: 130, marginRight: 10 }}
              >
                <Option value="全部">全部</Option>
                <Option value="未打">未打</Option>
                <Option value="已打">已打</Option>
                <Option value="补打">补打</Option>
              </Select>,
            )}
          </Form.Item>

          <Form.Item label="货架">
            {getFieldDecorator(`rackArea`, {
              rules: [],
            })(<SearchSelect placeholder="关键字" style={{ width: 130, marginRight: 10 }} />)}
          </Form.Item>
          <Form.Item label="区域">
            {getFieldDecorator(`shelves`, {
              rules: [],
            })(<SearchSelect placeholder="关键字" style={{ width: 130, marginRight: 10 }} />)}
          </Form.Item>
          <Form.Item label="行">
            {getFieldDecorator(`line`, {
              rules: [],
            })(<Input placeholder="关键字" style={{ width: 130, marginRight: 10 }} />)}
          </Form.Item>
          <Form.Item label="列">
            {getFieldDecorator(`column`, {
              rules: [],
            })(<Input placeholder="关键字" style={{ width: 130, marginRight: 10 }} />)}
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
            <Button
              style={{ marginRight: 8 }}
              onClick={this.props.onAdd}
              icon="plus"
              type="primary"
            >
              新增
            </Button>
            <Button style={{ marginRight: 8 }} type="primary">
              导入
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const FuserToolbar = Form.create({ name: 'customized_form_controls' })(Fuser);
export default FuserToolbar;
