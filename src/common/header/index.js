import React,{Component} from 'react'
import './index.css'
// import {Link} from 'react-router-dom'
import {  Modal } from 'antd';

const confirm = Modal.confirm;



class Header extends Component{
    constructor(props){
        super(props);
        this.state ={
            userInfoOperate: false
        }
    }

    //显示或收起修改信息，退出登录c操作
    showUserInfoOperate(){
        this.setState({
            userInfoOperate: !this.state.userInfoOperate
        })
    }

    //退出登录
    logOut(){
        let that = this
        confirm({
            title: "确定退出登录吗？",
            onOk() {
                that.handleAjax("/sysuser/logout","",(result) => {
                    console.log(result);
                    if(result.result === true){
                        window.location.replace("/login");
                    }else{
                        Modal.error({
                            title: result.msg
                        });
                    }
                },"post")
            },
            onCancel() {},
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

    render(){
        return(
            <div>
                <div className="header-wrapper">
                    <img src="static/image/module.png" alt="" className="module-pic"/>
                    <img src="logo.png" alt="" className="module-text-pic"/>
                    <div  className="avatar-pic">
                        <img src="static/image/Logout.png" alt="" onClick={() => this.logOut()}  title="退出登录"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header