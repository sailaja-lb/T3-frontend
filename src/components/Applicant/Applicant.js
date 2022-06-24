import React from 'react';
import ViewAssigned from "./ViewAssigned";
import {useDispatch, useSelector} from "react-redux";
import ViewGrades from "./ViewGrades";
import TakeQuiz from "./TakeQuiz";
import {Button} from "react-bootstrap";
import {getGrades, VIEW_GRADES} from "../../reducers/responseReducer";
import {LOGOUT} from "../../reducers/userReducer";

function Applicant({
                       ViewAssignedC = ViewAssigned,
                       _useSelector = useSelector,
                       ViewGradesX = ViewGrades,
                       TakeQuizX = TakeQuiz,
                       _useDispatch = useDispatch
                   }) {

    const dispatch = useDispatch()

    const quizInProcess = _useSelector(state => state.responseReducer.quizToTake)
    const viewingGrades = _useSelector(state => state.responseReducer.viewingGrades)

    const username = _useSelector(state => state.userReducer.loggedInUser)
    const users = _useSelector(state => state.userReducer.users)
    const assignedUser = users.find(element => element.username === username)

    console.log(assignedUser)

    function viewGrades() {
        dispatch(getGrades(assignedUser.id))
    }

    function handleLogout() {
        dispatch({type: LOGOUT})
    }

    if (quizInProcess) {
        return <TakeQuizX/>
    }
    else if (viewingGrades === true) {
        return <ViewGradesX/>
    }
    else {
       return <>
           <ViewAssignedC/>
           <Button onClick={viewGrades}>Grades</Button>
           <Button onClick={handleLogout}>Logout</Button>
           </>
    }


}

export default Applicant;