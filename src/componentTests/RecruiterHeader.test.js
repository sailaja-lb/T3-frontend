import {ADD_QUIZZES, initiateGetAllQuizzes, LOGOUT_RECRUITER} from "../reducers/quizReducer";
import RecruiterHeader from "../components/RecruiterHeader";
import {render,screen} from "@testing-library/react";

it('should dispatch LOGOUT when LOGOUT button is clicked', () => {
    const dispatch = jest.fn()
    render(<RecruiterHeader _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    screen.getByTitle('Logout').click()
    expect(dispatch).toHaveBeenCalledWith({type: LOGOUT_RECRUITER})
})

it('should show Create Quizzes/Questions Get All Quizzes Grade Assign Quiz To User Completed Quizzes & Logout buttons', () => {
    render(<RecruiterHeader _useDispatch={() => {}} _useSelector={() => {}}/>)
    expect(screen.getByTitle('Logout')).toBeInTheDocument()
    expect(screen.getByTitle('Create Quizzes/Questions')).toBeInTheDocument()
    expect(screen.getByTitle('Get All Quizzes')).toBeInTheDocument()
    expect(screen.getByTitle('Assign Quiz to Users')).toBeInTheDocument()
    expect(screen.getByTitle('Grade Completed Quizzes')).toBeInTheDocument()
})
it('should dispatch ADD_QUIZZES when Create Quizzes/Questions button is clicked', () => {
    const dispatch = jest.fn()
    render(<RecruiterHeader _useDispatch={() => dispatch} _useSelector={() => {}}/>)
    screen.getByTitle('Create Quizzes/Questions').click()
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZZES})
})

it('should initiate Get All Quizzes when Get All Quizzes button is clicked', () => {
    const dispatch = jest.fn()
    const initiateGetAllQuizzes = jest.fn()
    const ret = 'some return'
    initiateGetAllQuizzes.mockImplementation(() => ret)
    render(<RecruiterHeader _useDispatch={() => dispatch} _useSelector={() => {}} _initiateGetAllQuizzes={initiateGetAllQuizzes}/>)
    screen.getByTitle('Get All Quizzes').click()
    expect(initiateGetAllQuizzes).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(ret)
})