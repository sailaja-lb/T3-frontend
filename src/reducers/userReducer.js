export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_START = 'REGISTER_START'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const REGISTER_USER = 'REGISTER_USER'
export const REGISTER_CREDENTIALS = 'REGISTER_CREDENTIALS'
export const GET_ALL_USERS_DONE = 'GET_ALL_USERS_DONE'
export const DELETE_USER_DONE = 'DELETE_USER_DONE'
export const EDIT_ROLE_START = 'EDIT_ROLE_START'
export const EDIT_ROLE_CANCEL = 'EDIT_ROLE_CANCEL'
export const EDIT_ROLE_CHANGE = 'EDIT_ROLE_CHANGE'
export const EDIT_ROLE_SUCCESS = 'EDIT_ROLE_SUCCESS'
export const UPDATE_CREDENTIALS = 'UPDATE_CREDENTIALS'
export const CANCEL = 'CANCEL'
export const ADMIN_CANCEL_START = 'ADMIN_CANCEL_START'
export const ADMIN_CANCEL = 'ADMIN_CANCEL'
export const IMPERSONATE_START = 'IMPERSONATE_START'
export const IMPERSONATE_DONE = 'IMPERSONATE_DONE'
export const LOGOUT = 'LOGOUT'
export const GET_ALL_USERS_START = 'GET_ALL_USERS_START'


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
    isEditRole: false,
    deleteUserSuccess: false,
    loading: false,
    editUserId: null,
    newRole: null,
    isAddNewUser: false,
    isImpersonate: false,
    impersonateDetails: {},
    authMessage : false,
    failRegisterMessage: false
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
                token: action.payload.token,
                loggedInUser: state.credentials.username,
                loggedInRole: state.credentials.role
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
                isLoggedIn: false,
                isAddNewUser: true,
                authMessage: false,
                failRegisterMessage: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isRegister: false,
                registerPending: false,
                loginPending: false,
                isLoggedIn: state.loggedInRole ? true : false,
                successfulRegisterMessage: true
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isRegister: false,
                registerPending: false,
                failRegisterMessage: true
            }
        case CANCEL:
            return{
                ...state,
                isRegister: false,
                registerPending: false,
                isLoggedIn: false
            }
        case ADMIN_CANCEL:
            return {
                ...state,
                //loggedInRole: state.credentials.role,
                isLoggedIn: state.loggedInRole ? true : false,
                isAddNewUser: false,
                authMessage: true
                //isLoggedIn: true

            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                isAddNewUser: false,
                authMessage: false,
                loggedInRole: false,
                isRegister: false
            }
        case GET_ALL_USERS_START:
            return {
                ...state,
                loading: true
            }

        case GET_ALL_USERS_DONE:
            return {
                ...state,
                users: action.payload.allUsers,
                loading: false
            }
        case EDIT_ROLE_START:
            return {
                ...state,
                editUserId: action.payload.userId,
            }
        case EDIT_ROLE_CHANGE:
            return {
                ...state,
                newRole: action.payload.updatedRole
            }
        case EDIT_ROLE_SUCCESS:
            return {
                ...state,
                users: action.payload.users,
                newRole: null,
                editUserId: null
            }
        case EDIT_ROLE_CANCEL:
            return {
                ...state,
                editUserId: null
            }
        case DELETE_USER_DONE:
            return {
                ...state,
                users: [...action.payload.users],
                deleteUserSuccess: true
            }
        case IMPERSONATE_START:
            return {
                ...state,
                isImpersonate: true,
                impersonateDetails: action.payload.user
            }
        case IMPERSONATE_DONE:
            return {
                ...state,
                isImpersonate: false,
                isLoggedIn: true,
                token: action.payload.token
            }
        default:
            return {...state}
    }
}

export function initiateLogin(_fetch=fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: LOGIN_START})
        const {username, password, role} = getState().userReducer.credentials
        const url = `http://localhost:8080/user/login?username=${username}&password=${password}&role=${role}`
        const response = await _fetch(url)
        if (response.ok) {
            const token = await response.json()
            dispatch({type: LOGIN_SUCCESS, payload: {token}})
        } else
            dispatch({type: LOGIN_FAILURE})
    }
}

export function initiateRegister(_fetch=fetch) {
    return async function createRegister(dispatch, getState) {
        dispatch({type: REGISTER_START})
        const {username, password, role} = getState().userReducer.addNewUser;
        let registerUrl = ``
        if (role === "Admin") {
            registerUrl = "http://localhost:8080/user/registerAdmin"
        } else if (role === "Recruiter") {
            registerUrl = "http://localhost:8080/user/registerRecruiter"
        } else {
            registerUrl = "http://localhost:8080/user/registerApplicant"
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

export function initLoadAllUsers(_fetch=fetch) {
    return async function allUsers(dispatch, getState) {
        const token = getState().userReducer.token
        dispatch({type: GET_ALL_USERS_START})
        const url = `http://localhost:8080/user/getAll?token=${token}`
        const response = await _fetch(url)

        if (response.ok) {
            const allUsers = await response.json()
            dispatch({type: GET_ALL_USERS_DONE, payload: {allUsers}})
        }
    }
}

export function editUser(_fetch=fetch) {
    return async function editUser(dispatch, getState) {
        const state = getState()
        const token = getState().userReducer.token
        const user = state.userReducer.credentials
        const id = state.userReducer.editUserId
        const newRole = state.userReducer.newRole
        // if (user.role !== newRole) {
        const users = [...state.userReducer.users]
        const url = `http://localhost:8080/user/editUser?token=${token}&role=${newRole}&id=${id}`
        const response = await _fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        if (response.ok) {
            const result = await response.json()
            const userIndex = users.findIndex(each => each.id === id)
            if (userIndex >= 0) {
                users[userIndex] = result
            }
            dispatch({type: EDIT_ROLE_SUCCESS, payload: {users, newRole}})
        }
    }
}

export function deleteUser(userId, _fetch=fetch) {
    return async function deleteUser(dispatch, getState) {
        const state = getState()
        const token = state.userReducer.token
        const url = `http://localhost:8080/user/deleteUser?token=${token}&id=${userId}`
        const response = await _fetch(url, {
            method: 'DELETE'
        })

        if (response.ok) {
            const users = [...state.userReducer.users]
            const deleteUserIndex = users.findIndex((each) => each.id === userId)
            if (deleteUserIndex >= 0) {
                users.splice(deleteUserIndex, 1)
            }
            dispatch({type: DELETE_USER_DONE, payload: {users}})
        }
    }
}