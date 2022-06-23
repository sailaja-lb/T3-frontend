import {useDispatch, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {SEND_RESPONSE_START} from "../../reducers/responseReducer";

export default function TakeQuiz({
                                     _useDispatch = useDispatch,_useSelector = useSelector
                                 }) {
    const dispatch = useDispatch()
    const quiz = _useSelector(state => state.responseReducer.quizToTake)
    const sendResponsePending = _useSelector(state => state.responseReducer.sendResponsePending)

    const [response, setResponse] = useState({
        quizTemplateId: quiz.quizTemplateId,
        questionId: quiz.questionId,
        questionText: quiz.questionText,
        answer: '',
        user: '',
        assignmentID: ''
    })

    function updateAnswer(event) {
        setResponse(event.target.value)
    }

    function handleSubmit() {
        dispatch({type: SEND_RESPONSE_START, payload: response})
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Label>
            {quiz.questions}
        </Form.Label>

        <Form.Group>
            <Form.Control type= 'input' placeholder= 'Answer' onChange={updateAnswer}/>
            <Button type='submit' disabled={sendResponsePending}>Submit</Button>
            <Button>Save</Button>
        </Form.Group>

    </Form>
}