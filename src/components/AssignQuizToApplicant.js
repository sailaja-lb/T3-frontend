import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {assignQuiz} from "../reducers/userReducer";

function AssignQuizToApplicant() {
    const users = useSelector(state => state.userReducer.users)
    const quizzes = useSelector(state => state.userReducer.quizzes)
    const [userID, setUserID] = useState(users[0]?.id)
    const [assignQuizID, setAssignQuizID] = useState(quizzes[0]?.quizId)


    return <div>
        <div>
            <Form className={'d-flex justify-content-around'}>
                <Form.Label> Select user to assign quiz
                    <Form.Select onChange={e => setUserID(e.target.value)}>
                        {users.map((user, index) =>
                            <option value={user?.id} key={index}>{user}</option>)}
                    </Form.Select>
                </Form.Label>
                <Form.Label> Select quiz you like to assigned
                    <Form.Select onChange={e => setAssignQuizID(e.target.value)}>
                        {quizzes.map((quiz, index) =>
                            <option value={quiz?.quizId} key={index}>{quiz}</option>)}
                    </Form.Select>
                </Form.Label>
            </Form>
        </div>
        <div className={'d-flex justify-content-center'}>
            <Button onClick={() => assignQuiz(assignQuizID, userID)}>Assign quiz</Button>
        </div>
    </div>

}

export default AssignQuizToApplicant;