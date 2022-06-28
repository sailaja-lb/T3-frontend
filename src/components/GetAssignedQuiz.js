import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Modal, Table} from "react-bootstrap";
import {BsFillArchiveFill, BsPencil, BsTrash} from "react-icons/bs";

import {useState} from "react";
import {initiatedeleteAssignment} from "../reducers/gradeAssignmentReducer";

export default function GetAssignedQuiz({
                                       assignment,_useSelector=useSelector,
                                            _usedispatch=useDispatch,
                                            _initiatedeleteAssignment=initiatedeleteAssignment

                                   }) {
    const dispatch = _usedispatch()
    const users = _useSelector(state => state.userReducer.users)
    const assignedTo = users.find(element => element.id === assignment.assignedTo)


    function handleDeleteAssignment() {
        dispatch(_initiatedeleteAssignment(assignment.assignmentId))
    }

    return     <Col>
                <div className={'d-flex flex-wrap justify-content-between'}>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>Quiz Template Id</th>
                            <th>Assigned To</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{assignment.quizTemplateId}</td>
                            <td>{assignedTo.username}</td>

                            <td><Button title='Delete Assignment' variant="outline-danger" size='sm'
                                       onClick={handleDeleteAssignment}>
                                <BsTrash/>
                            </Button></td>

                        </tr>
                        </tbody>
                    </Table>

                </div>
            </Col>

}

