import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {ADD_ASSIGNMENT, addAssignment, TOGGLE_ASSIGN_QUIZ} from "../reducers/lengReducer";

function AssignQuizToApplicant() {
    const users = useSelector(state => state.userReducer.users)
    const quizzes = useSelector(state => state.quizReducer.getallQuizresult)

    const uniqueIds = [];
    const uniqueQuizzesId = quizzes.filter(element => {
        const isDuplicate = uniqueIds.includes(element.quizTemplateId);
        if (!isDuplicate) {
            uniqueIds.push(element.quizTemplateId);
            return true;
        }
        return false;
    });

    const [userID, setUserID] = useState(users[0]?.id)
    const [assignQuizID, setAssignQuizID] = useState(uniqueQuizzesId[0]?.quizTemplateId)
    const dispatch = useDispatch()

    function handleAddAssignment() {
        dispatch({type: ADD_ASSIGNMENT, payload: {userID, assignQuizID}})
        dispatch(addAssignment())
    }

    return <div>
        <div className={'d-flex justify-content-end'}>
            <Button onClick={() => dispatch({type: TOGGLE_ASSIGN_QUIZ})}>Back</Button>
        </div>
        <div>
            <Form className={'d-flex justify-content-around'}>
                <Form.Label> Select user to assign quiz
                    <Form.Select onChange={e => setUserID(parseInt(e.target.value))}>
                        {users.map((user, index) =>
                            <option value={user?.id} key={index}>{user?.username}</option>)}
                    </Form.Select>
                </Form.Label>
                <Form.Label> Select quiz you like to assigned
                    <Form.Select onChange={e => setAssignQuizID(parseInt(e.target.value))}>
                        {uniqueQuizzesId.map((quiz, index) =>
                            <option value={quiz?.quizTemplateId} key={index}>{quiz?.quizTemplateId}</option>)}
                    </Form.Select>
                </Form.Label>
            </Form>
        </div>
        <div className={'d-flex justify-content-center'}>
            <Button onClick={handleAddAssignment}>Assign quiz</Button>
        </div>
    </div>
}

export default AssignQuizToApplicant;