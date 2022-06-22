import {render,screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddQuiz from "../components/QuizFrontend/AddQuiz";
import {ADD_QUIZ_DETAILS, CANCEL_ADD_QUIZ} from "../reducers/quizReducer";




it('should initiate Add Quiz when apply button is clicked', ()=>{
    const initialState = {
        quizReducer: {
            addQuizDetails:
                {
                    quizTemplateId: '1L',
                    questionNumber: 1,
                    questionText: 'some text',
                    questionType: 'Text',
                },
        }
    }
    const dispatch =jest.fn()
    const initAddQuiz = jest.fn()
    const ret = 'some return'
    initAddQuiz.mockImplementation(() => ret)
    render(<AddQuiz _useDispatch={()=> dispatch}  _initiateAddQuiz={initAddQuiz}
                        _useSelector={fn => fn(initialState)}/>)
    screen.getByTitle('Apply').click()
    expect(initAddQuiz).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(ret)
})

it('should dispatch CANCEL_ADD_QUIZ when Cancel button is clicked', () => {

    const dispatch = jest.fn()
    render(<AddQuiz _useDispatch={() => dispatch} _initiateAddProc={dispatch}
                       _useSelector={() => dispatch}/>)
    screen.getByTitle('Cancel').click()
    expect(dispatch).toHaveBeenCalledWith({type: CANCEL_ADD_QUIZ})
})

it('should dispatch ADD_QUIZ_DETAILS when the user enters the quizTemplateId', () => {
    const questionNumber=1
    const questionText='some quest'
    const questionType = 'Text'
    const state = {
        quizReducer: {
            addQuizDetails:
                {
                    quizTemplateId: '',
                    questionNumber,
                    questionText,
                    questionType,
                },
        }
    }
    const dispatch =jest.fn()
    render(<AddQuiz _useDispatch={()=> dispatch} _initiateAddQuiz={dispatch}
                    _useSelector={fn => fn(state)}/>)
    const quizTemplateIdElement = screen.getByPlaceholderText('Enter quiz template Id here')
    const quizTemplateId = '1L'
    userEvent.type(quizTemplateIdElement, quizTemplateId)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_DETAILS, payload:{quizTemplateId,questionNumber,questionText,questionType}})
})

it('should dispatch ADD_QUIZ_DETAILS when the user enters the questionNumber', () => {

    const questionText='some quest'
    const questionType = 'Text'
    const quizTemplateId = '1L'
    const state = {
        quizReducer: {
            addQuizDetails:
                {
                    quizTemplateId,
                    questionNumber: '',
                    questionText,
                    questionType,
                },
        }
    }
    const dispatch =jest.fn()
    render(<AddQuiz _useDispatch={()=> dispatch} _initiateAddQuiz={dispatch}
                    _useSelector={fn => fn(state)}/>)
    const questionNumberElement = screen.getByPlaceholderText('Enter question number here')
    const questionNumber=1
    userEvent.type(questionNumberElement, questionNumber)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_DETAILS, payload:{quizTemplateId,questionNumber,questionText,questionType}})
})

it('should dispatch ADD_QUIZ_DETAILS when the user enters the questionText', () => {
    const questionNumber=1
    const questionType = 'Text'
    const quizTemplateId = '1L'
    const state = {
        quizReducer: {
            addQuizDetails:
                {
                    quizTemplateId,
                    questionNumber,
                    questionText: '',
                    questionType,
                },
        }
    }
    const dispatch =jest.fn()
    render(<AddQuiz _useDispatch={()=> dispatch} _initiateAddQuiz={dispatch}
                    _useSelector={fn => fn(state)}/>)
    const questionTextElement = screen.getByPlaceholderText('Enter question here')
    const questionText='some quest'
    userEvent.type(questionTextElement, questionText)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_DETAILS, payload:{quizTemplateId,questionNumber,questionText,questionType}})
})

it('should dispatch ADD_QUIZ_DETAILS when the user enters the questionType', () => {
    const questionNumber=1
    const quizTemplateId = '1L'
    const questionText='some quest'
    const state = {
        quizReducer: {
            addQuizDetails:
                {
                    quizTemplateId,
                    questionNumber,
                    questionText,
                    questionType: '',
                },
        }
    }
    const dispatch =jest.fn()
    render(<AddQuiz _useDispatch={()=> dispatch} _initiateAddQuiz={dispatch}
                    _useSelector={fn => fn(state)}/>)
    userEvent.click(screen.getByDisplayValue('Text'))
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_DETAILS, payload:{quizTemplateId,questionNumber,questionText,questionType:'Text'}})
})