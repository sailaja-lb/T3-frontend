import AddQuiz from "./components/AddQuiz";
import RecruiterHeader from "./components/RecruiterHeader";
import {useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import GetAllQuizzes from "./components/GetAllQuizzes";
import AssignQuizToApplicant from "./components/AssignQuizToApplicant";
import GradeCompletedQuiz from "./components/GradeCompletedQuiz";
import GradeCompletedQuizzes from "./components/GradeCompletedQuizzes";

export default function App({
                                _useSelector = useSelector,
                                RecruiterHeaderC = RecruiterHeader,
                                GetAllQuizzesC = GetAllQuizzes,
                                AddQuizC = AddQuiz,
                            }) {
    const isAddQuiz = _useSelector(state => state.quizReducer.isAddQuiz)
    const isGetAllQuiz = _useSelector(state => state.quizReducer.isGetAllQuiz)
    //   if (isRecruiter) {
    if (true)
        return <Container><GradeCompletedQuizzes/></Container>
    else
        return <div className={'d-flex justify-content-center'}>
            <Container>
                <RecruiterHeaderC/>
                {isGetAllQuiz && <GetAllQuizzesC/>}
                {isAddQuiz && <AddQuizC/>}
                {/*                {isEditProc && <EditProcessC/>}*/}
            </Container>
        </div>
//    }

}
