export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_CREDENTIALS = 'REGISTER_CREDENTIALS'
export const REGISTER_CANCEL = 'REGISTER_CANCEL'
export const GET_ALL_USERS = 'GET_ALL_USERS'
export const DELETE_USER = 'DELETE_USER'
export const EDIT_ROLE = 'EDIT_ROLE'
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const CANCEL = 'CANCEL'
export const LOGOUT = 'LOGOUT'


const initialState = {
    isLoggedIn: false,
    isRegister: false,
    loginPending: false,
    registerPending: false,
    loggedInUser: null,
    loggedInRole: null,
    successfulRegisterMessage: false,
    loginErrorMessage: false,
    credentials: {username: '', password: '', role: ''},
    addNewUser: {username: '', password: '', role: ''},
    users: [],
    quizzes: [],
    isEditRole: false,
    deleteUserSuccess: false
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
                successfulRegisterMessage: false,
                loggedInUser: state.credentials.username,
                // loggedInRole: state.credentials.role
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
                addNewUser: {
                    username: action.payload.username,
                    password: action.payload.password,
                    role: action.payload.role
                }
            }
        case REGISTER_START:
            return {
                ...state,
                isRegister: true,
                registerPending: true,
                isLoggedIn: false
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
            return {
                ...state,
                isRegister: false,
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }
        case GET_ALL_USERS:
            return {
                ...state,
                users: [...state.users, {...action.user}],
            }
        case EDIT_ROLE:
            return {
                ...state,
                isEditRole: true,
                credentials: {
                    role: action.payload.role
                }
            }
        case DELETE_USER:
            return {
                ...state,
                users: action.payload.users,
                deleteUserSuccess: true
            }
        default:
            return {...state}
    }
}

export function assignQuiz(_fetch = fetch, assignmentId, quizId) {
    return async function sideEffect() {
        const url = `http://localhost:8082/placeholder`
        const response = await _fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({assignmentId, quizId})
        })
        if (response.ok)
            console.log("passed")
        else
            console.log("failed")
    }
}

export function initiateLogin(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: LOGIN_START})
        const {username, password} = getState().userReducer.credentials
        const url = `http://localhost:8081/user/login?username=${username}&password=${password}`
        const response = await _fetch(url)
        if (response.ok) {
            dispatch({type: LOGIN_SUCCESS})
        } else
            dispatch({type: LOGIN_FAILURE})
    }
}

export function initiateRegister(_fetch = fetch) {
    return async function createRegister(dispatch, getState) {
        // dispatch({type: REGISTER_START})
        const {username, password, role} = getState().userReducer.addNewUser;
        let registerUrl = ``
        if (role === "Admin") {
            registerUrl = "http://localhost:8081/user/registerAdmin"
        } else if (role === "Recruiter") {
            registerUrl = "http://localhost:8081/user/registerRecruiter"
        } else {
            registerUrl = "http://localhost:8081/user/registerApplicant"
        }
        const response = await _fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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


