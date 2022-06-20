import {useSelector} from "react-redux";
import {Card, Col, Table} from "react-bootstrap";


import GetQuiz from "./GetQuiz";

export default function GetAllQuizzes({_useSelector = useSelector,
                                          _GetQuiz = GetQuiz}) {
    const quizzes = _useSelector(state => state.quizReducer.getallQuizresult)
    console.log(quizzes)
    return <Col>
        {quizzes.map((quiz,index)=> <div className={'m-3'} key={index}>
            <_GetQuiz quiz={quiz}/>
        </div> )}
    </Col>
}


