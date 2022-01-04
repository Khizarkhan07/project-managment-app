import React, {createContext, ReactNode, useContext, useReducer} from "react";
import { authState, authAction} from "../types";
import {authenticateUser, removeUser, login} from "../utils";

const initialState:authState = {
    username: '',
    password: '',
    isButtonDisabled: true,
    helperText: '',
    isError: false,
    users : [
        {id: '1', username: 'khizar@gmail.com', password: 'khizar', role: 'FE'},
        {id: '2', username: 'arslan@gmail.com', password: 'arslan', role: 'FE'},
        {id: '3', username: 'jabir@gmail.com', password: 'jabir', role: 'Manager'}
    ]
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

        case 'Login':
            const user = login(state.users, action.payload)

            if(user) {
                authenticateUser(user)
                return {
                    ...state,
                    helperText: 'logged in!',
                    isError: false
                };
            }
            else {
                return {
                    ...state,
                    helperText: 'Incorrect username or password',
                    isError: true
                }
            }

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

