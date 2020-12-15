import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {projectState} from "../types";

const initialState : projectState = {
    projects: [{name: 'Project 1',
        description: 'this is a mern stack project',
        tech: ['react', 'node'],
        team :['1' , '2']
    }],
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

export const useAuthContext = () => useContext(ProjectContext);
export { ProjectProvider };

