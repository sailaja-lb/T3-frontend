import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {CANCEL, REGISTER_USER, UPDATE_CREDENTIALS} from "../reducers/userReducer";
import Register from "../components/Register";


it('should show username and password field', () => {
    render(<Register _useSelector={() => {}} _useDispatch={() => {}}/>)
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
})

it('should update username when user types in username box', () => {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            addNewUser:
                {
                    username:'',
                    password:'',
                    role:''
                },
        }
    }
    render(<Register _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
    const usernameElement = screen.getByPlaceholderText('Username')
    const username = 'user1'
    userEvent.type(usernameElement, username)
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_USER, payload: {username:'user1', password:'',role:''}})
})

it('should update password when user types in password box', () => {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            addNewUser:
                {
                    username:'',
                    password:'',
                    role:''
                },
        }
    }
    render(<Register _useSelector={fn => fn(state)} _useDispatch={()=>dispatch}/>)
    const pwdElement = screen.getByPlaceholderText('Password')
    const password = 'pwd1'
    userEvent.type(pwdElement, password)
    expect(dispatch).toHaveBeenCalledWith({type: REGISTER_USER, payload: {username:'', password:'pwd1',role:''}})
})

it('should dispatch initiateRegister when user clicks register', () => {
    const dispatch = jest.fn()
    render(<Register _useSelector={() => {}} _useDispatch={() => dispatch}/>)
    userEvent.click(screen.getByText('Register'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})
it('should dispatch CANCEL when Back to Login button is clicked', () => {
    const dispatch = jest.fn()
    render(<Register _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    userEvent.click(screen.getByText('Back To Login'))
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL})
})

