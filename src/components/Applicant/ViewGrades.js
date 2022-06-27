import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CANCEL_VIEW_GRADES} from "../../reducers/responseReducer";
import {Button} from "react-bootstrap";
import StaticGrade from "./StaticGrade";

function ViewGrades({
                        _useDispatch = useDispatch,
                        _useSelector = useSelector,
                        StaticGradeX = StaticGrade
                    }) {

    const dispatch = _useDispatch()

    const grades = _useSelector(state => state.responseReducer.grades)

    function cancelGrades() {
        dispatch({type: CANCEL_VIEW_GRADES})
    }


    return <div>
        {grades.map(
                (staticGrade, index) => <div key={index}>
                    <StaticGradeX staticGrade={staticGrade}/>
                </div>)
            }
        {<Button onClick={cancelGrades}>Back</Button>}
    </div>


}

    export default ViewGrades;
