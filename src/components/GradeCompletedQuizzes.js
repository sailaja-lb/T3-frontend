import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import GradeCompletedQuiz from "./GradeCompletedQuiz";
import {Button} from "react-bootstrap";
import {CANCEL_APPLICANT_ID} from "../reducers/lengReducer";

function GradeCompletedQuizzes() {
    // will change to grab from assignment table
    const responses = useSelector(state => state.lengReducer.responses)
    const userId = useSelector(state => state.userReducer.users)
    const dispatch = useDispatch()


    return <div>
        <div className={'d-flex justify-content-end'}>
            <Button onClick={() => dispatch({type: CANCEL_APPLICANT_ID})}>Back</Button>
        </div>
        {responses.map((responsed, index) => {
            if (responsed?.completed && userId === responsed?.assignmentId)
                return <GradeCompletedQuiz responsed={responsed} key={index}/>
        })}
    </div>
}

export default GradeCompletedQuizzes;