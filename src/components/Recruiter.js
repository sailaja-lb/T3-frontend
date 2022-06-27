import AddQuiz from "./QuizFrontend/AddQuiz";
import RecruiterHeader from "./QuizFrontend/RecruiterHeader";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import GetAllQuizzes from "./QuizFrontend/GetAllQuizzes";
import AssignQuizToApplicant from "./AssignQuizToApplicant";
import EditQuiz from "./QuizFrontend/EditQuiz";
import SelectApplicantQuiz from "./SelectApplicantQuiz";
import {useEffect} from "react";
import {initLoadAllUsers} from "../reducers/userReducer";
import {getAssignment} from "../reducers/gradeAssignmentReducer";

export default function Recruiter({
                                      _useSelector = useSelector,
                                      RecruiterHeaderC = RecruiterHeader,
                                      GetAllQuizzesC = GetAllQuizzes,
                                      EditQuizC = EditQuiz,
                                      AddQuizC = AddQuiz,
                                      GetCompletedQuizzesC=GetCompletedQuizzes
                                  }) {
    const isAddQuiz = _useSelector(state => state.quizReducer.isAddQuiz)
    const isGetAllQuiz = _useSelector(state => state.quizReducer.isGetAllQuiz)
    const isEditQuiz = _useSelector(state => state.quizReducer.isEditQuiz)
    const isGetApplicant = _useSelector(state => state.quizReducer.isGetApplicant)
    const toggleAssignQuiz = useSelector(state => state.gradeAssignmentReducer.toggleAssignQuiz)
    const toggleGradeQuiz = useSelector(state => state.gradeAssignmentReducer.toggleGradeQuiz)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initLoadAllUsers())
        dispatch(getAssignment())
    }, []);

    if (toggleAssignQuiz)
        return <div className={'mt-3'}><AssignQuizToApplicant/></div>
    else if (toggleGradeQuiz)
        return <div className={'mt-3'}><SelectApplicantQuiz/></div>
    else
    if (isGetApplicant){
        return <div className={'d-flex justify-content-center'}>
            <GetCompletedQuizzesC/>
        </div>
    }
        return <div className={'d-flex justify-content-center'}>
            <Container>
                <RecruiterHeaderC/>
                {isGetAllQuiz && <GetAllQuizzesC/>}
                {isAddQuiz && <AddQuizC/>}
                {isEditQuiz && <EditQuizC/>}
            </Container>
        </div>

}
