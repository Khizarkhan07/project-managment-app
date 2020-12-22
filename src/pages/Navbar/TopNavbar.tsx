import React, {useCallback} from 'react';
import { Layout, Menu , } from 'antd' ;
import {getAuthenticatedUser} from "../../utils";
import {Link} from "react-router-dom";
import {useAuthContext} from "../../contexts/authContext";
const {Header} = Layout
const TopNavbar: React.FC = () => {
    const {state, dispatch} = useAuthContext();

    const handleLogout = useCallback(()=> {
        dispatch({type: 'Logout', payload: 'Logged out successfully!'})
    }, [state])

    return (
        <Header className="header">
            <div className="logo" />
            <Menu className="horizontal-header" theme="dark" mode="horizontal" >
                {getAuthenticatedUser().username?
                    <Menu.Item key="1">
                        {getAuthenticatedUser().username}
                    </Menu.Item> :
                    <Menu.Item key="2">
                        <Link to={'/login'}> Login </Link>
                    </Menu.Item>
                }

                {getAuthenticatedUser().username &&
                    <Menu.Item key="3" onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                }
            </Menu>
        </Header>
    );
}

export default TopNavbar;