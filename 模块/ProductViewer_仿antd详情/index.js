import React, { Component } from 'react';
import moment from 'moment';
import request, { post, imgUrl, api } from '@/utils/request';
import styles from './index.less';
import { Typography, Avatar, Descriptions, Tag ,Modal} from 'antd';

const { Text, Paragraph } = Typography;
class FuserViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  itemDom = (data = {}, keys = []) => {
 
    return keys.map((item, i) => {
      let { title, dataIndex, render } = item;
  
        return (
          <Descriptions.Item key={dataIndex } label={title}>
            {render ? render(data[dataIndex]) : data[dataIndex]}
          </Descriptions.Item>
        );
      // }
    });
  
  };


  showModal = () =>{ 
    this.setState({visible:true})
  }

  render() {
    let { data } = this.props;
    let keys = [
      {
        title: '产品编号',
        dataIndex: 'prodCode',
        render: val =>
          val && (
            <Paragraph style={{ marginBottom: 0 }} copyable>
              {val}
            </Paragraph>
          ),
      },
      {
        title: '产品名称',
        dataIndex: 'prodName',
        render: val =>
        val && (
          <Paragraph style={{ marginBottom: 0 }} copyable>
            {val}
          </Paragraph>
        ),
      },
      {
        title: '产品图片',
        dataIndex: 'prodImage',
        render: val => val && <a href={imgUrl(val)} target="_blank" > <Avatar src={imgUrl(val)} shape="square" size={64} icon="user" /></a>,
      },
      {
        title: '网页标题',
        dataIndex: 'prodPageTitle',
      },
      {
        title: '网页关键字',
        dataIndex: 'prodHeaderKeyword',
      },
      {
        title: '产品特点',
        dataIndex: 'prodSpecial',
        // render: val => val && <div dangerouslySetInnerHTML={{__html:val}}></div>,
        render: val => val && <a onClick={this.showModal} >查看产品特点</a>,
      },
     

    

      {
        title: '产品类别',
        dataIndex: 'pcName',
      },
      {
        title: '最大扭矩',
        dataIndex: 'prodMaxTorque',
      },
      {
        title: '机械过载',
        dataIndex: 'prodMachineOverload',
        render: val => [
          '',
          '150%',
          '200%',
          '250%',
          '300%',
          '400%',
          '500%',
          '1000%' 
        ][val]
      },
      {
        title: '最大转速',
        dataIndex: 'prodMaxSpeed',
       
      },
      {
        title: '安装方式',
        dataIndex: 'prodInstallMethod',
        render: val => [
          '',
          '轴式',
          '法兰式' 
        ][val]  
      },
      {
        title: '产品品牌',
        dataIndex: 'prodBrand',
        render: val => [
          '',
          '希蒙斯坦',
          'ETH' 
        ][val]  
      },
      {
        title: '是否需要转速测试',
        dataIndex: 'prodSpeedTest',
        render: val => [
          '否',
          '是',
        ][val]  
      },
 
      {
        title: '关联产品', 
        dataIndex: 'linkProduct',
        render: val => Array.isArray(val) ?  
        val.map(e=>(<Tag color="red">{e.prodName}</Tag>))
        :'/'
      },
       
      {
        title: '中文文档',
        dataIndex: 'cnDoc', 
        render: val => <div>{val && val.docName && <a href={imgUrl(val.docPath)} target="_blank" >{val.docName }</a> || ''}</div>,
      },
      {
        title: '英文文档',
        dataIndex: 'enDoc', 
        render: val => <div>{val && val.docName && <a  href={imgUrl(val.docPath)} target="_blank" >{val.docName }</a> || ''}</div>,
      },
      {
        title: '操作手册',
        dataIndex: 'manualDoc', 
        render: val => <div>{val && val.docName && <a href={imgUrl(val.docPath)} target="_blank"  >{val.docName }</a> || ''}</div>,
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',

        render: val => <div>{val && moment(Number(val)).format('YYYY-MM-DD hh:mm')}</div>,
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        render: val => <div>{val && moment(Number(val)).format('YYYY-MM-DD hh:mm')}</div>,
      },
   
      
    ];
   
  

    // data = {
    //   prodId: 41,
    //   prodCode: '6653362989946634240',
    //   prodName: '新加3 比较全部面',
    //   prodCategoryId: 2,
    //   prodSpecial: '特点',
    //   prodParams: [{ title: '123', params: ['312'] }],
    //   prodMaxTorque: '123',
    //   prodMachineOverload: 2,
    //   prodMaxSpeed: 123,
    //   prodInstallMethod: 1,
    //   prodBrand: 1,
    //   prodSpeedTest: 1,
    //   prodCoCode: null,
    //   prodRank: 123,
    //   prodHot: 0,
    //   prodHotRank: 99,
    //   prodPageTitle: '网页标题',
    //   prodHeaderKeyword: '关键字',
    //   deleted: 0,
    //   updatedAt: '1586415382038',
    //   createdAt: '1586415350312',
    //   prodImage: 'upload/avatar/upload_c2cf1ddc6a5eb8c74062771eaedb9237.png',
    //   linkProduct: [
    //     {
    //       prodId: 41,
    //       prodName: '新加3 比较全部面',
    //       prodSpecial: '特点',
    //       prodParams: [{ title: '123', params: ['312'] }],
    //       linkCode: '6653308389294080000',
    //     },
    //     {
    //       prodId: 41,
    //       prodName: '新加3 比较全部面',
    //       prodSpecial: '特点',
    //       prodParams: [{ title: '123', params: ['312'] }],
    //       linkCode: '6653309101646282752',
    //     },
    //   ],
    //   cnDoc: {
    //     docName: 'xcast_2020031214.log',
    //     docPath: 'upload/cnDoc/upload_fcff0cc5a452705cf9c720d6cf1a7f72.log',
    //     docSize: 23036,
    //   },
    //   enDoc: {
    //     docName: 'xcast_2020031214.log',
    //     docPath: 'upload/enDoc/upload_8c1c3f45a88df7cd73513f9ea8bcbcc5.log',
    //     docSize: 23036,
    //   },
    //   manualDoc: {
    //     docName: 'no.png',
    //     docPath: 'upload/manualDoc/upload_d8f40aafff1fe427893ae3c8a369050b.png',
    //     docSize: 9493,
    //   },
    // };
    console.log('Modal==',this.Modal)
    return (
      <div id="Viewer" className={styles.Viewer} style={{ marginTop: 10 }}>
        {data && (
          <Descriptions column={2} bordered>
            {this.itemDom(data, keys)}
            {/*        
              <Descriptions.Item label="产品图片">{data.picture ? <Avatar src={data.picture} shape="square" size={64} icon="user" /> : ''}</Descriptions.Item>
              <Descriptions.Item label="产品编码">{data.code ? data.code : ''}</Descriptions.Item>
           <Descriptions.Item label="所属分类">{data.class ? data.class : ''}</Descriptions.Item>
              <Descriptions.Item label="所属公司">{data.company ? data.company : ''}</Descriptions.Item> 
       
              <Descriptions.Item label="产品性能">{data.performance ? 
                <Paragraph ellipsis={{ rows: 2, expandable: true }}>{data.performance}</Paragraph> : ''}
              </Descriptions.Item>
 
              <Descriptions.Item label="产品材料">{data.material ? data.material : ''}</Descriptions.Item>

              <Descriptions.Item label="产品描述">{data.describe ? 
                <Paragraph ellipsis={{ rows: 2, expandable: true }}>{data.describe}</Paragraph> : ''}
              </Descriptions.Item>
              <Descriptions.Item label="产品关联">{data.associated &&  Array.isArray(data.associated) ? data.associated.join(',') : ''}</Descriptions.Item>
              

              <Descriptions.Item label="产品概览">{data.overview ? 
                <Paragraph ellipsis={{ rows: 2, expandable: true }}>{data.overview}</Paragraph> : ''}
              </Descriptions.Item>
              <Descriptions.Item label="更新时间">{data.updatedAt ? moment(data.updatedAt).format('YYYY-MM-DD') : ''}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{data.createdAt ? moment(data.createdAt).format('YYYY-MM-DD') : ''}</Descriptions.Item> */}
              {/* 产品参数显示 */}
            {Array.isArray(data.prodParams)
              ? data.prodParams.map((e, key) => (
                  <Descriptions.Item key={key + "prodParams"} label={e.title}>
                    {Array.isArray(e.params)
                      ? e.params.map((item, key) =>
                     
                       <Tag key={key  + "prodParam"} color="purple">{item}</Tag>
                       )
                      : null}
                  </Descriptions.Item>
                )) 
              : null}
             
          </Descriptions>

         

        )}

        <Modal  onCancel={()=> this.setState({visible: false})} title="产品特点" visible={this.state.visible}  width={'90%'}  footer={null} ref={e=>this.Modal = e} >
          <div style={{overflow: 'hidden'}}>
          <div dangerouslySetInnerHTML={{__html:data.prodSpecial}}></div>
          </div>

        </Modal>
      </div>
    );
  }
}

export default FuserViewer;
