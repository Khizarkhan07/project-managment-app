import React, {useCallback, useEffect} from 'react';
import { Form, Input ,Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {LoginWrapper} from "./login.styles";
import {useAuthContext} from "../../contexts/authContext";
import {getAuthenticatedUser, retriveData, store} from "../../utils";
import { Redirect } from 'react-router-dom';


const Login = () => {
    const {state, dispatch} = useAuthContext();

    useEffect(() => {
        if (state.username.trim() && state.password.trim()) {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: false
            });
        } else {
            dispatch({
                type: 'setIsButtonDisabled',
                payload: true
            });
        }

    }, [state.username, state.password]);


    const handleLogin = useCallback(() => {
        dispatch({type: 'Login' , payload: {username: state.username, password: state.password}})
    }, [state.username, state.password]);


    const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> =
        useCallback((event) => {
            dispatch({
                type: 'setUsername',
                payload: event.target.value
            });
        },[state.username]);

    const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> =
        useCallback((event) => {
            dispatch({
                type: 'setPassword',
                payload: event.target.value
            });
        },[state.password])

    return (

        <LoginWrapper>
            {getAuthenticatedUser().username && <Redirect to="/" /> }
            {state.helperText && <div>{state.helperText}</div>}
            <Form
                className="login-form"
                initialValues={{
                    remember: true,
                }}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input onChange={handleUsernameChange} prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                </Form.Item>

                <Form.Item>
                    <Button disabled={state.isButtonDisabled} onClick = {handleLogin} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </LoginWrapper>

    );
}

export default Login;