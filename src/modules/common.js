/**
 * Created by chensongbing on 2018/2/7.
 */
const SHOW_MODIFY_PWD = 'common/SHOW_MODIFY_PWD';
const initialState = {
    showModifyPwd:false,
};

const showModifyPwdReducer =  (showModifyPwd=false, action)=>{
    switch(action.type)
    {
        case SHOW_MODIFY_PWD:
            return action.data;
        default:
            return showModifyPwd
    }
};
export default (state = initialState, action) => {
    return {
        showModifyPwd: showModifyPwdReducer(state.showModifyPwd, action)
    };
}

export const dispatch_common_func = {
    dispatch_show_modifyPwd: (data) => {
        return dispatch => {
            dispatch({
                type: SHOW_MODIFY_PWD,
                data: data
            });
        }
    }
}























