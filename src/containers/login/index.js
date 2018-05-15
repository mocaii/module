import React,{Component} from 'react'
import { Form, Icon, Input, Button ,Modal  } from 'antd';
import './index.css'
import { dispatch_func } from '../../modules/login'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const FormItem = Form.Item;


class NormalLoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            login: true
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var option ={
                    mobile: values.mobile,
                    password: values.password,
                };
                console.log(option);
                this.handleAjax("/login",option,(result) => {
                    console.log(result);
                    if(result.success === true){
                        document.cookie = values.mobile;
                        window.location.replace("/moduleClassify");
                    }else{
                        Modal.info({
                            title: result.message,
                            onOk() {},
                        });
                    }
                },"post")
            }
        });
    };

    //切换至注册
    register(){
        this.props.loginOrRegisterFunc(false)
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
        // console.log(this.props);
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
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
                    })(
                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    <a onClick={() => this.register()}>立即注册</a>
                </FormItem>
            </Form>
        );
    }
}
class NormalRegisterForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var option ={
                    mobile: values.username,
                    password: values.password,
                };
                this.handleAjax("/sysuser/register",option,(result) => {
                    console.log(result);
                    if(result.success === true){
                        Modal.info({
                            title: result.message,
                            onOk() {
                                window.location.replace("/moduleClassify");
                            },
                        });
                    }
                },"get")

            }
        });
    };

    //切换至登录
    goBackLogin(){
        this.props.loginOrRegisterFunc(true)
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
        let that = this;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('mobile', {
                        rules: [{ required: true, message: '请输入正确的手机号码！' },
                            {
                                validator(rule, values, callback){
                                var reg = /^1[34578][0-9]{9}$/;
                                if(reg.test(values)){
                                    //判断手机号是否已经存在
                                    let option = {
                                        mobile: values
                                    };
                                    console.log("zhengque");
                                    that.handleAjax("/sysuser/getUserMobile",option,(result) => {
                                        console.log(result);
                                        if(result.success === true){
                                            callback();
                                        }else{
                                            callback(`改账号已经存在！`);
                                        }
                                    },"get");

                                }else{
                                    callback(`请输入正确的手机号码！`);
                                }
                            }
                        }],
                    })(
                        <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="手机号" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        注册
                    </Button>
                    <a onClick={() => this.goBackLogin()}>返回登录</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);

class Login extends Component{
    // constructor(props){
    //     super(props);
    //
    //     // this.handleAjax("assortment/showModuleAssortment","",(result) => {
    //     //     console.log(result)
    //     // },"get")
    // }


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

    render(){
        console.log(this.props)
        return(
            <div>
                <div style={{display: this.props.login ? 'block' : 'none'}}>
                    <WrappedNormalLoginForm
                        login={this.props.login}
                        loginOrRegisterFunc={this.props.loginOrRegisterFunc}
                    />
                </div>
                <div style={{display: this.props.login ? 'none' : 'block'}}>
                    <WrappedNormalRegisterForm
                        login={this.props.login}
                        loginOrRegisterFunc={this.props.loginOrRegisterFunc}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => (state.login);

const mapDispatchToProps = dispatch => bindActionCreators(dispatch_func, dispatch);

connect(
    mapStateToProps,
    mapDispatchToProps
)(WrappedNormalLoginForm);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

