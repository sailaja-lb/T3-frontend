import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Dropdown, DropdownButton, Form, FormControl, FormGroup, FormText, Row} from "react-bootstrap";
import {BsFileEarmarkPlus} from "react-icons/bs";
import {CANCEL_TAKE_QUIZ, EDIT_APPLICANT_INPUT, initiateSaveResponse} from "../../reducers/applicantReducer";


export default function TakeQuiz({
                                     questionsToRespond,
                                     _useDispatch = useDispatch, _useSelector = useSelector,
                                     _initiateSaveResponse=initiateSaveResponse

                                 }) {

    const dispatch = _useDispatch()
    const responseToAdd = _useSelector(state => state.quizReducer.responseToAdd)
 //   const assignPayload = _useSelector(state=>state.applicantReducer.assignments)
    const users = _useSelector(state => state.userReducer.users)
    const credentials = _useSelector(state => state.userReducer.credentials)
    const assignments = _useSelector(state => state.responseReducer.assignments)
    const quiz = _useSelector(state=>state.responseReducer.quizToTake)
    const userObj = users.find(element => element.username === credentials.username
        && element.role === credentials.role)

    const assignment = assignments.find(element => element.assignedTo === userObj.id
        && element.quizTemplateId === quiz.quizTemplateId)

    console.log(assignment.assignmentId)
    const {  questionId, questionNumber,questionText,
        questionType, quizTemplateId
    } = questionsToRespond ? questionsToRespond : {}

    function handleSaveResp() {
        alert("Answer Saved! You still need to submit your response")
        dispatch(_initiateSaveResponse())
    }
    function onResponseTextChange(change) {

        dispatch({type: EDIT_APPLICANT_INPUT, responseToAdd: change})
    }

    function handleOnChange(change) {

        dispatch({type:EDIT_APPLICANT_INPUT,responseToAdd:change})
    }

    return <Form>
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                Quiz Template ID
            </Form.Label>
            <Col sm={10}>
                <Form.Control value={quizTemplateId} disabled={true}/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                 Question {questionNumber}
            </Form.Label>
            <Col sm={10}>
                <Form.Control type='textarea' row={2} value={questionText} disabled={true}/>
            </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
            {questionType === "Boolean" &&

            <div key={`default-radio`}required={true}>
                <Form.Check
                    inline
                    name='radio 1'
                    label="True"
                    value="True"
                    type='radio'
                    onChange={e => handleOnChange({...responseToAdd,assignmentId:assignment.assignmentId,questionId:questionId,questionText:questionText, responseText: e.target.value,completed:false})}/>
                <Form.Check
                    inline
                    name='radio 1'
                    label="False"
                    value="False"
                    type='radio'
                    onChange={e => handleOnChange({...responseToAdd,assignmentId:assignment.assignmentId,questionId:questionId,questionText:questionText, responseText: e.target.value,completed:false})}/>
            </div>
            }
            {questionType === "Text" &&
            <FormControl  as="textarea" rows={1} placeholder='Enter response here' required={true}
                          onChange={e => onResponseTextChange({...responseToAdd,assignmentId:assignment.assignmentId,questionId:questionId,questionText:questionText, responseText: e.target.value,completed:false})}/>}
        </Form.Group>

        <Button title='Apply' variant={"outline-success"} size='sm'
                onClick={handleSaveResp}>
            <BsFileEarmarkPlus/> </Button>
        <Button className={'m-3'} title='Cancel' variant={"outline-danger"} size='sm'
                onClick={() => dispatch({type: CANCEL_TAKE_QUIZ})}>
            <BsFileEarmarkPlus/> </Button>
    </Form>
}
