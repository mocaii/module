//判断对象是否为空
export const isNullValue = (input) => {
    return input === undefined || input === null || input === '' || input.trim() === '';
};


//获取URL参数
export const getQueryParam = (key) => {
    let reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)");
    let result = window.location.search.substr(1).match(reg);
    return result?decodeURIComponent(result[2]):null;
};


//获取当前日期
export const getNowFormatDate = () =>{
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return year + seperator1 + month + seperator1 + strDate;
};


//获取数组对象中的值
export const getArrText = (value,obj) => {
    if(typeof obj === "undefined"){
        return "";
    }

    let newArr = obj.filter((obj)=>{
        return obj.value === value;
    });
    return newArr.length > 0 ? newArr[0].text : "";
};


//封装ajax
// export const handleAjax = (url, options, successHandle, requestType, contentType) => {
//     requestType = requestType || "get";
//     contentType = contentType || "application/x-www-form-urlencoded";
//     $.ajax({
//         type:requestType,
//         url: url,
//         dataType:'json',
//         data:options,
//         contentType: contentType,
//         cache: false,
//         success: (result)=>{
//             successHandle(result);
//         }
//     });
// };


//封装fetch
export const myFetch = (api,params) => {
    params = params || {};

    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            const error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    };

    const parseJSON = (response) => {
        return response.json()
    };

    return fetch(api, {
        method: params.method || 'GET',
        credentials: params.credentials || 'include',
        headers: params.headers || {
            'Accept': 'application/json',
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: typeof params.body !== "object" ? {} : Object.keys(params.body).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params.body[key]);
        }).join('&')
    })
        .then(checkStatus)
        .then(parseJSON)
};


//获取静态资源的部署路径
export const public_url = process.env.PUBLIC_URL;


//区分开发环境，用于开发环境环境设置值
export const returnVal = (devValue, value) => {
    if (process.env.NODE_ENV === 'development') {
        return devValue;
    }
    else {
        return value;
    }
};
