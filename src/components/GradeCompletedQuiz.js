import React, {useState} from 'react';
import {Button, Form, FormControl, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {UPDATE_GRADE, UPDATE_VIEW_RESPONSE, updateGradedQuiz} from "../reducers/gradeAssignmentReducer";

function GradeCompletedQuiz({assignment}) {

    const {quizTemplateId, assignedTo, assignmentId} = assignment
    const dispatch = useDispatch()
    const users = useSelector(state => state.userReducer.users)
    const applicant = users.find(user => user?.id === assignedTo)

    const currentUser = useSelector(state => state.userReducer.loggedInUser)
    const currentUserRole = useSelector(state => state.userReducer.loggedInRole)
    const id = users.find(user => user.username === currentUser
        && user.role === currentUserRole)
    const currentUserId = id.id

    function handleUpdateGrade() {
        dispatch({type: UPDATE_GRADE, payload: {assignmentId, grade, currentUserId}})
        dispatch(updateGradedQuiz())
    }

    const [grade, setGrade] = useState('A')

    return <div className={'d-flex flex-wrap justify-content-between'}>
        <Table striped bordered>
            <thead>
            <tr>
                <th>Applicant</th>
                <th>Quiz Template Id</th>
                <th>View questions and response</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td> {applicant.username}</td>
                <td> {quizTemplateId}</td>
                <td><Button
                    onClick={() => dispatch({
                        type: UPDATE_VIEW_RESPONSE,
                        payload: assignment.responses
                    })}>View</Button>
                </td>
                <td>
                    <Form.Select onChange={e => setGrade(e.target.value)}>
                        <option value={'A'}>A</option>
                        <option value={'B'}>B</option>
                        <option value={'C'}>C</option>
                        <option value={'D'}>D</option>
                        <option value={'F'}>F</option>

                    </Form.Select>
                    <Button onClick={handleUpdateGrade}>Grade Quiz</Button>
                </td>
            </tr>
            </tbody>
        </Table>
    </div>
}

export default GradeCompletedQuiz;