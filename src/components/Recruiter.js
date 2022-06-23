import AddQuiz from "./QuizFrontend/AddQuiz";
import RecruiterHeader from "./QuizFrontend/RecruiterHeader";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import GetAllQuizzes from "./QuizFrontend/GetAllQuizzes";
import AssignQuizToApplicant from "./AssignQuizToApplicant";

import GetCompletedQuizzes from "./GetCompletedQuizzes";
import EditQuiz from "./QuizFrontend/EditQuiz";
import GradeCompletedQuizzes from "./GradeCompletedQuizzes";
import SelectApplicantQuiz from "./SelectApplicantQuiz";
import {useEffect} from "react";
import {initLoadAllUsers} from "../reducers/userReducer";

export default function Recruiter({
                                      _useSelector = useSelector,
                                      RecruiterHeaderC = RecruiterHeader,
                                      GetAllQuizzesC = GetAllQuizzes,
                                      GetCompletedQuizzesC = GetCompletedQuizzes,
                                      EditQuizC = EditQuiz,
                                      AddQuizC = AddQuiz,
                                  }) {
    const isAddQuiz = _useSelector(state => state.quizReducer.isAddQuiz)
    const isGetAllQuiz = _useSelector(state => state.quizReducer.isGetAllQuiz)
    const isGetApplicant = _useSelector(state => state.quizReducer.isGetApplicant)
    const isEditQuiz = _useSelector(state => state.quizReducer.isEditQuiz)

    const toggleAssignQuiz = useSelector(state => state.lengReducer.toggleAssignQuiz)
    const toggleGradeQuiz = useSelector(state => state.lengReducer.toggleGradeQuiz)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initLoadAllUsers());
    }, []);

    if (toggleAssignQuiz)
        return <AssignQuizToApplicant/>
    else if (toggleGradeQuiz)
        return <SelectApplicantQuiz/>
    else
        return <div className={'d-flex justify-content-center'}>
            <Container>
                <RecruiterHeaderC/>
                {isGetAllQuiz && <GetAllQuizzesC/>}
                {isAddQuiz && <AddQuizC/>}
                {isEditQuiz && <EditQuizC/>}
            </Container>
        </div>

}
