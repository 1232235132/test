import React, { Component } from 'react';
import { Input, Button, Icon, Select, DatePicker, Row, Col, Form } from 'antd';
import styles from './index.less';
import ImageList from './ImageList';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

class Info extends React.Component {
  state = {};
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
    let { data } = this.props;
    const formItemLayout = {
      labelCol: { span: 2, offset: 1 },
      wrapperCol: { span: 12, offset: 1 },
    };

    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.onSubmit}>
          <Form.Item className={styles.marginBottom0} label="保安姓名">
            {data.guardName ? data.guardName : ''}
          </Form.Item>
          <Form.Item className={styles.marginBottom0} label="保安手机号">
            {data.guardContact ? data.guardContact : ''}
          </Form.Item>
          <Form.Item className={styles.marginBottom0} label="申请位置">
            {data.applyAddress ? data.applyAddress : ''}

            <a style={{ marginLeft: 20 }}>修改/查看</a>
          </Form.Item>
          <Form.Item className={styles.marginBottom0} label="车位名称">
            {getFieldDecorator('garageName', {
              initialValue: data.garageName ? data.garageName : '',
              required: true,
            })(<Input style={{ width: 200, marginRight: 50 }} placeholder="请输入车位名称" />)}
          </Form.Item>
          <Form.Item className={styles.marginBottom0} label="车位类型">
            {data.garageType ? data.garageType : ''}
          </Form.Item>
          <Form.Item className={styles.marginBottom0} label="车位照片">
            {getFieldDecorator('garagePhoto', {
              initialValue: data.garagePhoto ? data.garagePhoto : [],
            })(<ImageList />)}
          </Form.Item>
          <Form.Item className={styles.marginBottom0} label="车位描述">
            {getFieldDecorator('garageNote', {
              initialValue: data.garageNote ? data.garageNote : '',
            })(
              <Input.TextArea
                rows={4}
                maxLength={30}
                style={{ width: 400 }}
                placeholder="最多输入30个字"
              />
            )}
          </Form.Item>

          <Form.Item className={styles.marginBottom0} label="出入口">
            <a>修改/查看</a>
          </Form.Item>

          <Form.Item className={styles.marginBottom0} label="场库选取">
            {getFieldDecorator('garageTitle', {
              initialValue: data.garageTitle ? data.garageTitle : '',
            })(
              <Input
                style={{ width: 200 }}
                disabled
                placeholder="请选择所属场库"
                addonAfter={<Icon type="edit" />}
              />
            )}
          </Form.Item>

          <Form.Item className={styles.marginBottom0} label="归属">
            {data.attribution ? data.attribution : ''}
          </Form.Item>
          <Form.Item label="计费方式">
            {getFieldDecorator('wayCharge', {
              initialValue: data.wayCharge ? data.wayCharge : '',
            })(
              <Select style={{ width: 200 }}>
                <Option value="计费方式1">计费方式1</Option>
                <Option value="计费方式2">计费方式2</Option>
              </Select>
            )}
          </Form.Item>
          {/* className={styles.textCenter} */}
          <Form.Item label=" " colon={false}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              通 过
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const InfoForm = Form.create({ name: 'Info' })(Info);
export default InfoForm;
