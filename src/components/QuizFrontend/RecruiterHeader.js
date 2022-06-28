import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Col} from "react-bootstrap";
import {ADD_QUIZZES, initiateGetAllQuizzes, LOGOUT_RECRUITER} from "../../reducers/quizReducer";

import {IMPERSONATE_DONE, IMPERSONATE_FINISH, LOGOUT} from "../../reducers/userReducer";

import {TOGGLE_ASSIGN_QUIZ, TOGGLE_GRADE_QUIZ} from "../../reducers/gradeAssignmentReducer";


export default function RecruiterHeader({
                                            _useDispatch = useDispatch, _useSelector = useSelector,
                                            _initiateGetAllQuizzes = initiateGetAllQuizzes,
                                        }) {
    const dispatch = _useDispatch()

    function handleGetAllProc() {
        dispatch(_initiateGetAllQuizzes())
    }

    const impersonate = useSelector(state => state.userReducer.isImpersonate)

    return <div className='my-3 d-flex justify-content-between'>
        <Badge bg={'secondary'} className={'d-flex flex-column justify-content-center w-25'}>Welcome,Recruiter</Badge>
        <Button title='Create Quizzes/Questions' onClick={() => dispatch({type: ADD_QUIZZES})}
                variant={"outline-primary"}>Create Quizzes/Questions</Button>
        <Button title='Get All Quizzes' onClick={handleGetAllProc}
                variant={"outline-primary"}>Get All Quizzes</Button>
        <Button title='Assign Quiz to Users'
                onClick={() => {
                    dispatch(initiateGetAllQuizzes())
                    setTimeout(() => dispatch({type: TOGGLE_ASSIGN_QUIZ}), 50)
                }}
                variant={"outline-primary"}>Assign Quiz to Users</Button>
        <Button title='Grade Completed Quizzes'
                onClick={() => dispatch({type: TOGGLE_GRADE_QUIZ})}
                variant={"outline-primary"}>Grade Completed Quizzes</Button>
        <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT})}
                               variant={"outline-secondary"}>
            LOGOUT</Button></Col>
        {impersonate ? <Col xs='auto'> <Button onClick={() =>
            dispatch({type: IMPERSONATE_FINISH})}>Done impersonate</Button> </Col> : null}
    </div>
}