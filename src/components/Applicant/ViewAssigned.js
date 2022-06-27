import {useDispatch, useSelector} from "react-redux";
import {Badge, Button} from "react-bootstrap";
import {getAssigned, getGrades} from "../../reducers/responseReducer";
import StaticQuiz from "./StaticQuiz";
import {initLoadAllUsers, LOGOUT} from "../../reducers/userReducer";
import {initiateGetAllQuizzes} from "../../reducers/quizReducer";
import {useEffect} from "react";



export default function ViewAssigned({
                                         _useSelector = useSelector,
                                         _useDispatch = useDispatch,
                                         StaticQuizX = StaticQuiz
}) {
    const dispatch = _useDispatch()

    //TODO change const username

    const username = _useSelector(state => state.userReducer.loggedInUser)
    const usersList = _useSelector(state => state.userReducer.users)
    const assignedUser = usersList.find(element => element.username === username && element.role === 'Applicant')
    const users = _useSelector(state => state.userReducer.users)

    const assignments = _useSelector(state => state.responseReducer.assignments)

    const quizzes = _useSelector(state => state.quizReducer.getallQuizresult)
    const uniqueIds = [];
    let isDuplicate
    const uniqueQuizzesId = quizzes.filter(element => {
        isDuplicate = uniqueIds.includes(element.quizTemplateId);
        if (!isDuplicate) {
            uniqueIds.push(element.quizTemplateId);
            return true;
        }
        return false;
    });
        console.log(uniqueQuizzesId)
        console.log(uniqueIds)
        console.log(isDuplicate)
    console.log(quizzes)


    const credentials = _useSelector(state => state.userReducer.credentials)
    console.log(credentials)

    const userObj = users.find(element => element.username === credentials.username
        && element.role === credentials.role)
    console.log(userObj)

    const getQuizPending = _useSelector(state => state.quizReducer.recruiterPending)

    const assignedTo = assignments.filter(assignment => assignment.assignedTo === userObj.id)

    const assignedQuizzes = uniqueQuizzesId.filter((quiz) =>
        assignedTo.find(({quizTemplateId}) => quiz.quizTemplateId === quizTemplateId))
    console.log(assignedQuizzes)

    function handleUpdate() {
        dispatch(getAssigned());
        dispatch(initLoadAllUsers());
        dispatch(initiateGetAllQuizzes());
    }

    useEffect(() => {
        dispatch(getAssigned());
        dispatch(initLoadAllUsers());
        dispatch(initiateGetAllQuizzes());
    }, [])

    function handleLogout() {
        dispatch({type: LOGOUT})
    }
    function viewGrades() {
        dispatch(getGrades(assignedUser.id))
    }
    return<div>
    <div className='my-3 d-flex justify-content-between'>
        <Badge bg={'secondary'} className={'d-flex flex-column justify-content-center w-25'}>Welcome,Applicant</Badge>

        {<Button disabled={getQuizPending} onClick={handleUpdate}>Get Quizzes</Button>}
        <Button onClick={viewGrades}>Grades</Button>
        <Button onClick={handleLogout}>Logout</Button>
    </div>

        {assignedQuizzes.map(
            (staticQuiz, index) => <div key={index}>
                <StaticQuizX staticQuiz={staticQuiz}/>
            </div>)
        }

    </div>
}



