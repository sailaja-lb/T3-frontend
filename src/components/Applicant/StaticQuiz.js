import React from 'react';
import {useDispatch, useSelector} from "react-redux";
//import {TAKE_QUIZ} from "../../reducers/responseReducer";
import {Button, Card, Col, Row} from "react-bootstrap";
import {TAKE_QUIZ} from "../../reducers/applicantReducer";


function StaticQuiz({
                        staticQuiz, _useSelector = useSelector,
                        _useDispatch = useDispatch,

                    }) {

    const dispatch = _useDispatch()
    const isTakingQuiz = _useSelector(state => state.responseReducer.isTakingQuiz)

    //   const isTakingQuiz = _useSelector(state => state.applicantReducer.isTakingQuiz)

    function takeQuiz() {
        console.log(staticQuiz)
        dispatch({type: TAKE_QUIZ, payload: staticQuiz})
    }

    return <Col>
        <Card>
            <Card.Header>ID: {staticQuiz.quizTemplateId}</Card.Header>
            <Card.Footer>
                <Button onClick={takeQuiz}>Select Quiz</Button>
            </Card.Footer>
        </Card>
    </Col>
}

export default StaticQuiz;