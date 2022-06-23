import React from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {TOGGLE_ASSIGN_QUIZ, TOGGLE_GRADE_QUIZ} from "../reducers/lengReducer";
import AssignQuizToApplicant from "./AssignQuizToApplicant";
import GradeCompletedQuizzes from "./GradeCompletedQuizzes";

function LengEntryPoint() {
    const dispatch = useDispatch()
    const toggleAssignQuiz = useSelector(state => state.lengReducer.toggleAssignQuiz)
    const toggleGradeQuiz = useSelector(state => state.lengReducer.toggleGradeQuiz)


    if (toggleAssignQuiz)
        return <AssignQuizToApplicant/>
    else if (toggleGradeQuiz)
        return <GradeCompletedQuizzes/>
    else
        return <div>
            <Button onClick={() => dispatch({type: TOGGLE_ASSIGN_QUIZ})}>Go to assign quiz</Button>
            {' '}
            <Button onClick={() => dispatch({type: TOGGLE_GRADE_QUIZ})}>Go to grade a quiz</Button>
        </div>

}

export default LengEntryPoint;