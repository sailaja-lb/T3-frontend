import {useDispatch, useSelector} from "react-redux";
import GradeCompletedQuiz from "./GradeCompletedQuiz";
import {Alert, Button} from "react-bootstrap";
import {CANCEL_APPLICANT_ID, RESET_VIEW_RESPONSE} from "../reducers/gradeAssignmentReducer";
import ViewResponses from "./ViewResponses";

function GradeCompletedQuizzes() {

    // will change to grab from assignment table, need for dummie data
    // then get give me all responses for chosenApplicantID
    const assignments = useSelector(state => state.gradeAssignmentReducer.assignments)

    const chosenApplicantId = useSelector(state => state.gradeAssignmentReducer.chosenApplicantId)
    const responseQuestion = useSelector(state => state.gradeAssignmentReducer.responseQuestion)
    const dispatch = useDispatch()

    const assigned = assignments.filter(assignment => assignment?.assignedTo === chosenApplicantId)
    if (assigned.length === 0)
        return <div>
            <div className={'d-flex justify-content-end'}>
                <Button onClick={() => dispatch({type: CANCEL_APPLICANT_ID})}>Back</Button>
            </div>
            <Alert variant={'danger'} className={'mt-3 d-flex justify-content-center'}>
                This Applicant does not have any quizzes to grade
            </Alert>
        </div>

    else if (responseQuestion)
        return <div>
            <div className={'d-flex justify-content-end'}>
                <Button onClick={() => dispatch({type: RESET_VIEW_RESPONSE})}>Back</Button>
            </div>
            <ViewResponses responses={responseQuestion}/>
        </div>
    else
        return <div>
            <div className={'d-flex justify-content-end'}>
                <Button onClick={() => dispatch({type: CANCEL_APPLICANT_ID})}>Back</Button>
            </div>

            {assignments.map((assignment, index) => {
                if (chosenApplicantId === assignment?.assignedTo)
                    return <GradeCompletedQuiz assignment={assignment} key={index}/>
            })}
        </div>
}

export default GradeCompletedQuizzes;
