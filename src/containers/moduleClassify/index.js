import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import './index.css'
import { Card,Icon,Modal,notification,Input,Select, Form,Button  } from 'antd';

const confirm = Modal.confirm;
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

//新增模板分类表单
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            console.log(this.props);
            return (
                <Modal
                    visible={visible}
                    title={this.props.title}
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <FormItem label="分类名称">
                            {getFieldDecorator('assortmentName', {
                                rules: [{ required: true, message: '请输入模板分类名称！' }],
                                initialValue: this.props.assortmentName
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="备注">
                            {getFieldDecorator('remarks',{
                                initialValue: this.props.remarks
                            })
                            (<Input type="textarea" placeholder={this.props.remarks} />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

//消息卡片
const openNotificationWithIcon = (type,title,message) => {
    notification[type]({
        message: title,
        description: message
    });
};

class ModuleClassify extends Component{
    constructor(props){
        super(props);
        this.state ={
            list: [],
            conditionSelected: 1,
            visible: false,
            assortmentNo: '',
            assortmentName: '',
            remarks: '',
            title: '添加模板分类'
        }
    }

    componentDidMount(){
        let option = {
            pageSize: 15,
            pageNo: 1
        }
        //请求模板分类列表
        this.handleAjax("assortment/showModuleAssortment",option,(result) => {
            if(result.success === true){
                this.setState({
                    list: result.object
                })
            }else{
                // Modal.error({
                //     title: result.msg
                // });
            }
        },"post")
    }

    handleAjax(url, options, successHandle, requestType){
        requestType = requestType || "get";
        $.ajax({
            type:requestType,
            url: url,
            dataType:'json',
            scriptCharset: 'utf-8',
            data:options,
            cache: false,
            success: (result)=>{
                successHandle(result);
            }
        });
    }

    //删除模板分类
    deleteClassify(value){

        console.log(value);
        let that = this;
        confirm({
            title: '确定删除该模板分类吗?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let option ={
                    assortmentNo: value
                }
                that.handleAjax("assortment/deleteModuleAssortment",option,(result) => {
                    console.log(result);
                    if(result.success === true){
                        openNotificationWithIcon('success','删除成功','');
                        //请求模板分类列表
                        that.handleAjax("assortment/showModuleAssortment","",(result) => {
                            console.log(result);
                            if(result.success === true){
                                that.setState({
                                    list: result.object
                                })
                            }else{
                                // Modal.error({
                                //     title: result.msg
                                // });
                            }
                        },"post")

                    }else{
                        openNotificationWithIcon('error','删除失败',result.message)
                    }
                },"post")
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    //获取搜索条件
    handleChange(value) {
        this.setState({
            conditionSelected: value
        })
        console.log(value);
    }

    //查询搜索结果
    search(value){

        if(this.state.conditionSelected === 1){//按模板分类名称搜索
            let option = {
                assortmentName: value
            };
            console.log(option)

            this.handleAjax("/assortment/findModuleAssortmentDetail",option,(result) => {
                console.log(result);
                if(result.success === true){
                    this.setState({
                        list: result.object
                    })
                }else{
                    // Modal.error({
                    //     title: result.msg
                    // });
                }
            },"get")

        }else{//按模板分类编号搜索
            let option = {
                assortmentNo: value
            };
            console.log(option)

            this.handleAjax("/assortment/findAssortmentDetailByNo",option,(result) => {
                console.log(result);
                if(result.success === true){
                    this.setState({
                        list: result.object
                    })
                }else{
                    // Modal.error({
                    //     title: result.msg
                    // });
                }
            },"get")
        }
    }

    showModal = (assortmentNo,assortmentName,remarks) => {

        let title;
        if(assortmentNo === ''){
            title = '添加模板分类'
        }else{
            title = '修改模板分类'
        }

        this.setState({
            visible: true,
            assortmentNo: assortmentNo,
            assortmentName: assortmentName,
            remarks: remarks,
            title: title
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            assortmentNo: '',
            assortmentName: '',
            remarks: '',
            title: '添加模板分类'
        });
    }

    //提交模板分类表单信息
    handleCreate = () => {
        let that = this;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {

            if (err) {
                return;
            }

            let option;
            let url;
            let msg;
            if(that.state.assortmentNo === ''){
                 option = values;
                 url = "assortment/addModuleAssortment";
                 msg = "添加模板分类成功";
            }else{
                option = {
                    assortmentNo: this.state.assortmentNo,
                    assortmentName: values.assortmentName,
                    remarks: values.remarks
                };
                url = "assortment/updateModuleAssortment";
                msg = "修改模板分类成功";
            }

            this.handleAjax(url,option,(result) => {
                console.log(result);
                if(result.success === true){
                    openNotificationWithIcon('success',msg,'');
                    //请求模板分类列表
                    that.handleAjax("assortment/showModuleAssortment","",(result) => {
                        console.log(result);
                        if(result.success === true){
                            that.setState({
                                list: result.object
                            })
                        }else{
                            // Modal.error({
                            //     title: result.msg
                            // });
                        }
                    },"post")


                }else{
                    Modal.error({
                        title: result.message
                    });
                }
            },"get");

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }


    render(){
        return(
            <div>
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="moduleClassify-wrapper">
                        <div className="moduleClassify-condition-wrapper">
                            <Button type="primary" onClick={() => this.showModal('','','')}><Icon type="plus" />添加模板分类</Button>
                            <Select defaultValue="1" style={{ width: 100,marginRight: '10px' }} onChange={(value) => this.handleChange(value)}>
                                <Option value="1">分类名称</Option>
                                <Option value="2">分类编号</Option>
                            </Select>
                            <Search
                                placeholder="模板分类名称/编号"
                                onSearch={(value) => this.search(value)}
                                enterButton
                            />
                        </div>
                        <div>
                            {this.state.list.map((item,index) => {
                                return(
                                    <Card key={index}
                                          title={item.assortmentName}
                                          extra={<Icon type="close" onClick={() => this.deleteClassify(item.assortmentNo)} title="删除"/> }
                                          style={{ width: '30%' }}

                                    >
                                        <p>分类编号：{item.assortmentNo}</p>
                                        <p title={item.remarks}>备注：{item.remarks}</p>
                                        <Icon title="编辑" type="edit" onClick={() => this.showModal(item.assortmentNo,item.assortmentName,item.remarks)}/>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        assortmentNo={this.state.assortmentNo}
                        assortmentName={this.state.assortmentName}
                        remarks={this.state.remarks}
                        title={this.state.title}
                    />
                </div>
            </div>

        )
    }
}

export default ModuleClassify