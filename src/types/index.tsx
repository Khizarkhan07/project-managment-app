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
    | { type: 'AddTeamMember', payload: string }
    | { type: 'currentUsers', payload: any }
    | { type: 'Login', payload: { username: string, password: string } };

export type projectAction = { type: 'CREATE_PROJECT', payload: {name: string, description: string, tech: string, team1: string, team2: string , users: user[], team1_res: string , team2_res: string} }
    | { type: 'USER_PROJECTS', payload: string  }
    | { type: 'CURRENT_PROJECTS', payload: projectObject[] }
    | { type: 'EDIT_PROJECT', payload: {  id: number, name: string, description: string, tech: string, team1: string, team2: string , users: user[]} }

export type reviewAction = { type: 'ADD_REVIEW', payload:{id:number ,comment: string, reviewBy: user, reviewTo: user, project: projectObject, createdAt: Date } }
    | { type: 'CURRENT_REVIEWS', payload: reviewObj[] }

export type workspaceAction = { type: 'CREATE_WORKSPACE', payload: { name: string } }
    | { type: 'CURRENT_WORKSPACES', payload: workspaceObj[] }
    | { type: 'DELETE_WORKSPACE', payload: {id : string} }
    | { type: 'EDIT_WORKSPACE', payload: {id : string, name: string} }
    | { type: 'ADD_PROJECT', payload: {id: number, projectId: number} }