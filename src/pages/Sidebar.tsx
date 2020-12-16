import React, {useCallback, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd' ;
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import '../App.css'
import {Route, Switch, withRouter} from "react-router";
import Login from "./auth/Login";
import {getAuthenticatedUser} from "../utils";
import {useAuthContext} from "../contexts/authContext";
import PrivateRoute from "./auth/PrivateRoute";
import ProjectsHome from "./projects/ProjectsHome";
import CreateProject from "./projects/CreateProject";
import UserProjects from "./projects/UserProjects";
import {useWorkspaceContext} from "../contexts/worskspaceContext";
import SingleWorkspace from "./workspace/SingleWorkspace";
import ProjectReviews from "./reviews/projectReviews";
import CreateModal from "../components/createModal";
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
const Sidebar = () => {
    const {state, dispatch} = useAuthContext();
    const {state: workspaceState, dispatch:workspaceDispatch } = useWorkspaceContext();
    const [visible, setVisible] = React.useState(false);
    const [name, setName] = React.useState('');

    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);

    const handleOk = useCallback(()=> {
        workspaceDispatch({type: 'CREATE_WORKSPACE', payload: {name:name}})
        setVisible(false)
    }, [name])

    const handleCancel = useCallback( () => {
        setVisible(false);
    }, [visible]);


    const handleName = useCallback((e: React.ChangeEvent<HTMLInputElement>)=> {
        setName(e.target.value)
    }, [name])


    const handleLogout = useCallback(()=> {
        dispatch({type: 'Logout', payload: 'Logged out successfully!'})
    }, [state])


    const workspaces = useMemo(()=> {
        return workspaceState.workspaces.map((workspace) => {
            return (
                <Menu.Item key= {workspace.name + workspace.id}><Link to={`/workspace/${workspace.id}`}> {workspace.name} </Link></Menu.Item>
            )
        })
    },[workspaceState.workspaces])


    return (
        <Layout>
            <CreateModal onChange={handleName} onSubmit={handleOk} visible={visible} title={"Create Workspace"} onCancel={handleCancel}/>
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
                    <SubMenu key="sub3" icon={<LaptopOutlined />} title="Workspaces">
                        {getAuthenticatedUser().role === 'Manager' && <Menu.Item key="7" onClick={showModal}> Create Workspace </Menu.Item>}
                        {workspaces}
                    </SubMenu>
                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Projects">
                        {getAuthenticatedUser().role === 'Manager' && <Menu.Item key="4"><Link to={'/create'}> Create Project </Link></Menu.Item>}
                        <Menu.Item key="5"><Link to={'/'}> Current Projects </Link></Menu.Item>
                        <Menu.Item key="6"><Link to={'/myProjects'}> My projects </Link></Menu.Item>
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
                        <PrivateRoute component = {CreateProject} path ='/create' />
                        <PrivateRoute component = {UserProjects} path ='/myProjects' />
                        <PrivateRoute component = {SingleWorkspace} path ='/workspace/:id' />
                        <PrivateRoute component = {ProjectReviews} path ='/project/reviews/:id' />
                        <PrivateRoute component = {ProjectsHome} path ='/' />
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
}

export default withRouter(Sidebar);