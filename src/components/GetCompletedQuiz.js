import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, Modal, Table} from "react-bootstrap";
import {BsPencil, BsTrash} from "react-icons/bs";

import {useState} from "react";


export default function GetCompletedQuiz({
                                         resp,  _usedispatch = useDispatch,
                                      /*   _initiatedeleteFoll = initiatedeleteFoll*/

                                     }) {
    const dispatch = _usedispatch()
    const [show, setShow] = useState(false);
    const {
        quizTemplateId, questionNum,questions,
        answer, status, grade, takenBy
    } = resp ? resp : {}

/*
    function handleDeleteFoll() {
        console.log("process title to delete",processTitle)
//        alert("All followings of the process have been successfully deleted")
        dispatch(_initiatedeleteFoll(processTitle))
        setShow(false)
    }*/

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <Col>

        <Form.Control required type='text'   placeholder="Enter grade"
        />
        <div className={'d-flex flex-wrap justify-content-between'}>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>Quiz Template Id</th>
                    <th>Question Num</th>
                    <th>Question</th>
                    <th>Response</th>
                    <th>Applicant</th>
                    <th>Grade</th>

                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{quizTemplateId}</td>
                    <td>{questionNum}</td>
                    <td>{questions}</td>
                    <td>{answer}</td>
                    <td>{takenBy}</td>
                  {/*  <td ><Form.Control required type='text'   placeholder="Enter grade"
                                       /></td>*/}
                    {/*  <td><Button title='Delete' variant="outline-danger" size='sm' onClick={handleDeleteFoll}>
                                <BsTrash/>
                            </Button></td>*/}
            {/*        <td>
                        <Button title='Delete' variant="outline-danger" size='sm' onClick={handleShow}>
                            <BsTrash/>
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Followings for {processTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete all followings for {processTitle}?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant={"outline-secondary"} onClick={handleClose}>Cancel</Button>
  /                              <Button variant={"outline-primary"} onClick={handleDeleteFoll}>Confirm</Button>
                            </Modal.Footer>
                        </Modal>
                    </td>*/}
                </tr>
                </tbody>
            </Table>
        </div>
    </Col>

}

