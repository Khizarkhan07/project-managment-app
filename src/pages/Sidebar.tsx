import React, {useCallback, useEffect, useMemo, useState} from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd' ;
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';
import '../App.css'
import {Route, Switch, withRouter} from "react-router";
import Login from "./auth/Login";
import {getAuthenticatedUser, retriveData, store} from "../utils";
import {useAuthContext} from "../contexts/authContext";
import PrivateRoute from "./auth/PrivateRoute";
import ProjectsHome from "./projects/ProjectsHome";
import CreateProject from "./projects/CreateProject";
import UserProjects from "./projects/UserProjects";
import {useWorkspaceContext} from "../contexts/worskspaceContext";
import SingleWorkspace from "./workspace/SingleWorkspace";
import ProjectReviews from "./reviews/projectReviews";
import CreateModal from "../components/createModal";
import {useProjectContext} from "../contexts/projectContext";
import {useReviewContext} from "../contexts/reviewContext";
import { ContentWrapper, LayoutWrapper } from '../app.styles';
const { SubMenu } = Menu;
const {  Content, Sider } = Layout;
const Sidebar = () => {
    const {state, dispatch} = useAuthContext();
    const {state: workspaceState, dispatch:workspaceDispatch } = useWorkspaceContext();
    const {state: projectState, dispatch:projectDispatch } = useProjectContext();
    const {state: reviewState, dispatch:reviewDispatch } = useReviewContext();
    const [visible, setVisible] = React.useState(false);
    const [teamVisible, setTeamVisible] = React.useState(false);
    const [name, setName] = React.useState('');


    useEffect(()=> {
        if(retriveData("userData")){
            const data = retriveData("userData");
            dispatch({type: 'currentUsers', payload: data})
        }
        else  {
            store(state.users, "userData")
        }
        if(retriveData("workspaceData")){
            const data = retriveData("workspaceData");
            workspaceDispatch({type: 'CURRENT_WORKSPACES', payload: data})

        }
        else  {
            store(workspaceState.workspaces, "workspaceData")
        }

        if(retriveData("projectData")){
            const data = retriveData("projectData");
            projectDispatch({type: 'CURRENT_PROJECTS', payload: data})
        }
        else  {
            store(projectState.projects, "projectData")
        }
        if(retriveData("reviewData")){
            const data = retriveData("reviewData");
            reviewDispatch({type: 'CURRENT_REVIEWS', payload: data})
        }
        else  {
            store(reviewState.reviews, "reviewData")
        }

    },[])

    const showModal = useCallback(() => {
        setVisible(true);
    }, [visible]);

    const showTeamModal = useCallback(() => {
        setTeamVisible(true);
    }, [teamVisible]);

    const handleTeamCancel = useCallback( () => {
        setTeamVisible(false);
    }, [teamVisible]);


    const handleTeamOK = useCallback(()=> {
        dispatch({type: 'AddTeamMember', payload: name})
        setTeamVisible(false)
    }, [name])

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
            <CreateModal label={"Member Name"} placeholder={"Team Member name"}   onChange={handleName} onSubmit={handleTeamOK} visible={teamVisible} title={"Add Team Member"} onCancel={handleTeamCancel}/>
            <CreateModal label={"Workspace Name"} placeholder={"Enter Workspace name"} onChange={handleName} onSubmit={handleOk} visible={visible} title={"Create Workspace"} onCancel={handleCancel}/>
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


                    <SubMenu key="sub4" icon={<LaptopOutlined />} title="Team">
                        {getAuthenticatedUser().role === 'Manager' && <Menu.Item key="8" onClick={showTeamModal}> Add team member </Menu.Item>}
                    </SubMenu>

                </Menu>
            </Sider>

            <LayoutWrapper>
                <ContentWrapper>
                    <Switch>
                        <Route component={Login} path={'/login'}/>
                        <PrivateRoute component = {CreateProject} path ='/create' />
                        <PrivateRoute component = {UserProjects} path ='/myProjects' />
                        <PrivateRoute component = {SingleWorkspace} path ='/workspace/:id' />
                        <PrivateRoute component = {ProjectReviews} path ='/project/reviews/:id' />
                        <PrivateRoute component = {ProjectsHome} path ='/' />
                    </Switch>
                </ContentWrapper>
            </LayoutWrapper>
        </Layout>
    );
}

export default withRouter(Sidebar);