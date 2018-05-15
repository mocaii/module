import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import { Card,Input,Select,Button,Icon,Pagination,Form,Modal,Checkbox, Row, Col  } from 'antd';
import './index.css'

const Search = Input.Search;
const Option = Select.Option;

class ModuleData extends Component{
    constructor(props){
        super(props);
        let cookie = document.cookie.split(";");
        let mobile = cookie[cookie.length - 1];
        this.state ={
            mobile: mobile,
            pageSize: 15,
            pageNo: 1,
            totalCount: 0,
            moduleData:[],
            searchModuleId:"",
            visible: false,
            fields: [],
            title: "",
            modalType: "",
            selectFields: "",
            selectModuleId: ""
        };

        let option = {
            pageSize: 15,
            pageNo: 1
        }

        this.handleAjax("/module/findOwnModuleData",option,(result) => {
            console.log(result);
            if(result.success === true){
                let moduleData = result.object;
                let totalCount = result.object[0].totalCount;

                moduleData.shift();//删除分页信息

                let newModuleData = [];
                for(let i = 0;i < moduleData.length;i++){
                    var obj;
                    if(i % 2 === 0 ){
                        obj = new Object();
                        obj.fields = moduleData[i]
                    }else{
                        obj.otherData = moduleData[i];
                        newModuleData.push(obj)
                    }
                }

                this.setState({
                    totalCount: totalCount,
                    moduleData: newModuleData
                })
            }
        },"get")
    }

    search(value){
        console.log(value);

        let option = {
            moduleId: value
        }
        this.handleAjax("/module/findModuleByModuleData",option,(result) => {

            if(result.success === true){
                let moduleData = result.object;
                let totalCount = result.object[0].totalCount;

                moduleData.shift();//删除分页信息

                let newModuleData = [];
                for(let i = 0;i < moduleData.length;i++){
                    var obj;
                    if(i % 2 === 0 ){
                        obj = new Object();
                        obj.fields = moduleData[i]
                    }else{
                        obj.otherData = moduleData[i];
                        newModuleData.push(obj)
                    }
                }
                console.log(newModuleData);
                this.setState({
                    totalCount: totalCount,
                    moduleData: newModuleData,
                    searchModuleId: value
                })
            }
        },"GET")
    }

    //翻页
    onChange(value){

        let option;
        if(this.state.searchModuleId === ""){
            option = {
                pageSize: 15,
                pageNo: value
            }
        }else{
            option = {
                pageSize: 15,
                pageNo: value,
                moduleId: this.state.searchModuleId
            }
        }

        console.log(option);

        this.handleAjax("/module/findOwnModuleData",option,(result) => {
            if(result.success === true){
                let moduleData = result.object;
                let totalCount = result.object[0].totalCount;

                moduleData.shift();//删除分页信息

                let newModuleData = [];
                for(let i = 0;i < moduleData.length;i++){
                    var obj;
                    if(i % 2 === 0 ){
                        obj = new Object();
                        obj.fields = moduleData[i]
                    }else{
                        obj.otherData = moduleData[i];
                        newModuleData.push(obj)
                    }
                }
                console.log(newModuleData);
                this.setState({
                    totalCount: totalCount,
                    moduleData: newModuleData
                })
            }
        },"get")
    }

    showModal = (fields,moduleId) => {
        console.log(fields);

        let arr = [];
        for(let i in fields){
            let obj = new Object();
            obj.name = i;
            obj.value = fields[i]
            arr.push(obj);
        }

        let title = "";
        let modalType = "";
        if(moduleId === ""){
            title = "模板数据";
            modalType = 1;
        }else{
            title = "导出特定字段的模板数据";
            modalType = 2;
        }

        console.log(arr);
        this.setState({
            visible: true,
            fields: arr,
            title: title,
            modalType: modalType,
            selectModuleId: moduleId
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    onChangeSelect(checkedValues) {
        console.log('checked = ', checkedValues);
        console.log(checkedValues.join());

        this.setState({
            selectFields: checkedValues.join()
        })

    }

    //导出模板数据
    checkout(moduleId){
        let a = document.createElement("a");
        a.href = "/module/exportData?moduleId="+moduleId;
        a.click();
    }

    //根据字段导出数据
    fieldsCheckout(){

        let a = document.createElement("a");
        a.href = "/module/exportDataByFields?moduleId="+this.state.searchModuleId+"&fields="+this.state.selectFields;
        a.click();
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
            <div className="moduleData">
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="moduleData-wrapper">
                        <div className="moduleList-content-header">
                            <Search
                                placeholder="模板编号"
                                onSearch={(value) => this.search(value)}
                                enterButton
                            />
                        </div>
                        <div className="content">
                            <ul className="table-head">
                                <li>模板编号</li>
                                <li>模板分类</li>
                                <li>创建人</li>
                                <li>创建时间</li>
                                <li>操作</li>
                            </ul>
                            {this.state.moduleData.map((item,index) => {
                                return(
                                    <ul className="table-content" key={index}>
                                        <li>{item.otherData.moduleId}</li>
                                        <li>{item.otherData.assortmentName}</li>
                                        <li>{item.otherData.createName}</li>
                                        <li>{item.otherData.createTime}</li>
                                        <li>
                                            <Icon type="copy" title="查看" onClick={() => this.showModal(item.fields,"")}/>&nbsp;&nbsp;&nbsp;
                                            <Icon type="download" title="导出" onClick={() => this.checkout(item.otherData.moduleId)}/>&nbsp;&nbsp;&nbsp;
                                            <Icon type="select" title="选择字段导出" onClick={() => this.showModal(item.fields,item.otherData.moduleId)}/>
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                        <div className="page-wrapper" style={{display: parseInt(this.state.totalCount) === 0 ? 'none' : 'block'}}>
                            <Pagination defaultCurrent={1} pageSize={15} total={this.state.totalCount} onChange={(value) => this.onChange(value)}/>
                        </div>
                    </div>
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    handleOk={this.handleOk}
                >
                    <div style={{display: parseInt(this.state.modalType) === 1 ? 'block' : 'none'}}>
                        {this.state.fields.map((item,index)=> {
                            return(
                                <p key={index}>
                                    <span>{item.name}：</span>
                                    <span>{item.value}</span>
                                </p>
                            )
                        })}
                    </div>
                    <div style={{display: parseInt(this.state.modalType) === 1 ? 'none' : 'block'}}>
                        <Checkbox.Group style={{ width: '100%' }} onChange={(value) => this.onChangeSelect(value)}>
                            <Row>
                                {this.state.fields.map((item,index) => {
                                    return(
                                        <Col span={8} key={index}><Checkbox value={item.name}>{item.name}</Checkbox></Col>
                                    )
                                })}
                            </Row>
                        </Checkbox.Group>
                        <Button type="primary" onClick={() => this.fieldsCheckout()}><Icon type="download"/>导出数据</Button>
                    </div>

                </Modal>
            </div>

        )
    }
}

export default ModuleData