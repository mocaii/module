import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import './index.css'

class AddData extends Component{
    constructor(props){
        super(props);
        let cookie = document.cookie.split(";");
        let mobile = cookie[cookie.length - 1];
        this.state ={
            mobile: mobile,
            pageSize: 15,
            pageNo: 1
        };

        let option = {
            mobile: mobile,
            pageSize: 15,
            pageNo: 1
        }

        this.handleAjax("module/findOwnModuleData",option,(result) => {
            console.log(result)
        },"get")
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
                <Header />
                <div className="wrapper">
                    <MenuBar/>
                    <div className="moduleData-wrapper">

                    </div>
                </div>

            </div>

        )
    }
}

export default AddData