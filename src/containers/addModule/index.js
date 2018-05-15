import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import './index.css'
import { Form, Input, Icon, Button,Select,notification   } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;


const openNotificationWithIcon = (type,message) => {
    notification[type]({
        message: message,
        description: '',
    });
};

let uuid = 0;
class DynamicFieldSet extends React.Component {
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err &&  values.keys.length != 0) {
                console.log('Received values of form: ', values);

                console.log(this.props.moduleClassify);

                // let fields =  values.names.join();
                // console.log(fields)

                let option = {
                    assortmentNo: this.props.moduleClassify,
                    mobile: this.props.mobile,
                    fields: values.names.join()
                }
                console.log(option)
                this.handleAjax("module/addModule",option,(result) => {
                    console.log(result)
                    if(result.success === true){
                        openNotificationWithIcon('success',result.message);
                    }else{
                        openNotificationWithIcon('error',result.message)
                    }
                },'GET')
            }
        });
    };

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

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 20, offset: 4 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? '模板字段' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入模板字段名！",
                        }],
                    })(
                        <Input placeholder="请输入字段名" style={{ width: '60%', marginRight: 8 }} />
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                        />
                    ) : null}
                </FormItem>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add field
                    </Button>
                </FormItem>
                <FormItem {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);


class AddModule extends Component{
    constructor(props){
        super(props);
        let cookie = document.cookie.split(";");
        let mobile = cookie[cookie.length - 1];
        this.state ={
            mobile: mobile,
            list: [],
            moduleClassify: ""
        };
    }

    componentDidMount(){
        //请求模板分类列表
        this.handleAjax("assortment/showModuleAssortment","",(result) => {
            console.log(result);
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

    handleChange(value) {
        // console.log(value);
        this.setState({
            moduleClassify: value,
        })
    }

    render(){
        console.log(this.state.moduleClassify)
        return(
            <div>
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="addModule-wrapper">
                        <div className="moduleClassify">
                            <span className="moduleClassify-label">模板分类：</span>
                            <Select defaultValue="请选择模板分类" style={{ width: 150 }} onChange={(value) => this.handleChange(value)}>
                                {this.state.list.map((item,index) =>{
                                    return(
                                        <Option value={item.assortmentNo} key={item.assortmentNo}>{item.assortmentName}</Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <WrappedDynamicFieldSet
                            moduleClassify={this.state.moduleClassify}
                            mobile={this.state.mobile}
                        />
                    </div>
                </div>

            </div>

        )
    }
}

export default AddModule