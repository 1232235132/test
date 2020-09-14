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
        if (data.code) { // 编辑 设置原始值
          this.timer = setTimeout(() => {
            const { changeoverInd, kbCode, wbId, mNo, kbLabelQuantity, fgNos } = data;
            this.form.setFieldsValue({ changeoverInd }, () => {
              this.form.setFieldsValue({ kbCode, wbId, mNo, kbLabelQuantity, fgNos });
            });
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
      // if (req.code) {
      //   // 编辑
      //   onEditSuccess && onEditSuccess(req, index);
      // } else {
      //   onAddSuccess && onAddSuccess(req);
      // }

      this.handleCancel();
      this.createForm.props.form.resetFields();
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
    this.createForm.props.form.resetFields();
  };

  render() {
    let { data = {} } = this.state;
    return (
      <div>
        <Modal
          title={data.code ? '编辑' : '新增'}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
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
