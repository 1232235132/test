import React from 'react';
import { Input, Select, InputNumber, Form } from 'antd';
import styles from './index.less';

class Create extends React.Component {
  state = {
    // changeoverInd:this.props.data.changeoverInd
  };
  // componentDidMount = () => {
  //   const {  getFieldsValue } = this.props.form;

  //   let { changeoverInd } = getFieldsValue();
  //   this.setState({ changeoverInd });
  // };

  render() {
    const { getFieldDecorator, getFieldsValue } = this.props.form;
    let { data = {} } = this.props;
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
  
    const { changeoverInd } = getFieldsValue();

    return (
      <Form {...formItemLayout} onSubmit={this.onSubmit}>
        <Form.Item className={styles.marginBottom0} label="看板id">
          {getFieldDecorator('kbCode', {
          
            rules: [{ required: true, message: '请输入!' }],
          })(<Input style={{ width: 200 }} />)}
        </Form.Item>
        <Form.Item className={styles.marginBottom0} label="产线架位">
          {getFieldDecorator('wbId')(
            <Select placeholder="请选择" style={{ width: 200 }}>
              <Option value="产线架位1">产线架位1</Option>
              <Option value="产线架位2">产线架位2</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item className={styles.marginBottom0} label="物料号">
          {getFieldDecorator('mNo')(<Input style={{ width: 200 }} />)}
        </Form.Item>
        <Form.Item className={styles.marginBottom0} label="换型标志">
          {getFieldDecorator('changeoverInd', {
            
          })(
            <Select 
              allowClear
              placeholder="请选择" 
              style={{ width: 200 }}
            >
             
              <Option value="Y">Y</Option>
              <Option value="X">X</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item className={styles.marginBottom0} label="打印标签数量">
          {getFieldDecorator('kbLabelQuantity')(<InputNumber style={{ width: 200 }} />)}
        </Form.Item>
 
 
        <Form.Item 
          className={styles.marginBottom0} 
          label="成品料号"
          style={{
            display:  changeoverInd == 'X' ? '' :'none'
          }}
        >
          {getFieldDecorator('fgNos')(
            <Select mode="tags" style={{ width: 200 }}></Select>
          )}
        </Form.Item>  
      
      </Form>
    );
  }
}

const CreateForm = Form.create({ name: 'AddStation' })(Create);
export default CreateForm;
