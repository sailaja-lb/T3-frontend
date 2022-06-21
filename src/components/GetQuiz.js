import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Modal, Table} from "react-bootstrap";
import {BsFillArchiveFill, BsPencil, BsTrash} from "react-icons/bs";

import {useState} from "react";
import {EDIT_QUIZ, initiatedeleteQuestion, initiatedeleteQuiz} from "../reducers/quizReducer";

export default function GetQuiz({
                                       quiz,_initiatedeleteQuiz=initiatedeleteQuiz,_usedispatch=useDispatch,
                                    _initiatedeleteQuestion=initiatedeleteQuestion

                                   }) {
    const dispatch = _usedispatch()
    const [show, setShow] = useState(false);
    const {
        quizId, quizQuestion, questionNumber,
        questionType, quizTemplateId,
    } = quiz ? quiz : {}
 
    function handleDeleteQuiz() {
        dispatch(_initiatedeleteQuiz(quizTemplateId))
        setShow(false)
    }

    function handleDeleteQuestion() {
        dispatch(_initiatedeleteQuestion(quizId))
    }



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return     <Col>
                <div className={'d-flex flex-wrap justify-content-between'}>
                    <Table striped bordered>
                        <thead>
                        <tr>
                            <th>Quiz Template Id</th>
                            <th>Question Number</th>
                            <th>Question Type</th>
                            <th>Question</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{quizTemplateId}</td>
                            <td>{questionNumber}</td>
                            <td>{questionType}</td>
                            <td>{quizQuestion}</td>
                            <td><Button title='Edit' variant="outline-secondary" size='sm' onClick={() => dispatch({type: EDIT_QUIZ,quiz: quiz})}><BsPencil/>
                            </Button></td>
                            <td><Button title='Delete Question' variant="outline-danger" size='sm'onClick={handleDeleteQuestion}>
                                <BsTrash/>
                            </Button></td>

                            <td><Button title='Delete Quiz' variant="outline-danger" size='sm'   onClick={handleShow}>
                                <BsFillArchiveFill/>
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Delete the entire quiz {quizTemplateId}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to all questions for quiz- {quizTemplateId}?
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant={"outline-secondary"} onClick={handleClose}>Cancel</Button>
                                    <Button variant={"outline-primary"} onClick={handleDeleteQuiz}>Confirm</Button>
                                </Modal.Footer>
                            </Modal></td>
                        </tr>
                        </tbody>
                    </Table>

                </div>
            </Col>

}

