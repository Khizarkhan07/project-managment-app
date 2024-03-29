import React, {createContext, ReactNode, useContext, useReducer} from "react";
import {workspaceAction, workspaceState} from "../types";
import {store} from "../utils";

const CREATE_WORKSPACE = 'CREATE_WORKSPACE'
const ADD_PROJECT = 'ADD_PROJECT'
const CURRENT_WORKSPACES = 'CURRENT_WORKSPACES'
const DELETE_WORKSPACE = 'DELETE_WORKSPACE'
const EDIT_WORKSPACE = 'EDIT_WORKSPACE'
export const initialState:workspaceState = {
    workspaces : [{id: 1, name: "Workspace1", projects: [1]}, {id: 2, name: "Workspace2", projects: [2]}]
};

const WorkspaceContext = createContext<{
    state: workspaceState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: workspaceState, action: workspaceAction): workspaceState => {
    switch (action.type) {

        case CURRENT_WORKSPACES : {
            return {
                ...state,
                workspaces: action.payload
            }
        }

        case CREATE_WORKSPACE: {
            const newState =  {
                ...state,
               workspaces: [...state.workspaces, {id: state.workspaces.length+1, name: action.payload.name, projects: []}]
            }
            store(newState.workspaces, 'workspaceData');
            return  newState
        }
        case ADD_PROJECT : {
            const index = state.workspaces.findIndex(workspace => workspace.id === action.payload.id)
            const newArray = [...state.workspaces];
            newArray[index].projects.push(action.payload.projectId) //changing value in the new array

            const newState = {
                ...state,
                workspaces: newArray
            }
            store(newState.workspaces, 'workspaceData');
            return newState;
        }

        case EDIT_WORKSPACE : {
            const index = state.workspaces.findIndex(workspace => workspace.id === parseInt(action.payload.id))
            const newArray = [...state.workspaces];
            newArray[index].name = action.payload.name;

            const newState = {
                ...state,
                workspaces: newArray
            }

            store(newState.workspaces, 'workspaceData');
            return newState;
        }

        case DELETE_WORKSPACE : {
            const index = state.workspaces.findIndex(workspace => workspace.id === parseInt(action.payload.id))
            const newState = {
                ...state,
                workspaces: [...state.workspaces.slice(0, index), ...state.workspaces.slice(index + 1)]
            }
            store(newState.workspaces, 'workspaceData')
            return  newState;
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

