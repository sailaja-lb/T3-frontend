import React from 'react';
import ViewAssigned from "./ViewAssigned";
import {useDispatch, useSelector} from "react-redux";
import ViewGrades from "./ViewGrades";
import TakeQuiz from "./TakeQuiz";
import {Button} from "react-bootstrap";
import {getGrades, VIEW_GRADES} from "../../reducers/responseReducer";
import ApplicantHeader from "./ApplicantHeader";
import QuizzesForApplicants from "./QuizzesForApplicants";

function Applicant({
                       ViewAssignedC = ViewAssigned,
                       _useSelector = useSelector,
                       ViewGradesX = ViewGrades,
                       _useDispatch = useDispatch,
                       QuizzesForApplicantsX=QuizzesForApplicants
                   }) {

    const dispatch = useDispatch()

    const quizInProcess = _useSelector(state => state.responseReducer.quizToTake)
    const viewingGrades = _useSelector(state => state.responseReducer.viewingGrades)

    const username = _useSelector(state => state.userReducer.loggedInUser)
    const users = _useSelector(state => state.userReducer.users)
    const assignedUser = users.find(element => element.username === username)
    const isTakingQuiz = _useSelector(state=>state.responseReducer.isTakingQuiz)
    console.log(assignedUser)

    function viewGrades() {
        dispatch(getGrades(assignedUser.id))
    }
    if (isTakingQuiz) {
        return <QuizzesForApplicantsX/>
    }
    if (viewingGrades === true) {
        return <ViewGradesX/>

    }
    else {
        return <>
            <ViewAssignedC/>

            <Button onClick={viewGrades}>Grades</Button>
        </>
    }

/*
       return <div>
            <ApplicantHeader/>
        </div>
*/

 //   }




}

export default Applicant;