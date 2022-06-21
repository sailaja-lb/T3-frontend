import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Col, Dropdown, DropdownButton, Form, FormGroup, Row} from "react-bootstrap";
import {BsFileEarmarkPlus} from "react-icons/bs";

import {ADD_QUIZ_DETAILS, initiateAddQuiz} from "../reducers/quizReducer";


export default function AddQuiz({
                                       _useDispatch = useDispatch, _useSelector = useSelector,
                                       _initiateAddQuiz = initiateAddQuiz
                                   }) {
    const addQuizDetails = _useSelector(state => state.quizReducer.addQuizDetails)
    const dispatch = _useDispatch()


    function setquizTemplateId(quizTemplateId) {
        dispatch({type: ADD_QUIZ_DETAILS, payload: {...addQuizDetails, quizTemplateId}})
    }

    function setquestionType(questionType) {
        dispatch({type: ADD_QUIZ_DETAILS, payload: {...addQuizDetails,questionType}})
    }

    function setquestionNum(questionNumber) {
        console.log(questionNumber)
        dispatch({type: ADD_QUIZ_DETAILS, payload: {...addQuizDetails, questionNumber}})
    }

    function setQuestions(questions) {
        dispatch({type: ADD_QUIZ_DETAILS, payload: {...addQuizDetails, questions}})
    }

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(_initiateAddQuiz())
    }

    return<Form className={'d-flex justify-content-between'} onSubmit={handleSubmit}>
        <Form.Control required type='text'   placeholder="Enter quiz template Id here"
                      onChange={e => setquizTemplateId(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
            Quiz Template Id cannot be blank
        </Form.Control.Feedback>
        <select required
                onChange={e => setquestionType(e.target.value)}>
            <option value="response Type">Choose a questionType</option>
            <option value="Boolean">Boolean</option>
            <option value="Text">Text</option>
      {/*  <option value="Multiple Choice">Multiple Choice</option>*/}
        </select>
        <Form.Control type='text' required  placeholder='Enter question number here'
                      onChange={e => setquestionNum(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Question Number cannot be blank
                    </Form.Control.Feedback>
        <Form.Control type='text' required  placeholder='Enter  question here'
                      onChange={e => setQuestions(e.target.value)}/>
        <Form.Control.Feedback type="invalid">
            Question cannot be blank
        </Form.Control.Feedback>
{/*        <Form.Control type='text' placeholder='Enter Stage sequence here'
                      onChange={e => setstageSeq(e.target.value)}/>*/}
        <div className={'d-flex justify-content-between'}>
            <Button  type='submit' title='Apply' variant={"outline-success"} size='sm'>
              {/*      onClick={handleAddProc}>*/}
                <BsFileEarmarkPlus/> </Button>
{/*            <Button title='Cancel' variant={"outline-danger"} size='sm'
                    onClick={() => dispatch({type: CANCEL_ADD_PROCESS})}>
                <BsFileEarmarkPlus/> </Button>*/}
        </div>
    </Form>
}
