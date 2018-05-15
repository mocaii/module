import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import './index.css'
import { Card,Input,Select,Button,Icon,Pagination,Form,Modal,Upload, message,   } from 'antd';
import {notification} from "antd/lib/index";

const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;
const confirm = Modal.confirm;

const openNotificationWithIcon = (type,message) => {
    notification[type]({
        message: message,
        description: '',
    });
};

//上传文件
const props = {
    name: 'file',
    action: '/module/importData',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

//新增模板表单
const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;

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
                            {getFieldDecorator('assortmentNo', {
                                rules: [{ required: true, message: '请选择模板分类！' }],
                                initialValue: "请选择模板分类"
                            })(
                                <Select style={{ width: 150 }}>
                                    {this.props.list.map((item,index) =>{
                                        return(
                                            <Option  key={index} value={item.assortmentNo}>{item.assortmentName}</Option>
                                        )
                                    })}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="模板字段（模板字段以,间隔开）">
                            {getFieldDecorator('fields',{
                                rules: [{ required: true, message: '请输入模板字段，并以逗号隔开！' }]
                            })
                            (<Input type="textarea"  />)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            );
        }
    }
);

//添加模板数据表单
const AddModuleDataForm = Form.create()(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;

            return (
                <Modal
                    visible={visible}
                    title="添加模板数据"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        {this.props.moduleFields.map((item,index) => {
                            return(
                                <FormItem label={item} key={index}>
                                    {getFieldDecorator(item)(
                                        <Input/>
                                    )}
                                </FormItem>
                            )
                        })}
                    </Form>
                </Modal>
            );
        }
    }
);


class ModuleList extends Component{
    constructor(props){
        super(props);
        let cookie = document.cookie.split(";");
        let mobile = cookie[cookie.length - 1];
        this.state ={
            list: [],
            moduleClassify: "",
            visible: false,
            addDataVisible: false,
            moduleFields: [],
            editModuleId: "",
            conditionSelected:1,
            mobile: mobile,
            pageSize: 15,
            pageNo: 1,
            totalCount:0,
            moduleList:[]
        };
    }

    componentDidMount(){

        //获取模板列表
        let option = {
            mobile: this.state.mobile,
            pageSize: 15,
            pageNo: 1
        };
        this.handleAjax("module/findOwnModule",option,(result) => {
            console.log(result);
            if(result.success === true){

                //数据总条数
                let totalCount = result.object[0].totalCount;
                //删除object中的页码数据
                result.object.splice(0,1);
                let moduleList = result.object;

                this.setState({
                    totalCount: totalCount,
                    moduleList: moduleList
                })
            }
        },"get");


        //请求模板分类列表
        this.handleAjax("assortment/showModuleAssortment","",(result) => {

            if(result.success === true){
                this.setState({
                    list: result.object,
                })

                if(result.object.length > 0){
                    this.setState({
                        moduleClassify: result.object[0].assortmentNo,
                    })
                }
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


    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    showAddDataModal = (fields,moduleId) => {
        console.log(moduleId);
        console.log(fields);
        // fields = fields.replace("，",",");
        while(fields.indexOf("，")!=-1){  //寻找每一个中文逗号，并替换
            fields = fields.replace("，",",");
        }
        let moduleFields = fields.split(",");
        console.log(moduleFields);
        this.setState({
            addDataVisible: true,
            moduleFields: moduleFields,
            editModuleId: moduleId
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false,
            addDataVisible: false,
            assortmentNo: '',
            assortmentName: '',
            remarks: '',
            title: '添加模板分类'
        });
    }

    //提交模板表单信息
    handleCreate = () => {
        let that = this;
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {

            if (err) {
                return;
            }
            let fields = values.fields;
            while(fields.indexOf("，")!=-1){  //寻找每一个中文逗号，并替换
                fields = fields.replace("，",",");
            }
            let option = {
                assortmentNo: values.assortmentNo,
                fields: fields,
                mobile: this.state.mobile
            }
            console.log(option);
            this.handleAjax("module/addModule",option,(result) => {
                if(result.success === true){
                    openNotificationWithIcon('success',result.message,'');

                    //获取模板列表
                    let option = {
                        mobile: this.state.mobile,
                        pageSize: 15,
                        pageNo: 1
                    }
                    this.handleAjax("module/findOwnModule",option,(result) => {
                        if(result.success === true){

                            //数据总条数
                            let totalCount = result.object[0].totalCount;
                            //删除object中的页码数据
                            result.object.splice(0,1);
                            let moduleList = result.object;

                            this.setState({
                                totalCount: totalCount,
                                moduleList: moduleList
                            })
                        }
                    },"get")


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

    //提交模板数据
    handleAddDataCreate = () => {
        let that = this;
        const form = this.formAddDataRef.props.form;
        form.validateFields((err, values) => {

            if (err) {
                return;
            }

            console.log("添加数据");
            values.moduleId = this.state.editModuleId;
            let option = {
                jsonValue: JSON.stringify(values),
                mobile: this.state.mobile
            }
            console.log(option)
            this.handleAjax("/module/addModuleData",option,(result) => {
                console.log(result);
                if(result.success === true){
                    openNotificationWithIcon('success',result.message,'');

                }else{
                    Modal.error({
                        title: "添加数据失败！"
                    });
                }
            },"post");

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    saveAddDataFormRef = (formRef) => {
        this.formAddDataRef = formRef;
    }

    //删除模板
    deleteModule(value){

        console.log(value);
        let that = this;
        confirm({
            title: '确定删除该模板吗?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                let option ={
                    moduleId: value
                }
                that.handleAjax("module/deleteModule",option,(result) => {
                    console.log(result);
                    if(result.success === true){
                        openNotificationWithIcon('success',result.message,'');

                        //获取模板列表
                        let option = {
                            mobile: that.state.mobile,
                            pageSize: 15,
                            pageNo: 1
                        }
                        that.handleAjax("module/findOwnModule",option,(result) => {
                            if(result.success === true){

                                //数据总条数
                                let totalCount = result.object[0].totalCount;
                                //删除object中的页码数据
                                result.object.splice(0,1);
                                let moduleList = result.object;

                                that.setState({
                                    totalCount: totalCount,
                                    moduleList: moduleList
                                })
                            }
                        },"get")

                    }else{
                        openNotificationWithIcon('error',result.message,'')
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

    //搜索
    search(value){
        console.log(this.state.conditionSelected);
        let option;
        let url;
        if(this.state.conditionSelected === 1){
            url = "module/findModuleByModuleId";
            option = {
                moduleId: value
            }
        }else{
            url = "module/findModuleByAssortment";
            option = {
                assortmentNo: value
            }
        }

        this.handleAjax(url,option,(result) => {
            if(result.success === true){
                console.log(result)

                //数据总条数
                // let totalCount = result.object[0].totalCount;
                let totalCount = 1;
                //删除object中的页码数据
                result.object.splice(0,1);
                let moduleList = result.object;

                this.setState({
                    totalCount: totalCount,
                    moduleList: moduleList
                })
            }else{
                openNotificationWithIcon('error',result.message,'')
            }

        },"get")
    }

    downloadModule(value){
        console.log(value);
        let option = {
            moduleId: value
        };

        let a = document.createElement("a");
        a.href = "/module/exportModule?moduleId="+value;
        a.click();

        // let form = document.createElement("form");
        // form.action = "/module/exportModule?moduleId="+value;
        // form.method = "get";
        // form.submit();

        this.handleAjax("/module/exportModule",option,(result) => {
            console.log(result)
        },"GET")
    }

    render(){
        return(
            <div>
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="moduleList-wrapper">
                        <div className="moduleList-content-header">
                            <div className="upload-wrapper">
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> 导入模板
                                    </Button>
                                </Upload>
                            </div>

                            <Button type="primary" onClick={() => this.showModal()}><Icon type="plus"/>创建模板</Button>
                            <Select defaultValue="1" style={{ width: 100,marginRight: '10px' }} onChange={(value) => this.handleChange(value)}>
                                <Option value="1">模板编号</Option>
                                <Option value="2">模板分类编号</Option>
                            </Select>
                            <Search
                                placeholder="模板编号/模板分类编号"
                                onSearch={(value) => this.search(value)}
                                enterButton
                            />
                        </div>
                        <div>
                            {this.state.moduleList.map((item,index) => {
                                return(
                                    <Card title={"编号："+item.moduleId} key={index} style={{ width: '30%' }}>
                                        <p>模板分类名称：{item.assortmentName}</p>
                                        <p>创建人：{item.createName}</p>
                                        <p>创建时间：{item.createTime}</p>
                                        <p>字段：{item.fields}</p>
                                        <div className="card-bottom">
                                            <Icon type="edit" title="添加数据" onClick={() => this.showAddDataModal(item.fields,item.moduleId)}/>
                                            <Icon type="delete" title="删除" onClick={() => this.deleteModule(item.moduleId)}/>
                                            <Icon type="download" title="导出模板" onClick={() => this.downloadModule(item.moduleId)}/>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                        <div className="page-wrapper" style={{display: parseInt(this.state.totalCount) === 0 ? 'none' : 'block' }}>
                            <Pagination defaultCurrent={1} pageSize={15} total={this.state.totalCount} />
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
                        list={this.state.list}
                    />
                    <AddModuleDataForm
                        wrappedComponentRef={this.saveAddDataFormRef}
                        onCancel={this.handleCancel}
                        onCreate={this.handleAddDataCreate}
                        visible={this.state.addDataVisible}
                        moduleFields={this.state.moduleFields}
                    />
                </div>

            </div>

        )
    }
}

export default ModuleList