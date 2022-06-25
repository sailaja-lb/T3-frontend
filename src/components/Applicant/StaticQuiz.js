import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {TAKE_QUIZ} from "../../reducers/responseReducer";
import {Button, Card} from "react-bootstrap";


function StaticQuiz({
                        staticQuiz,_useSelector=useSelector,
                        _useDispatch = useDispatch,

                    }) {

    const dispatch = _useDispatch()
    const isTakingQuiz = _useSelector(state => state.responseReducer.isTakingQuiz)

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