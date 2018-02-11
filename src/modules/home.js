export const SHOW_FORGET_PWD = 'home/SHOW_FORGET_PWD';
const initialState = {
    isForgetPwd:false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SHOW_FORGET_PWD:
            return {
                ...state,
                isForgetPwd: !state.isForgetPwd
            };

        default:
            return state
    }
}

export const dispatch_func = {
    showForgetPwd : () => {
        return dispatch => {
            dispatch({
                type: SHOW_FORGET_PWD
            });
        }
    },


};