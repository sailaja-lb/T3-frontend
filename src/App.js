import AddQuiz from "./components/AddQuiz";
import RecruiterHeader from "./components/RecruiterHeader";
import {useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import GetAllQuizzes from "./components/GetAllQuizzes";
import AssignQuizToApplicant from "./components/AssignQuizToApplicant";

import GetCompletedQuizzes from "./components/GetCompletedQuizzes";
import EditQuiz from "./components/EditQuiz";
export default function App({
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
