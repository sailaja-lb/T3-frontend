import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {getAssigned} from "../../reducers/responseReducer";
import StaticQuiz from "./StaticQuiz";



export default function ViewAssigned({
                                         _useSelector = useSelector,
                                         _useDispatch = useDispatch,
                                         StaticQuizX = StaticQuiz

}) {
    const dispatch = _useDispatch()


    //TODO change const username
    const id = _useSelector(state => state.user.loggedInUser.id)
    const assignments = _useSelector(state => state.responseReducer.assignments)
    const quizzes = _useSelector(state => state.quizReducer.getallQuizresult)
    const getQuizPending = _useSelector(state => state.quizReducer.recruiterPending)
    const assignedTo = assignments.filter(assignment => assignment.assigned_to === id)
    const assignedQuizzes = quizzes.filter((quiz) =>
        assignedTo.find(({quizTemplateId}) => quiz.quizTemplateId === quizTemplateId))


    function handleUpdate() {
        dispatch(getAssigned())
    }

    return <div>
        {<Button disabled={getQuizPending} onClick={handleUpdate}>Update</Button>}
        {assignedQuizzes.map(
            (staticQuiz, index) => <div key={index}>
                <StaticQuizX staticQuiz={staticQuiz.quizTemplateId}/>
                <StaticQuizX staticQuiz={staticQuiz.questions}/>
            </div>)
        }
    </div>
}



