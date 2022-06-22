import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditQuiz from "../components/QuizFrontend/EditQuiz";
import {CANCEL_EDIT_QUIZ, EDIT_QUIZ} from "../reducers/quizReducer";


it('should initiate Edit Process when apply button is clicked', ()=>{
    const initialState = {
        quizReducer: {
            quizToEdit:{
                questionId:'1L',
                quizTemplateId: '1L',
                questionType: 'Text',
                questionNumber: 1,
                questionText: 'some text',
            }
        }
    }
    const dispatch =jest.fn()
    const initiateUpdateQuiz = jest.fn()
    const ret = 'some return'
    initiateUpdateQuiz.mockImplementation(() => ret)
    render(<EditQuiz _useDispatch={()=> dispatch}  _initiateUpdateQuiz={initiateUpdateQuiz}
                        _useSelector={fn => fn(initialState)}/>)
    screen.getByTitle('Apply').click()
    expect(initiateUpdateQuiz).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(ret)
})

it('should dispatch CANCEL_EDIT_QUIZ when Cancel button is clicked', () => {
    const dispatch = jest.fn()
    render(<EditQuiz _useDispatch={() => dispatch} _initiateUpdateQuiz={dispatch}
                       _useSelector={() => dispatch}/>)
    screen.getByTitle('Cancel').click()
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_EDIT_QUIZ})
})

it('should dispatch EDIT_QUIZ when the user Edits the question', () => {
    const state = {
        quizReducer: {
            quizToEdit:{
                questionId:'1L',
                quizTemplateId: '1L',
                questionType: 'Text',
                questionNumber: 1,
                questionText: 'some text',
            }
        }
    }
    const dispatch =jest.fn()
    render(<EditQuiz  _useDispatch={()=> dispatch}
                        _useSelector={fn => fn(state)}/>)
    const titleElement = screen.getByDisplayValue(state.quizReducer.quizToEdit.questionText)
    const newText = '?'
    userEvent.type(titleElement, newText)
    const quiz = {...state.quizReducer.quizToEdit, questionText: 'some text?'}
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_QUIZ, quiz:quiz})
})

/*
it('should dispatch EDIT_QUIZ when the user Edits the questionType', () => {
    const state = {
        quizReducer: {
            quizToEdit:{
                questionId:'1L',
                quizTemplateId: '1L',
                questionType: 'Boolean',
                questionNumber: 1,
                questionText: 'some text',
            }
        }
    }
    const dispatch =jest.fn()
    render(<EditQuiz  _useDispatch={()=> dispatch}
                      _useSelector={fn => fn(state)}/>)
    userEvent.click(screen.getByDisplayValue('Text'))
    const quiz = {...state.quizReducer.quizToEdit, questionType: 'Text'}
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_QUIZ, quiz:quiz})
})
*/



