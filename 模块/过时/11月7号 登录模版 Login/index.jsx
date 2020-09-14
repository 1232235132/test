import { Alert, Checkbox, Icon, Tabs } from 'antd';
import React, { Component } from 'react';
import styles from './index.less';
import LoginForm from './LoginForm';
import MobileLoginForm from './MobileLoginForm';
export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={styles.main + " " + styles.login}>
        <Tabs size='large' animated={false} className={styles.tabs}  >
          <Tabs.TabPane key="account" tab={'账户密码登录'}>
          <LoginForm   />
          </Tabs.TabPane>
          <Tabs.TabPane tab='手机号登录' key="3">
          <MobileLoginForm   />
          </Tabs.TabPane>
        </Tabs>

      </div>
    );
  }
}
