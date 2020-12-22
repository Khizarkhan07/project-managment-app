import {projectObject, user, workspaceObj} from "../types";

export const authenticateUser = (data: user) => {
    window.localStorage.setItem("user", JSON.stringify(data));
}

export const store = (data: any, key: string) => {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export const retriveData = (key: string) => {
    if (typeof window == "undefined") {
        return false;
    }
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key) as string);
    } else {
        return false;
    }
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

export const singleProjectSelector = (project: projectObject[], id: number) => {
    const singleProject = project.find(project => project.id == id);
    return singleProject;
}

export const projectSelector = (project: projectObject[], id: string) => {
    const projects = project.filter(project=> project.team.find(team => team.id == id))
    return projects;
}

export const projectHasUser = (project: projectObject, id: string) => {
    const user = project.team.find(team => team.id === id)
    return user;
}

