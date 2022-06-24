import React from 'react';
import ViewAssigned from "./ViewAssigned";
import {useSelector} from "react-redux";
import ViewGrades from "./ViewGrades";
import TakeQuiz from "./TakeQuiz";
import ApplicantHeader from "./ApplicantHeader";
import QuizzesForApplicants from "./QuizzesForApplicants";

function Applicant({
                       ViewAssignedC = ViewAssigned,
                       _useSelector = useSelector,
                       ViewGradesX = ViewGrades,
                       QuizzesForApplicantsX=QuizzesForApplicants
                   }) {

    const quizInProcess = _useSelector(state => state.responseReducer.quizToTake)
//    const viewingGrades = _useSelector(state => state.responseReducer.viewingGrades)
    const isTakeQuiz = _useSelector(state=>state.applicantReducer.isTakeQuiz)
    if (isTakeQuiz) {
       return <QuizzesForApplicantsX/>
    }
//    if (quizInProcess) {
        return <div>
            <ApplicantHeader/>
        </div>

 //   }
/*    else if (viewingGrades === true) {
        return <ViewGradesX/>
    }
    else {
        return <ViewAssignedC/>
    }*/


}

export default Applicant;