import React from 'react';
import ViewAssigned from "./ViewAssigned";
import {useSelector} from "react-redux";
import ViewGrades from "./ViewGrades";
import TakeQuiz from "./TakeQuiz";

function Applicant({
                       ViewAssignedC = ViewAssigned,
                       _useSelector = useSelector,
                       ViewGradesX = ViewGrades,
                       TakeQuizX = TakeQuiz
                   }) {

    const quizInProcess = _useSelector(state => state.responseReducer.quizToTake)
    const viewingGrades = _useSelector(state => state.responseReducer.viewingGrades)

    if (quizInProcess) {
        return <TakeQuizX/>
    }
    else if (viewingGrades === true) {
        return <ViewGradesX/>
    }
    else {
       return <ViewAssignedC/>
    }


}

export default Applicant;