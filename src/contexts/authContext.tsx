import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { authState, authAction} from "../types";
import {authenticateUser, removeUser} from "../utils";

const initialState:authState = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false
};

const AuthContext = createContext<{
    state: authState;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

const reducer = (state: authState, action: authAction): authState => {
    switch (action.type) {
        case 'setUsername':
            return {
                ...state,
                username: action.payload
            };
        case 'setPassword':
            return {
                ...state,
                password: action.payload
            };
        case 'setIsButtonDisabled':
            return   {
                ...state,
                isButtonDisabled: action.payload
            };

        case 'loginSuccess':
            const newState =  {
                ...state,
                helperText: action.payload,
                isError: false
            };
            authenticateUser({name: state.username})
            return newState;
        case 'loginFailed':
            return {
                ...state,
                helperText: action.payload,
                isError: true
            };
        case 'Logout' : {
            removeUser();
            return {
                ...state,
                username : '',
                helperText: action.payload,
                isError: false
            }
        }
        case 'setIsError':
            return {
                ...state,
                isError: action.payload
            };
    }
}


type Props = {
    children: ReactNode;
};
const AuthProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
export { AuthProvider };

