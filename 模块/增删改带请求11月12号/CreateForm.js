import React from 'react';
import { Input, Select, Switch, Form } from 'antd';
import styles from './index.less';

class Create extends React.Component {
  state = {
   
  };
  

  render() {
    const { getFieldDecorator } = this.props.form;
    // let { data = {} } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
  
 

    return (
      <Form {...formItemLayout} onSubmit={this.onSubmit}>
         <Form.Item className={styles.marginBottom0} label="名称">
          {getFieldDecorator('name', {
            // initialValue: data.name ? data.name : '',
            required: false,
          })(<Input style={{ width: 200, marginRight: 50 }} placeholder="请输入名称" />)}
        </Form.Item>
      
         
 
        
      </Form>
    );
  }
}

const CreateForm = Form.create({ name: 'AddStation' })(Create);
export default CreateForm;
