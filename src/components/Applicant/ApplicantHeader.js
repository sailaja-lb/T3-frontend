import {useDispatch, useSelector} from "react-redux";
import {Badge, Button, Card, Col, Form, Row} from "react-bootstrap";
import {ADD_QUIZZES,initiateGetAllQuizzes, LOGOUT_RECRUITER} from "../../reducers/quizReducer";
import {LOGOUT} from "../../reducers/userReducer";
import {getAssigned, initiateGetAssigned, initiateGetQuizToRespond} from "../../reducers/applicantReducer";



export default function ApplicantHeader({
                                   _useDispatch = useDispatch, _useSelector = useSelector,
                                            _initiateGetQuizToRespond=initiateGetQuizToRespond,
                                                    _initiateGetAssigned=initiateGetAssigned
                               }) {
    const dispatch = _useDispatch()
   function handleGetQuiz() {
        const quizTemplateId = 1
        dispatch(_initiateGetQuizToRespond(quizTemplateId))

    }

    function  handleGetAssigned() {
        dispatch(_initiateGetAssigned())
    }

    return <div className='my-3 d-flex justify-content-between'>
        <Badge bg={'secondary'} className={'d-flex flex-column justify-content-center w-25'}>Welcome,Recruiter</Badge>
        <Button title='Create Quizzes/Questions' onClick={handleGetQuiz}
                variant={"outline-primary"}>Take Quiz</Button>
        <Button title='Get Assigned' onClick={handleGetAssigned}
                variant={"outline-primary"}>Get Assigned</Button>
        <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT})}
                               variant={"outline-secondary"}>
            LOGOUT</Button></Col>
    </div>
}