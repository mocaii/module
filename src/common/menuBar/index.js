import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import {  Icon, Button,Menu } from 'antd';

const SubMenu = Menu.SubMenu;

class MenuBar extends Component {
    state = {
        collapsed: false,
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <div style={{maxWidth: '200px',flex: 'none'}}>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1">
                        <Link to="/moduleClassify">
                            <Icon type="pie-chart" />
                            <span>模板分类</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>管理模板</span></span>}>
                        <Menu.Item key="5"><Link to="/moduleList">模板列表</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/addModule">添加模板</Link></Menu.Item>
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="3">
                        <Link to="/userInfo">
                            <Icon type="pie-chart" />
                            <span>用户信息</span>
                        </Link>
                    </Menu.Item>
                </Menu>
                <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
            </div>
        );
    }
}
export default MenuBar