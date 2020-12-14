import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from "./pages/Sidebar";
import 'antd/dist/antd.css'
import {AuthProvider} from "./contexts/authContext";


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <Sidebar />
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

