import { Button, DatePicker, Form, Input, Modal, Radio, Select, Steps } from 'antd';
import React, { Component } from 'react';
import SearchForm from '@/components/SearchForm';
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

class UpdateForm extends Component {
  static defaultProps = {
    handleUpdate: () => {


    },
    handleUpdateModalVisible: () => {},
    values: {},
  };
  formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      formVals: {
        Types: props.values,
      },
      currentStep: 0,
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          // if (currentStep < 2) {
          //   this.forward();
          // } else {
            console.log('更新的数据==',formVals);

            handleUpdate(formVals);
          // }
        },
      );
    });
  };
  // backward = () => {
  //   const { currentStep } = this.state;
  //   this.setState({
  //     currentStep: currentStep - 1,
  //   });
  // };
  // forward = () => {
  //   const { currentStep } = this.state;
  //   this.setState({
  //     currentStep: currentStep + 1,
  //   });
  // };
  // 编辑内容
  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
console.log('==formVals==',formVals);

    return [
      <FormItem key="Types" {...this.formLayout} label="规则名称">
        {form.getFieldDecorator('Types', {
          rules: [
            {
              required: true,
              message: '请输入规则名称！',
            },
          ],
          // initialValue: formVals.Types,
        })(

        <SearchForm   />
        )}
      </FormItem>,

    ];
  };
  renderFooter = currentStep => {
    const { handleUpdateModalVisible, values } = this.props;


    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
       确定
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;
    return (
      <Modal
        width={640}
        bodyStyle={{
          padding: '32px 40px 48px',
        }}
        destroyOnClose
        title="编辑"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >

        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default Form.create()(UpdateForm);
