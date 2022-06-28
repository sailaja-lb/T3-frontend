import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {LOGOUT, REGISTER_START} from "../reducers/userReducer";
import Admin from "../components/Admin";

it('should show spinner component when loading is true', () =>{
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedUserRole = 'This is expectedUserRole'
    const loadingText = 'expected loading text'

    const mockUsersList = () => <div>{expectedList}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const mockUserRole = () => <div>{expectedUserRole}</div>
    const state = {
        userReducer: {
            loading: true,
            credentials:{
                username:'user1',
                password:'pwd',
                role:'Admin'
            },
            isLoggedIn: true,
            loginPending: false,
            loginErrorMessage: false,
            successfulRegisterMessage: false,
            loggedInUser: 'user1',
            loggedInRole: 'Admin'
        },
    }
    render(<Admin _useDispatch={() => dispatch}
                     _useSelector={fn => fn(state)} UsersListC = {mockUsersList} SpinnerC ={mockLoadingText} EditUserRoleC={mockUserRole}/>)
    expect(screen.getByText(loadingText)).toBeInTheDocument()

})

it('should show userslist when loading is false', () =>{
    const dispatch = jest.fn();
    const usersList = 'UsersList'
    const expectedUserRole = 'This is expectedUserRole'
    const loadingText = 'expected loading text'

    const mockUsersList = () => <div>{usersList}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const mockUserRole = () => <div>{expectedUserRole}</div>
    const state = {
        userReducer: {
            loading: false,
            credentials:{
                username:'user1',
                password:'pwd',
                role:'Admin'
            },
            isLoggedIn: true,
            loginPending: false,
            loginErrorMessage: false,
            successfulRegisterMessage: false,
            loggedInUser: 'user1',
            loggedInRole: 'Admin'
        },
    }
    render(<Admin _useDispatch={() => dispatch}
                  _useSelector={fn => fn(state)} UsersListC = {mockUsersList} SpinnerC ={mockLoadingText} EditUserRoleC={mockUserRole}/>)
    expect(screen.getByText(usersList)).toBeInTheDocument()

})
it('should show EdituserRole component', () =>{
    const dispatch = jest.fn();
    const usersList = 'UsersList'
    const expectedUserRole = 'This is expectedUserRole'
    const loadingText = 'expected loading text'

    const mockUsersList = () => <div>{usersList}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const mockUserRole = () => <div>{expectedUserRole}</div>
    const state = {
        userReducer: {
            loading: false,
            credentials:{
                username:'user1',
                password:'pwd',
                role:'Admin'
            },
            isLoggedIn: true,
            loginPending: false,
            loginErrorMessage: false,
            successfulRegisterMessage: false,
            loggedInUser: 'user1',
            loggedInRole: 'Admin'
        },
    }
    render(<Admin _useDispatch={() => dispatch}
                  _useSelector={fn => fn(state)} UsersListC = {mockUsersList} SpinnerC ={mockLoadingText} EditUserRoleC={mockUserRole}/>)
    expect(screen.getByText(expectedUserRole)).toBeInTheDocument()

})

it('should dispatch LOGOUT when logout button clicked', () => {
    const dispatch = jest.fn();
    render(<Admin _useDispatch={() => dispatch}
                  _useSelector={() => {}} UsersListC = {() =>{}} SpinnerC ={() =>{}} EditUserRoleC={() =>{}}/>)
    screen.getByTitle('Logout').click()
    expect(dispatch).toHaveBeenCalledWith({type: LOGOUT})
})

it('should show Add User and Logout button', () => {
    const dispatch = jest.fn()
    render(<Admin _useDispatch={() => dispatch}
                   _useSelector={() => {}} UsersListC = {() =>{}} SpinnerC ={() =>{}} EditUserRoleC={() =>{}}/>)
    expect(screen.getByTitle('ADD USER')).toBeInTheDocument()
    expect(screen.getByTitle('Logout')).toBeInTheDocument()
})

it('should dispatch ADD_USER when add button clicked', () => {
    const dispatch = jest.fn()
    render(<Admin _useDispatch={() => dispatch}
                  _useSelector={() => {}} UsersListC = {() =>{}} SpinnerC ={() =>{}} EditUserRoleC={() =>{}}/>)
    screen.getByTitle('ADD USER').click()
    //userEvent.click(screen.getByTitle('Add Thread'))
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_START})
})

