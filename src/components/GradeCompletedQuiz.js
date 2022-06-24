import React from 'react';
import {useSelector} from "react-redux";
import {Button, FormControl, Table} from "react-bootstrap";

function GradeCompletedQuiz({responsed}) {
    //
    //move these out and pass in as props
    // const applicants = useSelector(state => state.userReducer.users)
    // const quizzes = useSelector(state => state.lengReducer.quizzes)
    //
    const {questionId, questionText, response, assignmentId} = responsed

    return <div className={'d-flex flex-wrap justify-content-between'}>
        <Table striped bordered>
            <thead>
            <tr>
                <th>Quiz Template Id</th>
                <th>Question</th>
                <th>Response</th>
                <th>Applicant</th>
                <th>Grade</th>

            </tr>
            </thead>
            <tbody>
            <tr>
                <td> {questionId}</td>
                <td> {questionText}</td>
                <td> {response}</td>
                <td> {assignmentId}</td>
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