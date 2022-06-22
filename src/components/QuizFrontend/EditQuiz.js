import {useDispatch, useSelector} from "react-redux";
import {
    Button,
    Card,
    Dropdown,
    DropdownButton,
    Form,
    FormControl,
    FormGroup,
    FormText,
    InputGroup
} from "react-bootstrap";
import {BsFileEarmarkPlus} from "react-icons/bs";
import {CANCEL_EDIT_QUIZ, EDIT_QUIZ, initiateUpdateQuiz} from "../../reducers/quizReducer";



export default function EditQuiz({
                                        _useDispatch = useDispatch, _useSelector = useSelector,
                                        _initiateUpdateQuiz = initiateUpdateQuiz
                                    }) {
//    const editQuizDetails = _useSelector(state => state.quizReducer.editQuizDetails)
    const quiz = _useSelector(state => state.quizReducer.quizToEdit)
    const dispatch = _useDispatch()
    const {
        questionId,quizTemplateId, questionType, questionText
    } = quiz ? quiz : {}


    function setresponseType(change) {
        dispatch({type: EDIT_QUIZ, quiz: change})
    }

    function setQuestion(change) {
        dispatch({type: EDIT_QUIZ, quiz: change})
    }

    function handleEditQuiz() {
        dispatch(_initiateUpdateQuiz())
    }

    return <div className={'d-flex justify-content-between'}>
        <Form.Control type='text' defaultValue={quizTemplateId} title='quizTemplateId'/>
      {/*                onChange={e => setprocTitle({
                          ...proc,
                          quizTemplateId: e.target.value,
                      })}/>*/}
        <select
                 onChange={e => setresponseType({
                     ...quiz,
                     questionType: e.target.value,
                 })}>
            <option value="response Type">{questionType}</option>
            <option value="Boolean">Boolean</option>
            <option value="Text">Text</option>
        {/*    <option value="Multiple Choice">Multiple Choice</option>*/}
        </select>

        <Form.Control type='text' value={questionText}
                      onChange={e => setQuestion({
                          ...quiz,
                          questionText: e.target.value
                      })}/>

        <Button title='Apply' variant={"outline-success"} size='sm'
                onClick={handleEditQuiz}>
            <BsFileEarmarkPlus/> </Button>
        <Button title='Cancel' variant={"outline-danger"} size='sm'
                onClick={() => dispatch({type: CANCEL_EDIT_QUIZ})}>
            <BsFileEarmarkPlus/> </Button>
    </div>


}
