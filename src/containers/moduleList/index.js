import React,{Component} from 'react'
import Header from '../../common/header'
import MenuBar from '../../common/menuBar'
import './index.css'

class ModuleList extends Component{
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

        this.handleAjax("module/findOwnModule",option,(result) => {
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
                <div>
                    <MenuBar/>
                    <div className="moduleClassify-wrapper">

                    </div>
                </div>

            </div>

        )
    }
}

export default ModuleList