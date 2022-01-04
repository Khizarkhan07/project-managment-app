import React, {useEffect} from 'react';
import './App.css';
import {Route, Switch, withRouter} from "react-router";
import Login from "./pages/auth/Login";
import PrivateRoute from "./Routes/PrivateRoute";
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
import AllTeam from "./pages/Team/AllTeam";
import LoginRoute from "./Routes/LoginRoute";
import EditProject from "./pages/projects/EditProject";

const App: React.FC = () => {
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
        <Switch>
            <LoginRoute component={Login} path={'/login'}/>
            <PrivateRoute component = {CreateProject} path ='/create' />
            <PrivateRoute component = {UserProjects} path ='/myProjects' />
            <PrivateRoute component = {SingleWorkspace} path ='/workspace/:id' />
            <PrivateRoute component = {ProjectReviews} path ='/project/reviews/:id' />
            <PrivateRoute component = {EditProject} path ='/project/edit/:id' />
            <PrivateRoute component = {AllTeam} path ='/team' />
            <PrivateRoute component = {ProjectsHome} path ='/' />
        </Switch>

    );
}

export default withRouter(App);