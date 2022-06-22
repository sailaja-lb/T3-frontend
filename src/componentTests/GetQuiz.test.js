import {render,screen} from "@testing-library/react";
import GetQuiz from "../components/QuizFrontend/GetQuiz";
import {EDIT_QUIZ, initiatedeleteQuiz} from "../reducers/quizReducer";


it('should dispatch EDIT_QUIZ when Edit button is clicked', () => {
    const dispatch = jest.fn()
    const quiz = {
        questionId: "1L",
        questionText: "some question",
        questionNumber:1,
        questionType: "Text",
        quizTemplateId:"1L"

    }
    render(<GetQuiz quiz={quiz}
                       _usedispatch={() => dispatch} _initiatedeleteQuiz={jest.fn()}/>)
    screen.getByTitle('Edit').click()
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_QUIZ,quiz:quiz})
})

it('should show edit and delete buttons', () => {
    const quiz = {
        questionId: "1L",
        questionText: "some question",
        questionNumber:1,
        questionType: "Text",
        quizTemplateId:"1L"

    }
    const mock=jest.fn()
    render(<GetQuiz quiz={quiz} _initiatedeleteQuiz={jest.fn()}  _usedispatch={mock}
                   />)
    expect(screen.getByTitle('Edit')).toBeInTheDocument()
    expect(screen.getByTitle('Delete Question')).toBeInTheDocument()
    expect(screen.getByTitle('Delete Quiz')).toBeInTheDocument()
})

/*it('should initiate delete Process when Delete button is clicked', () => {
    const dispatch = jest.fn()
    const questionId= "1L"
    const questionText= "some question"
    const questionNumber=1
    const questionType= "Text"
    const quizTemplateId="1L"
    const initiatedeleteQuiz = jest.fn()
    const ret = 'some return'

    initiatedeleteQuiz.mockImplementation(() => ret)
    render(<GetQuiz quiz={{questionId, questionText, questionNumber,questionType, quizTemplateId}}
        _usedispatch={() => dispatch}  _initiatedeleteQuiz={initiatedeleteQuiz}/>)
    screen.getByTitle('Delete Quiz').click()
    screen.getByTitle('Confirm').click()
    expect(initiatedeleteQuiz).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(ret)
})*/

