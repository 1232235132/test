import React from 'react';
import styles from './index.less';
import { Form, Icon, Input, Button, Checkbox, Row, Col, message, Alert } from 'antd';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }
  componentDidMount() {}

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('表单提交: ', values);
        this.setState({
          errorText: '验证码错误',
        });
      }
    });
  };

  onGetCaptcha = () => {
    this.props.form.validateFields(['mobile'], {}, async (err, values) => {
      if (err) return;
      console.log('values', values);

      message.success('验证码发送成功', 2, () => console.log('手机号', values.mobile));
      this.runGetCaptchaCountDown(); //倒计时
    });
  };
  //倒计时
  runGetCaptchaCountDown = () => {
    let count = 59;
    this.setState({
      count,
    });
    this.interval = window.setInterval(() => {
      count -= 1;
      this.setState({
        count,
      });

      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
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
    let { count, errorText } = this.state;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">

        {errorText && this.showError(errorText)}
        <Form.Item>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: '请输入手机号码!',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ],
          })(
            <Input
              prefix={
                <Icon
                  type="mobile"
                  style={{
                    color: 'rgba(0,0,0,.25)',
                  }}
                />
              }
              size="large"
              placeholder="手机号"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Row gutter={10}>
            <Col span={16}>
              {getFieldDecorator('SMS', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input
                  prefix={
                    <Icon
                      type="mail"
                      style={{
                        color: 'rgba(0,0,0,.25)',
                      }}
                    />
                  }
                  size="large"
                  placeholder="验证码"
                />,
              )}
            </Col>
            <Col span={8}>
              <Button
                disabled={!!count}
                className={styles.getCaptcha}
                size="large"
                block
                onClick={this.onGetCaptcha}
              >
                {count ? `${count} 秒` : '获取验证码'}
              </Button>
            </Col>
          </Row>
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
