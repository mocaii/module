import React,{Component} from 'react'
// import { dispatch_func } from '../../../modules/modifyPwd'
import style from './index.module.css';
import './index.css';
import cln from 'classnames'
import { Button, Modal, Form, Input } from 'antd';

//form
const FormItem = Form.Item;

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
class ModifyPwdForm extends React.Component {
    // handleSubmit=(e)=>{
    //     e.preventDefault();
    //     this.props.form.
    // }

    onFieldsChange=()=>{}
    onFieldsChange(props, changedFields) {
        props.onChange(changedFields);
    }
    mapPropsToFields(props) {
        return {
            username: Form.createFormField({
                ...props.username,
                value: props.username.value,
            }),
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        let props = this.props
        return (
            <Modal
                title="修改密码"
                wrapClassName="vertical-center-modal"
                visible={props.isShow}
                onOk={()=>{props.handleOk()}}
                onCancel={()=>{props.hideModal()}}
                okText="确认"
                cancelText="取消"
            >
                <Form layout="vertical">
                    <FormItem
                        {...formItemLayout}
                        label="原密码："
                    >
                        {getFieldDecorator('oldPwd', {
                            rules: [{required: true, message: '原密码不能为空'}],
                        })(
                            <Input
                                onChange={()=>{this.handleNumberChange}}
                                placeholder="请选择"/>
                        )}
                    </FormItem>
                    <FormItem label="新密码："
                        {...formItemLayout}
                    >
                        {getFieldDecorator('newPwd', {
                            rules: [{required: true, message: '新密码不能为空'}],
                        })(
                            <Input placeholder="请输入"/>
                        )}
                    </FormItem>
                    <FormItem label="确认密码"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('repeatPwd', {
                            rules: [
                                {required: true, message: '确认密码不能为空'},
                                // {value:newPwd.value,message:"两次密码输入不一致"}
                            ],
                        })(
                            <Input placeholder="请输入"
                            />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        )

    }
}

// const ModifyPwd = props => (
//     <div className={style.modifyPwd}>
//         <Modal
//             title="修改密码"
//             wrapClassName="vertical-center-modal"
//             visible={props.isShow}
//             onOk={()=>{props.handleOk()}}
//             onCancel={()=>{props.hideModal()}}
//             okText="确认"
//             cancelText="取消"
//         >
//
//
//
//             <Form onSubmit={this.handleSubmit}>
//
//                 <FormItem
//                     label="Password"
//                 >
//                     {getFieldDecorator('password', {
//                         rules: [{
//                             required: true, message: 'Please input your password!',
//                         }, {
//                             validator: this.checkConfirm,
//                         }],
//                     })(
//                         <Input type="password" />
//                     )}
//                 </FormItem>
//                 <FormItem
//                     label="Confirm Password"
//                 >
//                     {getFieldDecorator('confirm', {
//                         rules: [{
//                             required: true, message: 'Please confirm your password!',
//                         }, {
//                             validator: this.checkPassword,
//                         }],
//                     })(
//                         <Input type="password" onBlur={this.handleConfirmBlur} />
//                     )}
//                 </FormItem>
//
//             </Form>
//
//
//         </Modal>
//     </div>
// );

const ModifyPwd = Form.create()(ModifyPwdForm);
export default ModifyPwd