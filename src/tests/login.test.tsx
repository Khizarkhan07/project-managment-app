import {mount, shallow} from "enzyme";
import {AuthContext} from "../contexts/authContext";
import Login from "../pages/auth/Login";
import React from "react";

it(">>>> should not show error text", async () => {

    const data = {
        username: '',
        password: '',
        isButtonDisabled: true,
        helperText: 'ABC',
        isError: false,
        users : [
            {id: '1', username: 'khizar@gmail.com', password: 'khizar', role: 'FE'},
            {id: '2', username: 'arslan@gmail.com', password: 'arslan', role: 'FE'},
            {id: '3', username: 'jabir@gmail.com', password: 'jabir', role: 'Manager'}
        ]
    }
    const wrapper = shallow(<Login/>);
    expect(wrapper.childAt(0).childAt(0)).not.toBe(<div></div>)
});

it(">>>> should show greeting name", async () => {

    const data = {
        username: '',
        password: '',
        isButtonDisabled: true,
        helperText: 'ABC',
        isError: false,
        users : [
            {id: '1', username: 'khizar@gmail.com', password: 'khizar', role: 'FE'},
            {id: '2', username: 'arslan@gmail.com', password: 'arslan', role: 'FE'},
            {id: '3', username: 'jabir@gmail.com', password: 'jabir', role: 'Manager'}
        ]
    }
    const wrapper = shallow(
        <AuthContext.Provider  value={{
            dispatch: jest.fn(),
            state: data
        }}>
            <Login />
        </AuthContext.Provider>);
    expect(wrapper.dive().childAt(0).childAt(0).text()).toBe('ABC')
});
