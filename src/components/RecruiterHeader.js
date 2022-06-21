import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Card, Col, Form, Row} from "react-bootstrap";
import {ADD_QUIZZES, LOGOUT_RECRUITER} from "../reducers/quizReducer";



export default function RecruiterHeader({
                                   _useDispatch = useDispatch, _useSelector = useSelector,
                              /*      _initiateGetAllProcesses=initiateGetAllProcesses,
                                   _initiateGetAllFollowings=initiateGetAllFollowings*/
                               }) {
    const dispatch = _useDispatch()
/*    function handleGetAllProc() {
        dispatch(_initiateGetAllProcesses())
    }

    function handleGetAllFollowings() {
        dispatch(_initiateGetAllFollowings())
    }*/

    return <div className='my-3 d-flex justify-content-between'>
        <Badge bg={'secondary'} className={'d-flex flex-column justify-content-center w-25'}>Welcome,Recruiter</Badge>
        <Button title='Add Quiz/Questions' onClick={() => dispatch({type: ADD_QUIZZES})}
                variant={"outline-primary"}>Add Processes/Stages</Button>
 {/*       <Button title='Get Processes' onClick={handleGetAllProc}
                variant={"outline-primary"}>Get All Processes</Button>
        <Button title='Get Followings' onClick={handleGetAllFollowings}
                variant={"outline-primary"}>Get Processes Followed</Button>*/}
        <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT_RECRUITER})}
                               variant={"outline-secondary"}>
            LOGOUT</Button></Col>
    </div>
}