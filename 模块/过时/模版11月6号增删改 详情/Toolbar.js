import React, { Component } from 'react';
import { Input, Button, Icon, Row, Col, DatePicker, Form, Select } from 'antd';
import SearchSelect from '@/components/SearchSelect';
import styles from './index.less';
const { RangePicker } = DatePicker;
class Fuser extends React.Component {
  state = {
    expandForm: false,
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      this.props.onSearch(values);
    });
  };

  onClear = () => {
    const { form } = this.props;
    form.resetFields();

    this.props.onClear && this.props.onClear();
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  renderAdvancedForm = () => {
    const { getFieldDecorator } = this.props.form;

    return (
      <Row
        type="flex"
        justify="start"
        className={styles.tableListForm}
        gutter={{
          md: 8,
          lg: 24,
          xl: 48,
        }}
      >
        <Col md={6} sm={24}>
          <Form.Item label="搜索">
            {getFieldDecorator(`kbCode`, {
              rules: [],
            })(<Input placeholder="关键字" />)}
          </Form.Item>
        </Col>

        <Col md={6} sm={24}>
          <Form.Item label="状态">
            {getFieldDecorator(`changeoverInd`)(
              <Select mode="tags" placeholder="换型标识">
                <Option value="待打印">待打印</Option>
                <Option value="待取料">待取料</Option>
                <Option value="待送达">待送达</Option>
                <Option value="已完成">已完成</Option>
                <Option value="已取消">已取消</Option>
              </Select>,
            )}
          </Form.Item>
        </Col>

        <Col md={6} sm={24}>
          <Form.Item label="时间">
            {getFieldDecorator(`time`)(<RangePicker format="YYYY-MM-DD" />)}
          </Form.Item>
        </Col>

        <Col md={6} sm={24}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            查 询
          </Button>
          <Button htmlType="reset" onClick={this.onClear}>
            重 置
          </Button>
          <a
            style={{
              marginLeft: 8,
            }}
            onClick={this.toggleForm}
          >
            收起 <Icon type="up" />
          </a>
        </Col>
      </Row>
    );
  };
  //张开
  renderSimpleForm = () => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row
        className={styles.tableListForm}
        gutter={{
          md: 8,
          lg: 24,
          xl: 48,
        }}
      >
        <Col md={6} sm={24}>
          <Form.Item label="搜索">
            {getFieldDecorator(`kbCode`, {
              rules: [],
            })(<Input placeholder="关键字" />)}
          </Form.Item>
        </Col>

        <Col md={6} sm={24}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            查 询
          </Button>
          <Button htmlType="reset" onClick={this.onClear}>
            重 置
          </Button>

          <a
            style={{
              marginLeft: 8,
            }}
            onClick={this.toggleForm}
          >
            展开 <Icon type="down" />
          </a>
        </Col>
      </Row>
    );
  };

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }
  render() {
    return (
      <div style={{ marginBottom: 10 }}>
        <Form onSubmit={this.onSubmit} layout="inline">
          {this.renderForm()}
        </Form>
      </div>
    );
  }
}

const FuserToolbar = Form.create({ name: 'Toolbar' })(Fuser);
export default FuserToolbar;
