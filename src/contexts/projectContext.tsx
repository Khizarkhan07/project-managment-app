import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {projectState} from "../types";

const initialState : projectState = {
    projects: [
        {
        id: '1',
        name: 'Project Management App',
        description: 'this is a mern stack project',
        tech: ['react', 'node'],
        team :[{id: '1', username: 'khizar@gmail.com', password: 'khizar'},
            {id: '2', username: 'arslan@gmail.com', password: 'arslan'},],
        createdAt: new Date( Date.now()),
        createdBy: 'jabir'
        },
        {
        id: '2',
        name: 'Project Management App',
        description: 'this is a mern stack project',
        tech: ['react', 'node'],
        team :[{id: '1', username: 'khizar@gmail.com', password: 'khizar'},
            {id: '2', username: 'arslan@gmail.com', password: 'arslan'},],
        createdAt: new Date( Date.now()),
        createdBy: 'jabir'
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

const reducer = (state: projectState, action: any) : projectState => {
    switch (action.type) {

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

