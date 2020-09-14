import { Modal, Input, Form } from 'antd';
import styles from './index.less';
import CreateForm from './CreateForm';
export default class AddStation extends React.Component {
  state = { visible: false };

  showModal = (data = {}, index = -1) => {
    this.setState(
      {
        visible: true,
        data,
        index,
      },
      () => {
        if (index != -1) {
          // 编辑 设置原始值
          this.timer = setTimeout(() => {
            let { name } = data;
            this.form.setFieldsValue({ name });
          }, 200);
        }
      },
    );
  };

  handleOk = e => {
    let { data = {}, index } = this.state;
    let { onSave } = this.props;
    this.createForm.props.form.validateFields((err, vlaues) => {
      if (err) return;

      let req = {
        ...data,
        ...vlaues,
      };

      onSave && onSave(req, index);
  
      this.form.resetFields();
      this.handleCancel();
    });
  };

  handleCancel = e => {
    this.form.resetFields();
    this.setState({
      visible: false,
      data: false,
      index: -1,
    });
  };

  render() {
    let { data = {} } = this.state;
    return (
      <div>
        <Modal
          title={data.name ? '编辑' : '新增'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          centered
        >
          <CreateForm
            ref={r => (this.form = r)}
            data={data}
            wrappedComponentRef={e => (this.createForm = e)}
          />
        </Modal>
      </div>
    );
  }
}
