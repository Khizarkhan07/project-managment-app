import React from 'react';
import {Layout, } from 'antd'
import './App.css';
import {Route, Switch} from "react-router";
import Login from "./pages/auth/Login";
import PrivateRoute from "./pages/auth/PrivateRoute";
import CreateProject from "./pages/projects/CreateProject";
import UserProjects from "./pages/projects/UserProjects";
import SingleWorkspace from "./pages/workspace/SingleWorkspace";
import ProjectReviews from "./pages/reviews/projectReviews";
import ProjectsHome from "./pages/projects/ProjectsHome";
import Sidebar from "./pages/Sidebar";
const {  Content } = Layout;

function App() {
  return (
      <Layout>
        <Sidebar/>
        <Layout style={{ padding: '0 24px 24px', marginTop: '10px', width: '100%' }}>
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

export default App;
