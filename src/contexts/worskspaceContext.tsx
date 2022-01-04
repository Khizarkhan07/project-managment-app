import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { workspaceState} from "../types";

const CREATE_WORKSPACE = 'CREATE_WORKSPACE'
const ADD_PROJECT = 'ADD_PROJECT'

const initialState:workspaceState = {
    workspaces : [{id: 1, name: "Workspace1", projects: [1]}, {id: 2, name: "Workspace2", projects: [2]}]
};

const WorkspaceContext = createContext<{
    state: workspaceState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: workspaceState, action: any): workspaceState => {
    switch (action.type) {
        case CREATE_WORKSPACE: {
            return  {
                ...state,
               workspaces: [...state.workspaces, {id: state.workspaces.length+1, name: action.payload.name, projects: []}]
            }
        }
        case ADD_PROJECT : {
            const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id)
            console.log(index)
            const newArray = [...state.workspaces];
            newArray[index].projects.push(action.payload.projectId) //changing value in the new array

            return {
                ...state,
                workspaces: newArray
            }
        }
        default :
            return state
    }
}

type Props = {
    children: ReactNode;
};
const WorkspaceProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <WorkspaceContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkspaceContext.Provider>
    );
};

export const useWorkspaceContext = () => useContext(WorkspaceContext);
export { WorkspaceProvider };

