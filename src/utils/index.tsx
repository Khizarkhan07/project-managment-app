import {projectObject, projectState, user, workspaceObj} from "../types";

export const authenticateUser = (data: any) => {
    window.localStorage.setItem("user", JSON.stringify(data));
}

export const getAuthenticatedUser = () => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user") as string);
    } else {
        return false;
    }
};

export const removeUser = () => {
    localStorage.removeItem("user");
}

export const login = (users: user[], data: {username: string, password: string}) => {
    const user = users.find(user => user.username===data.username && user.password === data.password);

    if(user){
        return user;
    }
}

export const userSelector = (users: user[], id: string) => {
    const user = users.find(user => user.id === id);
    return user;
}
export const workspaceSelector = (workspaces: workspaceObj[], id: number) => {
    const workspace = workspaces.find(workspace => workspace.id == id);
    return workspace;
}
export const projectSelector = (project: projectObject[], id: string) => {
    const projects = project.filter(project=> project.team.find(team => team.id == id))
    return projects;
}
