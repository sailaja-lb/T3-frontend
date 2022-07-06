import {fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsersList from "../components/UsersList";
import {EDIT_ROLE_START} from "../reducers/userReducer";

it('should display all the users except the loggedInUser',() => {
    const loggedInUser = 'user1'
    const state = {
        userReducer: {
            users: [{username: 'user1', password: '', role: ''}, {username: 'user2', password: '', role: ''}],
            loggedInUser
        },
    }

    render(<UsersList _useDispatch={()=> {}} _useSelector={fn => fn(state)} />)
    expect(screen.getByText('user2')).toBeInTheDocument()
    expect(screen.queryByText('user1')).not.toBeInTheDocument()
})

it('should show an delete button', () => {
    const dispatch = jest.fn()
    const user = {
        id: 1,
        username: "user1",
        password: 'pass1',
        role:'admin'
    }
    const state = {
        userReducer: {
            users: [{username: 'user1', password: '', role: ''}, {username: 'user2', password: '', role: ''}],
            loggedInUser:'admin'
        },
    }
    render(<UsersList _useDispatch={()=> {}} _useSelector={fn => fn(state)} />)
    const deleteButton = screen.queryByRole("button", { name: "Delete" });
    userEvent.click(deleteButton);
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})
it('should call switchToImpersonate function and dispatch IMPERSONATE_START when clicked', () =>{
    const dispatch = jest.fn()
    const mockUsersList = () => <div>users list</div>
    const state = {
        userReducer: {
            users: [
                {
                    id: 1,
                    username: 'user1',
                    password: 'pass1',
                    role: 'Admin'
                }, {
                    id: 2,
                    username: 'user2',
                    password: 'pass2',
                    role: 'Admin2'
                }],
            loggedInUser: 'Admin'
        }
    }
    render(<UsersList _useDispatch={() => dispatch}
                        _useSelector={fn => fn(state)} UsersListC= {mockUsersList}/>)

    expect(typeof dispatch.mock.calls[0][0]).toBe('function')


})

