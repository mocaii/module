export const LOGIN_DATA = 'login/LOGIN_DATA';
export const LOGIN_OR_REGISTER = 'login/LOGIN_OR_REGISTER';


const initialState = {
    loginData:{
        username: "",
        password: ""
    },
    registerData:{
        username: "",
        password: ""
    },
    login: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_DATA:
            return {
                ...state,
                loginData: action
            };
        case LOGIN_OR_REGISTER:
            return {
                ...state,
                login: action.data
            };

        default:
            return state
    }
}

export const dispatch_func = {
    getLoginDataFunc : (data) => {
        return dispatch => {
            dispatch({
                type: LOGIN_DATA,
                data: data
            });
        }
    },
    loginOrRegisterFunc : (data) => {
        return dispatch => {
            dispatch({
                type: LOGIN_OR_REGISTER,
                data: data
            });
        }
    },


};