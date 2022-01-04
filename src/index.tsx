import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from "./pages/Sidebar";
import 'antd/dist/antd.css'
import {AuthProvider} from "./contexts/authContext";
import {ProjectProvider} from "./contexts/projectContext";
import {WorkspaceProvider} from "./contexts/worskspaceContext";


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <WorkspaceProvider>
                <ProjectProvider>
                    <Sidebar />
                </ProjectProvider>
            </WorkspaceProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

