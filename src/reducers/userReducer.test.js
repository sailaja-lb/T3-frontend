import reducer, {
    ADMIN_CANCEL,
    CANCEL, DELETE_USER_DONE,
    EDIT_ROLE_CANCEL,
    EDIT_ROLE_CHANGE,
    EDIT_ROLE_START,
    EDIT_ROLE_SUCCESS,
    GET_ALL_USERS_DONE,
    GET_ALL_USERS_START, IMPERSONATE_DONE, IMPERSONATE_START,
    LOGIN_FAILURE,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_USER,
    UPDATE_CREDENTIALS
} from "./userReducer"
it('should start loginPending false ',  ()=> {
    const state = reducer();
    expect(state.loginPending).toBe(false);
});
it('should set loginPending true when LOGIN_START',()=>{
    const initialState = reducer();
    const state = reducer(initialState, {type: LOGIN_START});
    expect(state.loginPending).toBe(true);
    expect(state.isLoggedIn).toBe(false);
});
it('should set loginPending false  when LOGIN_SUCCESS', ()=> {
    const initialState = reducer()
    initialState.loginPending = true
    const token = 'some token'
    const state = reducer(initialState, {type: LOGIN_SUCCESS, payload: {token:token}})
    expect(state.loginPending).toBe(false)
    expect(state.isLoggedIn).toBe(true)
    expect(state.successfulRegisterMessage).toBe(false)
    expect(state.loginErrorMessage).toBe(false)
    expect(state.token).toBe(token)
});
it('should set loginPending false and loginErrorMessage true when LOGIN_FAILURE',() => {
    const initialState = reducer();
    initialState.loginPending = true;
    const state = reducer(initialState, {type: LOGIN_FAILURE});
    expect(state.isLoggedIn).toBe(false);
    expect(state.loginPending).toBe(false);
    expect(state.loginErrorMessage).toBe(true);
    expect(state.successfulRegisterMessage).toBe(false);
})
it('should update credentials when UPDATE_CREDENTIALS',() => {
    const initialState = reducer();
    initialState.credentials = {username:'',password: '',role:''};
    const state = reducer(initialState,{type:UPDATE_CREDENTIALS, payload:
            {username:'some user',password:'pass',role:'some role'}});
    expect(state.credentials.username).toBe('some user');
    expect(state.credentials.password).toBe('pass');
    expect(state.credentials.role).toBe('some role');
});
it('should add a new user when REGISTER_USER', () => {
    const initialState = reducer();
    initialState.addNewUser = {username:'',password: '', role:''};
    const state = reducer(initialState,{type:REGISTER_USER, payload:
            {username:'some user',password:'pass', role:'role'}});
    expect(state.addNewUser.username).toBe('some user');
    expect(state.addNewUser.password).toBe('pass');
    expect(state.addNewUser.role).toBe('role');
});
it('should set registerPending to true when REGISTER_START',() => {
    const initialState = reducer();
    initialState.registerPending = false;
    const state = reducer(initialState,{type:REGISTER_START});
    expect(state.isRegister).toBe(true);
    expect(state.registerPending).toBe(true);
    expect(state.isLoggedIn).toBe(false);
    expect(state.isAddNewUser).toBe(true);
    expect(state.authMessage).toBe(false);
    expect(state.failRegisterMessage).toBe(false);
});
it('should set registerPending to false when REGISTER_SUCCESS',() => {
    const initialState = reducer();
    initialState.registerPending = true;
    const state = reducer(initialState,{type:REGISTER_SUCCESS});
    expect(state.isRegister).toBe(false);
    expect(state.registerPending).toBe(false);
    expect(state.loginPending).toBe(false);
    expect(state.successfulRegisterMessage).toBe(true);
});
it('should set registerPending false when REGISTER_FAILURE',() =>{
    const initialState = reducer();
    initialState.registerPending = true;
    const state = reducer(initialState, {type:REGISTER_FAILURE});
    expect(state.isRegister).toBe(false);
    expect(state.registerPending).toBe(false);
    expect(state.failRegisterMessage).toBe(true);
});
it('should set registerPending,isLoggedIn,isRegister to false when CANCEL',() =>{
    const initialState = reducer();
    initialState.registerPending = true;
    const state = reducer(initialState,{type:CANCEL});
    expect(state.isRegister).toBe(false);
    expect(state.registerPending).toBe(false);
    expect(state.isLoggedIn).toBe(false);
});
it('should set isLoggedIn to true  when ADMIN_CANCEL',() => {
    const initialState = reducer();
    initialState.loggedInRole = null;
    const loggedInRole= true;
    initialState.isLoggedIn = !!loggedInRole;
    const state = reducer(initialState,{type:ADMIN_CANCEL})
    expect(state.isLoggedIn).toBe(false);
    expect(state.isAddNewUser).toBe(false);
    expect(state.authMessage).toBe(true);
});
it('should set isLoggedIn and isRegister to false when LOGOUT',() => {
    const initialState = reducer();
    const state = reducer(initialState,{type:LOGOUT})
    expect(state.isLoggedIn).toBe(false);
    expect(state.isAddNewUser).toBe(false);
    expect(state.authMessage).toBe(false);
    expect(state.loggedInRole).toBe(false);
    expect(state.isRegister).toBe(false);
    expect(state.isImpersonate).toBe(false);
});
it('should set loading to true when GET_ALL_USERS_START',()=>{
    const initialState = reducer();
    const state = reducer(initialState, {type:GET_ALL_USERS_START});
    expect(state.loading).toBe(true);
});
it('should set loading to false when GET_ALL_USERS_DONE',() =>{
    const initialState = reducer();
    initialState.loading = true;
    initialState.users = ''
    const allUsers ='all users'
    const state = reducer(initialState,{type:GET_ALL_USERS_DONE,payload:{allUsers:allUsers}})
    expect(state.loading).toBe(false);
    expect(state.users).toBe(allUsers);
})
it('should change the role when EDIT_ROLE_CHANGE',() => {
    const initialState = reducer();
    const updatedRole = 'new Role'
    initialState.newRole = '';
    const state = reducer(initialState,{type:EDIT_ROLE_CHANGE,payload: {updatedRole: updatedRole}});
    expect(state.newRole).toBe(updatedRole)
});
it('should change editRoleId and editUserRoles when EDIT_ROLE_START',()=> {
    const initialState = reducer();
    initialState.editUserId = '';
    initialState.editUserRoles ='';
    const userId = 5;
    const userRoles = 'some roles';
    const state = reducer(initialState, {type:EDIT_ROLE_START,
        payload:{userId:userId,userRoles:userRoles}});
    expect(state.editUserId).toBe(userId);
    expect(state.editUserRoles).toBe(userRoles);
});
it('should set newRole and editUserId to be null when EDIT_ROLE_SUCCESS',() => {
    const initialState = reducer();
    initialState.users = [];
    const users = 'new users';
    const state = reducer(initialState, {type:EDIT_ROLE_SUCCESS,payload:{users:users}});
    expect(state.users).toBe(users);
    expect(state.newRole).toBeNull();
    expect(state.editUserId).toBeNull();
});
it('should sett editUserId to null when EDIT_ROLE_CANCEL', () => {
    const initialState = reducer();
    const state = reducer(initialState,{type:EDIT_ROLE_CANCEL});
    expect(state.editUserId).toBeNull();
});
it('should set delete user to true when DELETE_USER_DONE',() => {
    const initialState = reducer();
    initialState.users = [];
    initialState.deleteUserSuccess = false;
    const users = 'updated users'
    const state = reducer(initialState,{type:DELETE_USER_DONE, payload:{users:[...users]}});
    expect(state.users).toStrictEqual([...users]);
    expect(state.deleteUserSuccess).toBe(true);
});
it('should set isImpersonate to true when IMPERSONATE_START',() => {
    const initialState = reducer();
    initialState.isImpersonate = false;
    initialState.impersonateDetails = {};
    const user = 'any user';
    const state = reducer(initialState, {type:IMPERSONATE_START, payload:{user:user}});
    expect(state.impersonateDetails).toBe(user);
    expect(state.isImpersonate).toBe(true);
});
it('should set isImpersonate to false when IMPERSONATE_DONE', () => {
    const initialState = reducer();
    initialState.isImpersonate = true;
    initialState.isLoggedIn = false;
    const token = 'some token';
    const state = reducer(initialState, {type:IMPERSONATE_DONE, payload:{token:token}});
    expect(state.isImpersonate).toBe(false);
    expect(state.isLoggedIn).toBe(true);
    expect(state.token).toBe(token);
});
// it('should set isImpersonate to false when IMPERSONATE_FINISH',()=>{
//     const initialState = reducer();
//     let IMPERSONATE_FINISH;
//     const state = reducer(initialState,{type:IMPERSONATE_FINISH});
//     expect(state.isImpersonate).toBe(false);
// })