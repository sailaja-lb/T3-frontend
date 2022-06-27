import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import GradeCompletedQuizzes from "./GradeCompletedQuizzes";
import {Alert, Button, ListGroup} from "react-bootstrap";
import {CHOSEN_APPLICANT_ID, TOGGLE_GRADE_QUIZ} from "../reducers/gradeAssignmentReducer";

function SelectApplicantQuiz() {
    const users = useSelector(state => state.userReducer.users)
    const dispatch = useDispatch()

    const filterByApplicant = users.filter(user => user?.role === 'Applicant')

    const uniqueIds = []
    const uniqueUsersId = filterByApplicant.filter(element => {
        const isDuplicate = uniqueIds.includes(element.username);
        if (!isDuplicate) {
            uniqueIds.push(element.username);
            return true;
        }
        return false;
    })

    const chosenApplicant = useSelector(state => state.gradeAssignmentReducer.chosenApplicantId)

    if (uniqueUsersId.length === 0)
        return <div>
            <div className={'d-flex justify-content-end'}>
                <Button onClick={() => dispatch({type: TOGGLE_GRADE_QUIZ})}>Back</Button>
            </div>
            <Alert variant={'danger'} className={'mt-3 d-flex justify-content-center'}>
                There are no Applicants to Grade
            </Alert>
        </div>
    else if (chosenApplicant)
        return <GradeCompletedQuizzes/>
    else
        return <div>
            <div className={'d-flex justify-content-end'}>
                <Button onClick={() => dispatch({type: TOGGLE_GRADE_QUIZ})}>Back</Button>
            </div>

            <ListGroup className={'d-flex w-75'}>
                <ListGroup.Item active> Select an applicant that you would like to grade.</ListGroup.Item>
                {uniqueUsersId.map((user, index) =>
                    <ListGroup.Item action onClick={() =>
                        dispatch({type: CHOSEN_APPLICANT_ID, id: user?.id})} key={index}>
                        {index + 1 + ": "} {user?.username}
                    </ListGroup.Item>)}
            </ListGroup>
        </div>

}

export default SelectApplicantQuiz;