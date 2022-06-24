import React from 'react';
import {useDispatch} from "react-redux";
import {TAKE_QUIZ} from "../../reducers/responseReducer";
import {Button, Card} from "react-bootstrap";

function StaticQuiz({
                        staticQuiz,
                        _useDispatch = useDispatch
                    }) {

    const dispatch = _useDispatch()

    function takeQuiz() {
        dispatch({type: TAKE_QUIZ, payload: staticQuiz})
    }

    return <Card>
        <Card.Header>ID: {staticQuiz.quizTemplateId}</Card.Header>
        <Card.Footer>
            <Button onClick={takeQuiz}>Select Quiz</Button>
        </Card.Footer>
    </Card>
}

export default StaticQuiz;