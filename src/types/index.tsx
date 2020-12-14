export type authState = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean,
    users: user[]
};


export type user ={
    [key: string]: string
}

export type projectState = {
    projects: projectObject[]
}

export type projectObject = {
    name: string,
    description: string,
    tech: string[],
    team: user[],
    createdAt: Date,
    createdBy: string,
    id: string
}

export type authAction = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean }
    | { type: 'Logout', payload: string }
    | { type: 'Login', payload: { username: string, password: string } };
