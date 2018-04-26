import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import home from './home'
import common from './common'
import login from './login'

export default combineReducers({
    router: routerReducer,
    home,
    common,
    login
})