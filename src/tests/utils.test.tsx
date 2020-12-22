import React from 'react';
import {login, projectHasUser, singleProjectSelector, userSelector, workspaceSelector} from "../utils";
import {AuthContext, AuthProvider, initialState} from '../contexts/authContext'
import  {initialState as workspaceInitialState} from '../contexts/worskspaceContext'
import  {initialState as projectInitialState} from '../contexts/projectContext'
import {mount, shallow} from "enzyme";
import Login from "../pages/auth/Login";
test('Login with correct password and user name', () => {

    const result  = login(initialState.users, {username: 'khizar@gmail.com', password: 'khizar'})

    expect(result).toEqual(initialState.users[0])

});


test('Login with incorrect password and user name', () => {

    const result  = login(initialState.users, {username: 'khizargmail.com', password: 'khizar'})

    expect(result).not.toBe(initialState.users[0])

});

test('test user selector with correct id', () => {
    const result  = userSelector(initialState.users, '1')
    expect(result).toBe(initialState.users[0])
});

test('test user selector with incorrect id', () => {
    const result  = userSelector(initialState.users, '4')
    expect(result).not.toBe(initialState.users[0])
});

test('test Workspace selector with correct id', () => {
    const result  = workspaceSelector(workspaceInitialState.workspaces, 1)
    expect(result).toBe(workspaceInitialState.workspaces[0])
});
test('test project selector with correct id', () => {
    const result  = singleProjectSelector(projectInitialState.projects, 1)
    expect(result).toBe(projectInitialState.projects[0])
});

test('find user in project selector', () => {
    const result  = projectHasUser(projectInitialState.projects[0], '1')
    console.log(result)
    expect(result).toEqual({id: '1', username: 'khizar@gmail.com'})
});