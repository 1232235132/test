import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import style from './index.less';

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: props.fileList || [],
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  reset = () => {
    this.setState({ fileList: [] });
  };

  // componentWillReceiveProps(props) {
  //   // if (this.props.type && this.props.type == 'add') {
  //   //   return;
  //   // }
  //   this.setState({ fileList: props.fileList || [] });
  // }

  handleChange = ({ fileList, file }) => {
    this.setState({ fileList });
    this.props.onChange && this.props.onChange(fileList, file);
  };

  handleRemove = file => {
    this.props.onRemove && this.props.onRemove(file);
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">添加照片</div>
      </div>
    );
    console.log('图片===', previewVisible, previewImage, fileList);
    return (
      <div style={{ float: 'left' }}>
        <Upload
          accept="image/*"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= (this.props.maxLength ? this.props.maxLength : 20)
            ? null
            : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="Picture loss" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default ImageList;
