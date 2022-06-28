import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/Login";
import {REGISTER_START, UPDATE_CREDENTIALS} from "../reducers/userReducer";

it('should show username and password field', () => {
    render(<Login _useSelector={() => {}} _useDispatch={() => {}}/>)
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
})

it('should update username when user types in username box', () => {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            credentials:
                {
                    username:'',
                    password:'',
                    role:''
                },
        }
    }
    render(<Login _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
    const usernameElement = screen.getByPlaceholderText('Username')
    const username = 'user1'
    userEvent.type(usernameElement, username)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_CREDENTIALS, payload: {username:'user1', password:'',role:''}})
})

it('should update password when user types in password box', () => {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            credentials:
                {
                    username:'',
                    password:'',
                    role:''
                },
        }
    }
    render(<Login _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
    const pwdElement = screen.getByPlaceholderText('Password')
    const password = 'pwd1'
    userEvent.type(pwdElement, password)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_CREDENTIALS, payload: {username:'', password:'pwd1',role:''}})
})

it('should dispatch initiateLogin when user clicks login', () => {
    const dispatch = jest.fn()
    render(<Login _useSelector={() => {}} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Login'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})
it('should dispatch REGISTER when Register button is clicked', () => {
    const dispatch = jest.fn()
    render(<Login _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Register'))
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_START})
})
