import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import { Layout } from 'antd';
import {Route, Switch, withRouter} from "react-router";
import Login from "./pages/auth/Login";
import PrivateRoute from "./pages/auth/PrivateRoute";
import CreateProject from "./pages/projects/CreateProject";
import UserProjects from "./pages/projects/UserProjects";
import SingleWorkspace from "./pages/workspace/SingleWorkspace";
import ProjectReviews from "./pages/reviews/projectReviews";
import ProjectsHome from "./pages/projects/ProjectsHome";
import {useAuthContext} from "./contexts/authContext";
import {useWorkspaceContext} from "./contexts/worskspaceContext";
import {useProjectContext} from "./contexts/projectContext";
import {useReviewContext} from "./contexts/reviewContext";
import {retriveData, store} from "./utils";
import TopNavbar from "./pages/Navbar/TopNavbar";
import SideBar from "./pages/Navbar/SideBar";
import {ContentWrapper, LayoutWrapper} from "./app.styles";
import AllTeam from "./pages/Team/AllTeam";

const Sidebar = () => {
    const {state, dispatch} = useAuthContext();
    const {state: workspaceState, dispatch:workspaceDispatch } = useWorkspaceContext();
    const {state: projectState, dispatch:projectDispatch } = useProjectContext();
    const {state: reviewState, dispatch:reviewDispatch } = useReviewContext();


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

    return (
        <Layout>
            <TopNavbar/>
            <Layout>
                <SideBar/>
                <LayoutWrapper>
                    <ContentWrapper>
                        <Switch>
                            <Route component={Login} path={'/login'}/>
                            <PrivateRoute component = {CreateProject} path ='/create' />
                            <PrivateRoute component = {UserProjects} path ='/myProjects' />
                            <PrivateRoute component = {SingleWorkspace} path ='/workspace/:id' />
                            <PrivateRoute component = {ProjectReviews} path ='/project/reviews/:id' />
                            <PrivateRoute component = {AllTeam} path ='/team' />
                            <PrivateRoute component = {ProjectsHome} path ='/' />
                        </Switch>
                    </ContentWrapper>
                </LayoutWrapper>
            </Layout>
        </Layout>

    );
}

export default withRouter(Sidebar);