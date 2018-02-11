import React from 'react';
import { Route } from 'react-router-dom'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LoadableFunc from '../../common/loadable'
import './index.module.scss'

const Home = LoadableFunc(import('../home'));

const App = () => (
    <LocaleProvider locale={zhCN}>
        <div>
            <Route exact path="/" component={Home}/>
        </div>
    </LocaleProvider>
);

export default App