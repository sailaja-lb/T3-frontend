import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Row, Table} from "react-bootstrap";
import GetCompletedQuiz from "./GetCompletedQuiz";
import {PREVIOUS_PAGE, LOGOUT_RECRUITER} from "../reducers/quizReducer";
export default function GetCompletedQuizzes({
                                          _useSelector = useSelector,
                                          _usedispatch = useDispatch,
                                          _GetCompletedQuiz = GetCompletedQuiz
                                      }) {
    const dispatch = _usedispatch()
    const responses = _useSelector(state => state.quizReducer.getResponses)
    const compResponses = responses.filter(foll=>foll.status === "Completed")
    return <Row>
        <div className={'d-flex justify-content-between'}>
            <Col className={'justify-content-between'} xs='auto'><Button title='Logout'
                                                                         onClick={() => dispatch({type: LOGOUT_RECRUITER})} variant={"outline-secondary"}>
                LOGOUT</Button></Col>
            <Col xs='auto'><Button title='Previous Page' onClick={() => dispatch({type: PREVIOUS_PAGE})}
                                   variant={"outline-secondary"}>
                PREVIOUS PAGE</Button></Col>
        </div>
        {compResponses.map((resp, index) => <div className={'m-3'} key={index}>
            <_GetCompletedQuiz resp={resp}/>
        </div>)}
    </Row>
}