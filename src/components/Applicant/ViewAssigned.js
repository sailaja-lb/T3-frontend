import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {getAssigned} from "../../reducers/responseReducer";


export default function ViewAssigned({
                                         _useSelector = useSelector,
                                         // _FauxQuiz = FauxQuiz,
                                         _useDispatch = useDispatch

}) {
    const dispatch = _useDispatch()

    //TODO change const username
    const username = _useSelector(state => state.user.username)
    const getQuizPending = _useSelector(state => state.getQuizPending)
    const quizList = _useSelector(state => state.responseReducer.quizzes)
    const assigned = quizList.filter(quiz => quiz.username === username)

    function handleUpdate() {
        dispatch(getAssigned())
    }

    return <div>
        {<Button disabled={getQuizPending} onClick={handleUpdate}>Update</Button>}
        {assigned.map((quiz) => (
            <div>
                <div>
                    {quiz.title}
                </div>
                <div>
                    {quiz.username}
                </div>
            </div>
        ))}
            </div>
}



