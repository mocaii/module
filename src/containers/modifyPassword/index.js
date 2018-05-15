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
                //提交密码

                that.handleAjax("/sysuser/updateUserPassword",values,(result)=>{
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
                    label="原密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入原密码！' }],
                    })(
                        <Input  style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="新密码"
                >
                    {getFieldDecorator('newPass', {
                        rules: [{ required: true, message: '请输入新密码密码！' }],
                    })(
                        <Input  style={{ width: '100%' }} />
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

class ModifyPassword extends Component{

    render(){
        return(
            <div>
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="userInfo-wrapper">
                        <div className="userInfo-title">修改密码</div>
                        <WrappedRegistrationForm />
                    </div>
                </div>

            </div>

        )
    }
}

export default ModifyPassword
