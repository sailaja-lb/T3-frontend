import React from 'react';
import {Button, FormControl, Table} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {UPDATE_VIEW_RESPONSE} from "../reducers/gradeAssignmentReducer";

function GradeCompletedQuiz({assignment}) {

    const {quizTemplateId, assignmentId} = assignment
    const dispatch = useDispatch()

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
                <td> {assignmentId}</td>
                <td> {quizTemplateId}</td>
                <td><Button
                    onClick={() => dispatch({
                        type: UPDATE_VIEW_RESPONSE,
                        payload: assignment.responses
                    })}>View</Button>
                </td>
                <td><FormControl onSubmit={e => e.preventDefault()}
                                 placeholder={'Enter Grade  e.g. (a,b,c,d or f)'}/>
                    <Button>Grade Quiz</Button>
                </td>
            </tr>
            </tbody>
        </Table>
    </div>
}

export default GradeCompletedQuiz;