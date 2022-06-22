import React from 'react';
import {useSelector} from "react-redux";
import GradeCompletedQuiz from "./GradeCompletedQuiz";

function GradeCompletedQuizzes({}) {

    const responses = useSelector(state => state.lengReducer.responses)

    return <div>
        {responses.map((responsed, index) => {
            if (responsed?.completed)
                return <GradeCompletedQuiz responsed={responsed} key={index}/>
        })}
    </div>
}

export default GradeCompletedQuizzes;