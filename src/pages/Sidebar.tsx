import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import '../App.css'
import {Route, Switch, withRouter} from "react-router";
import Login from "./auth/Login";
import {getAuthenticatedUser} from "../utils";
import {useAuthContext} from "../contexts/authContext";
import PrivateRoute from "./auth/PrivateRoute";
import ProjectsHome from "./projects/ProjectsHome";
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
const Sidebar = () => {
    const {state, dispatch} = useAuthContext();

    const handleLogout = useCallback(()=> {
        dispatch({type: 'Logout', payload: 'Logged out successfully!'})
    }, [state])

    return (
        <Layout>
            <Sider width={300} className="site-layout-background menu-style">
                <Menu
                    theme={"dark"}
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">

                        {getAuthenticatedUser().username?
                            <Menu.Item key="1">
                                {getAuthenticatedUser().username}
                            </Menu.Item> :
                            <Menu.Item key="2">
                                <Link to={'/login'}> Login </Link>
                            </Menu.Item>}
                        <Menu.Item key="3" onClick={handleLogout}>
                            Logout
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                        <Menu.Item key="5">option5</Menu.Item>
                        <Menu.Item key="6">option6</Menu.Item>
                        <Menu.Item key="7">option7</Menu.Item>
                        <Menu.Item key="8">option8</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                        <Menu.Item key="9">option9</Menu.Item>
                        <Menu.Item key="10">option10</Menu.Item>
                        <Menu.Item key="11">option11</Menu.Item>
                        <Menu.Item key="12">option12</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

            <Layout style={{ padding: '0 24px 24px', marginTop: '10px' }}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <Switch>
                        <Route component={Login} path={'/login'}/>
                        <PrivateRoute component = {ProjectsHome} path ='/' />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default withRouter(Sidebar);