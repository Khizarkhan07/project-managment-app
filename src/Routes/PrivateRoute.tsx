import {getAuthenticatedUser} from "../utils";
import React from "react";
import {Redirect, Route} from "react-router-dom";
import {Layout} from "antd";
import TopNavbar from "../pages/Navbar/TopNavbar";
import SideBar from "../pages/Navbar/SideBar";
import {ContentWrapper, LayoutWrapper} from "../app.styles";

const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        getAuthenticatedUser()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Layout>
        <TopNavbar/>
        <Layout>
            <SideBar/>
            <LayoutWrapper>
                <ContentWrapper>
                    <Route {...rest} render={routeComponent}/>
                </ContentWrapper>
            </LayoutWrapper>
        </Layout>
    </Layout>
};

export default PrivateRoute;