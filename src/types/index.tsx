export type authState = {
    username: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
};


export type authAction = { type: 'setUsername', payload: string }
    | { type: 'setPassword', payload: string }
    | { type: 'setIsButtonDisabled', payload: boolean }
    | { type: 'loginSuccess', payload: string }
    | { type: 'loginFailed', payload: string }
    | { type: 'setIsError', payload: boolean }
    | { type: 'Logout', payload: string };
