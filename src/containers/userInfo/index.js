import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import './index.css'
import { Form, Input, Button, AutoComplete,notification} from 'antd';

const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

const openNotificationWithIcon = (type,message) => {
    notification[type]({
        message: message,
        description: '',
    });
};


class RegistrationForm extends React.Component {
    constructor(props){
        super(props);
        let cookie = document.cookie.split(";");
        let mobile = cookie[cookie.length - 1];

        this.state ={
            mobile: mobile,
            department: "",
            name: "",
            userEmail: ""
        }
    }

    componentWillMount(){
        let option = {
            mobile: this.state.mobile
        }

        //获取用户信息
        this.handleAjax("/sysuser/findUserMessage",option,(result) => {
            console.log(result);

            this.setState ={
                mobile: this.state.mobile,
                department: result.object.department,
                name: result.object.name,
                userEmail: result.object.userEmail,
            }

            console.log(this.state)

        },"GET");
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

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                //提交用户信息

                that.handleAjax("/sysuser/updateUserMessage",values,(result)=>{
                    console.log(result);
                    if(result.success === true){
                        openNotificationWithIcon('success',result.message);
                    }else{
                        openNotificationWithIcon('error',result.message)
                    }
                },"post")
            }
        });
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        console.log(this.state)
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="手机号码"
                >
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: '请输入手机号！' },
                            {
                                validator(rule, values, callback){
                                    var reg = /^1[34578][0-9]{9}$/;
                                    if(reg.test(values)){
                                        callback();
                                    }else{
                                        callback(`请输入正确的手机号码！`);
                                    }
                                }
                            }],
                        initialValue: this.state.mobile
                    })(
                        <Input  style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                        initialValue: this.state.name
                    })(
                        <Input  style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="院系"
                >
                    {getFieldDecorator('department',{
                        initialValue: this.state.department
                    })(
                        <Input  style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="E-mail"
                >
                    {getFieldDecorator('userEmail', {
                        rules: [{
                            type: 'email', message: '请输入有效的邮箱',
                        }],
                        initialValue: this.state.userEmail
                    })(
                        <Input />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

class UserInfo extends Component{

    render(){
        return(
            <div>
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="userInfo-wrapper">
                        <div className="userInfo-title">完善个人信息</div>
                        <WrappedRegistrationForm />
                    </div>
                </div>

            </div>

        )
    }
}

export default UserInfo