import AddQuiz from "./QuizFrontend/AddQuiz";
import RecruiterHeader from "./QuizFrontend/RecruiterHeader";
import {useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import GetAllQuizzes from "./QuizFrontend/GetAllQuizzes";
import AssignQuizToApplicant from "./AssignQuizToApplicant";

import GetCompletedQuizzes from "./GetCompletedQuizzes";
import EditQuiz from "./QuizFrontend/EditQuiz";
export default function Recruiter({
                                _useSelector = useSelector,
                                RecruiterHeaderC=RecruiterHeader,
                                GetAllQuizzesC=GetAllQuizzes,
                                GetCompletedQuizzesC=GetCompletedQuizzes,
                                EditQuizC=EditQuiz,
                                AddQuizC = AddQuiz,
                            }) {
    const isAddQuiz = _useSelector(state => state.quizReducer.isAddQuiz)
    const isGetAllQuiz = _useSelector(state => state.quizReducer.isGetAllQuiz)
    const isGetApplicant= _useSelector(state => state.quizReducer.isGetApplicant)
    const isEditQuiz = _useSelector(state => state.quizReducer.isEditQuiz)
    if (isGetApplicant){
        return <div className={'d-flex justify-content-center'}>
            <GetCompletedQuizzesC/>
        </div>
    }
 //   if (isRecruiter) {
        return <div className={'d-flex justify-content-center'}>
            <Container>
                <RecruiterHeaderC/>
                {isGetAllQuiz && <GetAllQuizzesC/>}
                {isAddQuiz && <AddQuizC/>}
                {isEditQuiz && <EditQuizC/>}
            </Container>
        </div>
//    }

}
