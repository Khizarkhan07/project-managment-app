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
    projects: projectObject[],
    userProjects?: projectObject[]
}

export type projectObject = {
    name: string,
    description: string,
    tech: string[],
    team: user[],
    createdAt: Date,
    createdBy: string,
    id: number,
    responsibility?: responsibilityObj[]
}

export type workspaceState = {
    workspaces : workspaceObj[]
}

export type workspaceObj = {
    id: number,
    name: string,
    projects: number[]
}

export  type responsibilityObj = {
    id: string;
    data: string;
}

export type reviewState = {
    reviews: reviewObj[]
}

export type reviewObj = {
    id : number,
    reviewBy: user,
    reviewTo: user,
    project: projectObject,
    createdAt : Date
    comment: string
}

export type authAction = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean }
    | { type: 'Logout', payload: string }
    | { type: 'Login', payload: { username: string, password: string } };
