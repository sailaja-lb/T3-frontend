import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import GradeCompletedQuizzes from "./GradeCompletedQuizzes";
import {Button, ListGroup} from "react-bootstrap";
import {CHOSEN_APPLICANT_ID, TOGGLE_GRADE_QUIZ} from "../reducers/lengReducer";

function SelectApplicantQuiz() {
    // will change to grab from users reducer
    const users = useSelector(state => state.lengReducer.applicants)
    const dispatch = useDispatch()
    const chosenApplicant = useSelector(state => state.lengReducer.chosenApplicantId)

    if (chosenApplicant)
        return <GradeCompletedQuizzes/>
    else
        return <div>
            <div className={'d-flex justify-content-end'}>
                <Button onClick={() => dispatch({type: TOGGLE_GRADE_QUIZ})}>Back</Button>
            </div>

            <ListGroup className={'d-flex w-75'}>
                <ListGroup.Item active> Select a user that you would like to grade.</ListGroup.Item>
                {users.map((user, index) =>
                    <ListGroup.Item action onClick={() =>
                        dispatch({type: CHOSEN_APPLICANT_ID, id: user?.id})} key={index}>
                        {index + 1 + ": "} {user?.username}
                    </ListGroup.Item>)}
            </ListGroup>
        </div>

}

export default SelectApplicantQuiz;