import {render, screen} from "@testing-library/react";
import GetAllQuizzes from "../components/QuizFrontend/GetAllQuizzes";


it('should display 2 processes', () => {
    const state ={ quizReducer: {getallQuizresult: [
            {  quizTemplateId: '1L',
                questionNumber:1,
                questionText:'some text1',
                questionType: "text",
               },
            {quizTemplateId: '2L',
                questionNumber:2,
                questionText:'some text2',
                questionType: "text",
                }
        ]}}
    const _GetQuiz = ({quiz}) => <>{quiz.quizTemplateId}</>
    render(<GetAllQuizzes _useSelector={fn => fn(state)} _GetQuiz={_GetQuiz}
    />)
    expect(screen.getByText(state.quizReducer.getallQuizresult[0].quizTemplateId)).toBeInTheDocument()
    expect(screen.getByText(state.quizReducer.getallQuizresult[1].quizTemplateId)).toBeInTheDocument()
})