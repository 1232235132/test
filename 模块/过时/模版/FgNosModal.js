import { Modal, List, Descriptions } from 'antd';
import styles from './index.less';
export default class FgNosModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.handleCancel();
  };

  handleCancel = e => {
    this.props.handleCancel && this.props.handleCancel();
    this.setState({
      visible: false,
    });
  };

  render() {
    let { fgNos = [] } = this.props;

    return (
      <div className={styles.Viewer}>
        <Modal
          bodyStyle={{padding:'10px 24px' }}
          title={'成品料号'}
          visible={this.state.visible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <List
            itemLayout="horizontal"
            dataSource={fgNos}
            renderItem={item => (
              <List.Item>
               {item}
              </List.Item>
            )}
          />
        
        </Modal>
      </div>
    );
  }
}
