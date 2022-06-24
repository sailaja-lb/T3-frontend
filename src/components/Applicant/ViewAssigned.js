import {useDispatch, useSelector} from "react-redux";
import {Button} from "react-bootstrap";
import {getAssigned} from "../../reducers/responseReducer";
import StaticQuiz from "./StaticQuiz";
import {initLoadAllUsers} from "../../reducers/userReducer";
import {initiateGetAllQuizzes} from "../../reducers/quizReducer";



export default function ViewAssigned({
                                         _useSelector = useSelector,
                                         _useDispatch = useDispatch,
                                         StaticQuizX = StaticQuiz
}) {
    const dispatch = _useDispatch()


    //TODO change const username
    const users = _useSelector(state => state.userReducer.users)
    console.log(users)

    const assignments = _useSelector(state => state.responseReducer.assignments)
    console.log(assignments)

    const quizzes = _useSelector(state => state.quizReducer.getallQuizresult)
    console.log(quizzes)

    const username = _useSelector(state => state.userReducer.loggedInUser)
    console.log(username)

    const userObj = users.find(element => element.username === username)
    console.log(userObj)

    const getQuizPending = _useSelector(state => state.quizReducer.recruiterPending)

    const assignedTo = assignments.filter(assignment => assignment.assignedTo === userObj.id)
    console.log(assignedTo)

    const assignedQuizzes = quizzes.filter((quiz) =>
        assignedTo.find(({quizTemplateId}) => quiz.quizTemplateId === quizTemplateId))
    console.log(assignedQuizzes)



    function handleUpdate() {
        dispatch(getAssigned())
        dispatch(initLoadAllUsers())
        dispatch(initiateGetAllQuizzes())
    }

    return <div>
        {<Button disabled={getQuizPending} onClick={handleUpdate}>Update</Button>}
        {assignedQuizzes.map(
            (staticQuiz, index) => <div key={index}>
                <StaticQuizX staticQuiz={staticQuiz}/>
            </div>)
        }
    </div>
}



