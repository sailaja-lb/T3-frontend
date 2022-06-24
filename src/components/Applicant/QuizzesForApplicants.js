import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, FormText, Row, Table} from "react-bootstrap";
import {LOGOUT} from "../../reducers/userReducer";
import TakeQuiz from "./TakeQuiz";
import {initiateSubmitResponse, PREVIOUS_PAGE} from "../../reducers/applicantReducer";


export default function QuizzesForApplicants({
                                      _useSelector = useSelector, _TakeQuiz = TakeQuiz,
                                      _usedispatch = useDispatch,
                                     _initiateSubmitResponse=initiateSubmitResponse
                                  }) {


    const savecount=_useSelector(state=>state.applicantReducer.savecount)
    const assignPayload = _useSelector(state=>state.applicantReducer.assignments)
    const questionPayload = _useSelector(state=>state.applicantReducer.quizToTake)
    const counter = questionPayload.length
    const dispatch = _usedispatch()
    console.log(savecount)
    console.log(counter)

    function handleSubmitResponse() {
        if (counter===savecount) {
            alert("Thank you for following the process! Your responses have been submitted! ")
            dispatch(_initiateSubmitResponse())
        }
        else alert("Respond to all questions then click on Submit")
    }

    return <Row>
        <div className={'d-flex justify-content-between'}>
        <Col className={'justify-content-between'} xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT})}
                               variant={"outline-secondary"}>
            LOGOUT</Button></Col>
            <Col xs='auto'><Button title='Submit Response'  onClick={handleSubmitResponse}
                                   variant={"outline-primary"}>
                SUBMIT RESPONSE</Button></Col>
            <Col xs='auto'><Button title='Previous Page' onClick={() => dispatch({type: PREVIOUS_PAGE})}
                                  variant={"outline-secondary"}>
            PREVIOUS PAGE</Button></Col>
        </div>

        {questionPayload.map((questionsToRespond, index) => <div className={'m-3'} key={index}>
            <_TakeQuiz questionsToRespond={questionsToRespond} />
        </div>)}


    </Row>
}