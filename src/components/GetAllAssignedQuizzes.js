import {useSelector} from "react-redux";
import {Card, Col, Table} from "react-bootstrap";
import gradeAssignmentReducer from "../reducers/gradeAssignmentReducer";
import GetAssignedQuiz from "./GetAssignedQuiz";


export default function GetAllAssignedQuizzes({_useSelector = useSelector,
                                          _GetAssignedQuiz = GetAssignedQuiz}) {
    const assignments = _useSelector(state => state.gradeAssignmentReducer.assignments)

    return <Col>
        {assignments.map((assignment,index)=> <div className={'m-3'} key={index}>
            <_GetAssignedQuiz assignment={assignment}/>
        </div> )}
    </Col>
}


