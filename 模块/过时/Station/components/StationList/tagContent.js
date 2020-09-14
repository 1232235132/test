import React, { Component } from "react";
import { Tag, Input, Tooltip, Icon, Row, Col, Modal } from "antd";
import _ from "lodash";
// import request from "../../../utils/request";
class EditableTagGroup extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: ""
  };

  componentWillReceiveProps = props => {
    this.setState({
      tags: props.tags,
      grpCode: props.tags[0] && props.tags[0].grpCode
    });
  };

  handleClose = removedTag => {
    Modal.confirm({
      title: `确定删除[${removedTag.title}]`,
      content: "删除, 请谨慎操作",
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

      }

    });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags, grpCode } = this.state;
    // if (inputValue && tags.indexOf(inputValue) === -1) {
    //   tags = [...tags, inputValue];
    // }
    if (!inputValue) {
      return this.setState({ inputVisible: false });
    }
    tags.push({id: Math.floor(Math.random() * 10)  , title:inputValue});


    this.setState({tags, inputVisible: false,  inputValue: ""})
    // request.post("/sys/tags/create", { grpCode, title: inputValue }, result => {
    //   console.log("result", result);
    //   tags.push(result);
    //   this.setState({
    //     tags,
    //     inputVisible: false,
    //     inputValue: ""
    //   });
    // });
  };

  saveInputRef = input => (this.input = input);

  handleEditTag = (tag, event) => {
    console.log("tag", tag, event.currentTarget.value);
    const value = event.currentTarget.value;
    let { tags } = this.state;

    if (!value) return;
    const idx = _.findIndex(tags, { id: tag.id });
      tags[idx] = { ...tags[idx], title: value };

      this.setState({ tags, editId: "",  });
    // request.post("/sys/tags/update", { tagId: tag.id, title: value }, () => {
    //   const idx = _.findIndex(tags, { id: tag.id });
    //   tags[idx] = { ...tags[idx], title: value };

    //   this.setState({ tags, editId: "" });
    // });
  };

  render() {
    const { tags = [], inputVisible, inputValue, editId } = this.state;
    return (
      <Row gutter={16}>
        {tags.map((tag, index) => {
          // const isLongTag = tag.title.length > 6;
          return (

              <Tooltip style={{marginLeft:5}} title={tag.title} key={tag.id}>
                {editId == tag.id ? (
                  <Input
                    ref={ref => (this.editInput = ref)}
                    type="text"
                    size="small"
                    style={{ width: 78,marginRight:5 }}
                    defaultValue={tag.title}
                    // onBlur={()=>{this.setState({editId:false})}}
                    onPressEnter={this.handleEditTag.bind(this, tag)}
                  />
                ) : (
                  <Tag
                    key={tag.id}
                    closable={true}
                    onClick={() => {
                      this.setState({ editId: tag.id });
                    }}
                    onClose={() => this.handleClose(tag)}
                  >
                    {/* {isLongTag ? `${tag.title.slice(0, 6)}...` : tag.title} */}
                     { tag.title}
                  </Tag>
                )}
              </Tooltip>

          );
        })}


          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: "#fff", borderStyle: "dashed" }}
            >
              <Icon type="plus" /> 添加架位
            </Tag>
          )}

      </Row>
    );
  }
}

export default EditableTagGroup;
