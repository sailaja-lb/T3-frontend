import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getGrades} from "../../reducers/responseReducer";
import {Button, Card} from "react-bootstrap";

function ViewGrades({
                        _useDispatch = useDispatch,
                        _useSelector = useSelector,
                    }) {

    const dispatch = _useDispatch()

    const grades = _useSelector(state => state.responseReducer.grades)
    const gradesPending = _useSelector(state => state.responseReducer.getGradesPending)

    function handleGetGrades() {
        dispatch(getGrades())
    }


    return <div>
        {<Button disabled={gradesPending} onClick={handleGetGrades}>Get Grades</Button>}
        {grades.map((grade) => (
            <Card>
                <Card.Header>
                    <h2>{grade.assignedTo}</h2>
                </Card.Header>

                <Card.Body>
                    <h4>{grade.quizTemplateId}</h4>
                    <h4>{grade.grade}</h4>
                </Card.Body>

                <Card.Footer>
                    <h5>{grade.gradedBy}</h5>
                </Card.Footer>
            </Card>
        ))}
    </div>

}


    export default ViewGrades;
