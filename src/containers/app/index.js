import React from 'react';
import { Route } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LoadableFunc from '../../common/loadable'
import './index.module.scss'

const Home = LoadableFunc(import('../home'));
const Login = LoadableFunc(import('../login'));
const ModuleClassify = LoadableFunc(import('../moduleClassify'));
const ModuleList = LoadableFunc(import('../moduleList'));
const UserInfo = LoadableFunc(import('../userInfo'));
const AddModule = LoadableFunc(import('../addModule'));

const App = () => (
    <LocaleProvider locale={zhCN}>
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/moduleClassify" component={ModuleClassify}/>
            <Route exact path="/moduleList" component={ModuleList}/>
            <Route exact path="/userInfo" component={UserInfo}/>
            <Route exact path="/addModule" component={AddModule}/>
        </div>
    </LocaleProvider>
);

export default App