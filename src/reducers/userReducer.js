export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_OWNER = 'REGISTER_USER'
export const REGISTER_CREDENTIALS = 'REGISTER_CREDENTIALS'
export const REGISTER_CANCEL = 'REGISTER_CANCEL'
export const USERS = 'USERS'
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const CANCEL = 'CANCEL'
export const LOGOUT = 'LOGOUT'

// InitialState
const initialState = {
    isLoggedIn: false,
    isRegister: false,
    loginPending: false,
    registerPending: false,
    successfulRegisterMessage: false,
    loginErrorMessage: false,
    credentials: {username: '', password: '', role: ''},
    newUser: {username: '', password: '', role: ''},
}

export default function userReducer(state = initialState, action) {
    switch (action?.type) {
        case LOGIN_START:
            return {
                ...state,
                isLoggedIn: false,
                loginPending: true
            }

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginPending: false,
                loginErrorMessage: false,
                successfulRegisterMessage: false
            }

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loginPending: false,
                loginErrorMessage: true,
                successfulRegisterMessage: false
            }

        case UPDATE_CREDENTIALS:
            return {
                ...state,
                credentials: {
                    username: action.payload.username,
                    password: action.payload.password,
                    role: action.payload.role
                }
            }
        case REGISTER_USER:
            return {
                ...state,
                newUser: {
                    username: action.payload.username,
                    password: action.payload.password,
                    role: action.payload.role
                },
                successfulRegisterMessage: true,
                isRegister: false,
                isLoggedIn: false,
            }
        case REGISTER_START:
            return {
                ...state,
                isRegister: false,
                registerPending: true,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: true,
                registerPending: false,
                loginPending: false
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegister: false,
                registerPending: false
            }
        case REGISTER_CANCEL:
            return{
                ...state,
                isRegister: false,
            }
        case LOGOUT:
            return {
                ...state,
                credentials: {
                    username: '',
                    password: '',
                    role: ''
                }
            }
        default:
            return {...state}
    }
}

export function initiateLogin(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: LOGIN_START})
        const {username, password, role} = getState().userReducer.credentials
        const url = `http://localhost:8080/login?username=${username}&password=${password}&role=${role}`
        const response = await _fetch(url, {mode : 'no-cors'})
        if (response.ok) {
            dispatch({type: LOGIN_SUCCESS})
        } else
            dispatch({type: LOGIN_FAILURE})
    }
}

export function initiateRegister(_fetch=fetch) {
    return async function createRegister(dispatch, getState) {
        dispatch({type: REGISTER_START})
        const {username, password, role} = getState().userReducer.newUser;
        const registerUrl = `http://localhost:8080/register`
        const response = await _fetch(registerUrl, {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'
            }, body: JSON.stringify({
                username: `${username}`,
                password: `${password}`,
                role: `${role}`
            })
        })
        if (response.ok) {
            dispatch({type: REGISTER_SUCCESS})
        } else
            dispatch({type: REGISTER_FAILURE})
    }
}


