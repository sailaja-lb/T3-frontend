import AddQuiz from "./components/AddQuiz";
import RecruiterHeader from "./components/RecruiterHeader";
import {useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import GetAllQuizzes from "./components/GetAllQuizzes";

export default function App({
                                _useSelector = useSelector,
                                RecruiterHeaderC=RecruiterHeader,
                                GetAllQuizzesC=GetAllQuizzes,
                                AddQuizC = AddQuiz,
                            }) {
    const isAddQuiz = _useSelector(state => state.quizReducer.isAddQuiz)
    const isGetAllQuiz = _useSelector(state => state.quizReducer.isGetAllQuiz)
 //   if (isRecruiter) {
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
