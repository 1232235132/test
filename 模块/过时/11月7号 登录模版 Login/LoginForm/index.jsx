import React from 'react';
import styles from './index.less';
import { Form, Icon, Input, Button, Checkbox, Row, Col,Alert } from 'antd';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          errorText:'账户或密码错误'
        })
        console.log('Received values of form: ', values);
      }
    });
  };
  //显示错误
  showError = errorText => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={errorText}
      type="error"
      showIcon
    />
  );

  render() {
    const { getFieldDecorator } = this.props.form;
    let { errorText } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
           {errorText && this.showError(errorText)}
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入您的用户名!',
              },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="user"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              }
              size="large"
              placeholder="用户名"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="lock"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              }
              placeholder="密码"
              size="large"
            />,
          )}
        </Form.Item>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>自动登录</Checkbox>)}
          <a className="login-form-forgot" href="">
            忘记了密码
          </a>
          <Button
            style={{ margin: '10px 0' }}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
          <Row type="flex" justify="end">
            <a href="">注册账户</a>
          </Row>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({
  name: 'normal_login',
})(NormalLoginForm);
export default () => (
  <div className={styles.container}>
    <div id="components-form-demo-normal-login">
      <WrappedNormalLoginForm />
    </div>
  </div>
);
