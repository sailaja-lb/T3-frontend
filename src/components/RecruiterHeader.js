import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Card, Col, Form, Row} from "react-bootstrap";
import {ADD_QUIZZES,initiateGetAllQuizzes, LOGOUT_RECRUITER} from "../reducers/quizReducer";



export default function RecruiterHeader({
                                   _useDispatch = useDispatch, _useSelector = useSelector,
                                            _initiateGetAllQuizzes=initiateGetAllQuizzes,
                                            /*        _initiateGetCompletedQuizzes=initiateGetCompletedQuizzes*/
                               }) {
    const dispatch = _useDispatch()
   function handleGetAllProc() {
        dispatch(_initiateGetAllQuizzes())
    }

  /*  function handleGetCompletedQuizzes() {
        dispatch(_initiateGetCompletedQuizzes())
    }*/

    return <div className='my-3 d-flex justify-content-between'>
        <Badge bg={'secondary'} className={'d-flex flex-column justify-content-center w-25'}>Welcome,Recruiter</Badge>
        <Button title='Create Quizzes/Questions' onClick={() => dispatch({type: ADD_QUIZZES})}
                variant={"outline-primary"}>Create Quizzes/Questions</Button>
        <Button title='Get All Quizzes' onClick={handleGetAllProc}
                variant={"outline-primary"}>Get All Quizzes</Button>
        <Button title='Assign Quiz to Users'
          /*      onClick={handleGetAllFollowings}*/
                variant={"outline-primary"}>Assign Quiz to Users</Button>
        <Button title='Grade Completed Quizzes'
              /*  onClick={handleGetCompletedQuizzes}*/
                variant={"outline-primary"}>Grade Completed Quizzes</Button>
        <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT_RECRUITER})}
                               variant={"outline-secondary"}>
            LOGOUT</Button></Col>
    </div>
}