import React, { Component } from 'react';
import { Tag, Input, Tooltip, Icon, Row, Col, Modal } from 'antd';
import _ from 'lodash';
import SearchForm from '@/components/SearchForm';
import UpdateTypesForm from './UpdateTypesForm';
class Types extends React.Component {
  state = {
    tags: [],
    updateModalVisible: false,
    inputValue: '',
  };

  componentWillReceiveProps = props => {
    this.setState({
      tags: props.tags,
      grpCode: props.tags[0] && props.tags[0].grpCode,
    });
  };

  handleClose = removedTag => {
    Modal.confirm({
      title: `确定删除[${removedTag.title}]`,
      content: '删除, 请谨慎操作',
      onOk: () => {
        //   request.post("/sys/tags/delete", { tagId: removedTag.id }, result => {
        //     let { tags } = this.state;

        //     _.remove(tags, o => {
        //       return o.id == removedTag.id;
        //     });

        //     this.setState({ tags });
        //   });
        let { tags } = this.state;

        _.remove(tags, o => {
          return o.id == removedTag.id;
        });

        this.setState({ tags });
      },
    });
  };
  // onEditor = tags => {
  //   this.setState({ updateModalVisible: tags });
  //   console.log('编辑类型');
  // };
  handleModalVisible = (updateModalVisible) => {


    this.setState({ updateModalVisible: !!updateModalVisible });
  };
  handleUpdate = (data)=>{
    console.log('确定更新的数据', data);
    this.handleModalVisible()
  }

  render() {
    const { tags = [], updateModalVisible } = this.state;



    return (
      <Row gutter={16}>
        {tags.map((tag, index) => {
          // const isLongTag = tag.title.length > 6;
          return (
            <Tooltip style={{ marginLeft: 5 }} title={tag.title} key={tag.id}>
              <Tag
                key={tag.id}
                onClick={() => {
                  this.setState({ editId: tag.id });
                }}
                onClose={() => this.handleClose(tag)}
              >
                {tag.title}
              </Tag>
            </Tooltip>
          );
        })}

        <Icon
          type="edit"
          onClick={() => {
            this.handleModalVisible(true);
          }}
          theme="twoTone"
        />

        {/* <SearchForm /> */}

        <UpdateTypesForm
          handleUpdateModalVisible={this.handleModalVisible}
          handleUpdate={this.handleUpdate}
          values={tags}
          updateModalVisible={!!updateModalVisible}
        />
      </Row>
    );
  }
}

export default Types;
