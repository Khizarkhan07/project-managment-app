import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {projectAction, projectState, user} from "../types";
import {getAuthenticatedUser, projectSelector, store, userSelector} from '../utils/index'
const CREATE_PROJECT = 'CREATE_PROJECT'
const USER_PROJECTS = 'USER_PROJECTS'
const CURRENT_PROJECTS = 'CURRENT_PROJECTS'
const EDIT_PROJECTS = 'EDIT_PROJECT'
export const initialState : projectState = {
    projects: [
        {
            id: 1,
            name: 'Project Management App',
            description: 'this is a mern stack project',
            tech: ['react', 'node'],
            team :[{id: '1', username: 'khizar@gmail.com'},
                {id: '2', username: 'arslan@gmail.com',},],
            createdAt: new Date( Date.now()),
            createdBy: 'jabir',
            responsibility: [{id: '1', data: "Front End in react js"},
                {id: '2', data: "Team lead and Front end development"},]
        },
        {
            id: 2,
            name: 'Project Management App',
            description: 'this is a mern stack project',
            tech: ['react', 'node'],
            team :[{id: '1', username: 'khizar@gmail.com', password: 'khizar'},
                {id: '2', username: 'arslan@gmail.com', password: 'arslan'},],
            createdAt: new Date( Date.now()),
            createdBy: 'jabir',
            responsibility: [{id: '1', data: "Front End in react js"},
                {id: '2', data: "Team lead and Front end development"},]
        },

    ],
};

const ProjectContext = createContext<{
    state: projectState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: projectState, action: projectAction) : projectState  => {
    switch (action.type) {

        case CURRENT_PROJECTS : {

            return {
                ...state,
                projects: action.payload
            };
        }

        case CREATE_PROJECT: {
            const team1= userSelector(action.payload.users ,action.payload.team1) as user
            const team2= userSelector(action.payload.users ,action.payload.team2) as user
            const tech = action.payload.tech.split(",")
            const id = state.projects.length+1;
            const team1_res = {id: team1.id, data: action.payload.team1_res}
            const team2_res = {id: team2.id, data: action.payload.team2_res}
            return {
                ...state,
                projects: [...state.projects,
                    {
                        id: id,
                        name: action.payload.name,
                        tech: tech,
                        description: action.payload.description,
                        team: [team1, team2],
                        createdAt: new Date(Date.now()),
                        createdBy: getAuthenticatedUser().username,
                        responsibility: [team1_res, team2_res]
                    }]
            }
        }
        case USER_PROJECTS : {
            const projects = projectSelector(state.projects, action.payload)

            return {
                ...state,
                userProjects: projects

            }
        }
        case EDIT_PROJECTS: {
            const index = state.projects.findIndex(project => project.id === action.payload.id)
            const newArray = [...state.projects];
            const team1= userSelector(action.payload.users ,action.payload.team1) as user
            const team2= userSelector(action.payload.users ,action.payload.team2) as user
            const tech = action.payload.tech.split(",")
            const obj =   {
                id: action.payload.id,
                name: action.payload.name,
                tech: tech,
                description: action.payload.description,
                team: [team1, team2],
                createdAt: new Date(Date.now()),
                createdBy: getAuthenticatedUser().username,
            }
            newArray[index] = obj
            const newState = {
                ...state,
                projects: newArray
            }
            store(newState.projects, 'projectData');
            return newState;
        }
        default: return state
    }


}

type Props = {
    children: ReactNode;
};

const ProjectProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProjectContext.Provider value={{ state, dispatch }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjectContext = () => useContext(ProjectContext);
export { ProjectProvider };