import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditUserRole from "../components/EditUserRole";
import {EDIT_ROLE_CANCEL, EDIT_ROLE_CHANGE} from "../reducers/userReducer";

it('should dispatch EDIT_ROLE_CANCEL when Close button is clicked', () => {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            editUserId: '',
            editUserRoles: ''
        }
    }
    render(<EditUserRole _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)
    userEvent.click(screen.getByText('Close'))
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_ROLE_CANCEL})
})

it('should dispatch EDIT_ROLE_CHANGE when Save button is clicked', () => {
    const dispatch = jest.fn()
    const state = {
        userReducer: {
            editUserId: '',
            editUserRoles: ''
        }
    }
    render(<EditUserRole _useDispatch={() => dispatch} _useSelector={fn => fn(state)}/>)
    userEvent.click(screen.getByText('Save'))
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})