import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import GradeCompletedQuiz from "./GradeCompletedQuiz";
import {Button} from "react-bootstrap";
import {TOGGLE_GRADE_QUIZ} from "../reducers/lengReducer";

function GradeCompletedQuizzes({}) {

    const responses = useSelector(state => state.lengReducer.responses)
    const dispatch = useDispatch()

    return <div>
        <div className={'d-flex justify-content-end'}>
            <Button onClick={() => dispatch({type: TOGGLE_GRADE_QUIZ})}>Back</Button>
        </div>
        {responses.map((responsed, index) => {
            if (responsed?.completed)
                return <GradeCompletedQuiz responsed={responsed} key={index}/>
        })}
    </div>
}

export default GradeCompletedQuizzes;