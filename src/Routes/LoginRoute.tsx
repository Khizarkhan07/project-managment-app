import {getAuthenticatedUser} from "../utils";
import React from "react";
import {Redirect, Route} from "react-router-dom";
import {Layout} from "antd";
import TopNavbar from "../pages/Navbar/TopNavbar";
import {ContentWrapper, LayoutWrapper} from "../app.styles";
import Login from "../pages/auth/Login";

const LoginRoute = ({component}: any) => {

    return (
        <Layout>
            <TopNavbar/>
            <LayoutWrapper>
                <ContentWrapper>
                    <Login/>
                </ContentWrapper>
            </LayoutWrapper>
        </Layout>
    )
};

export default LoginRoute;