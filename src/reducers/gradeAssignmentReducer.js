// Action

export const TOGGLE_ASSIGN_QUIZ = '/TOGGLE_ASSIGN_QUIZ'
export const GET_ALL_QUIZZES = '/GET_ALL_QUIZZES'
export const GET_ALL_COMPLETED_ASSIGN = '/GET_ALL_COMPLETED_ASSIGN'
export const TOGGLE_GRADE_QUIZ = '/TOGGLE_GRADE_QUIZ'
export const ASSIGN_QUIZ_SUCCESSFUL = '/ASSIGN_QUIZ_SUCCESSFUL'
export const ASSIGN_QUIZ_FAILED = '/ASSIGN_QUIZ_FAILED'
export const CHOSEN_APPLICANT_ID = '/CHOSEN_APPLICANT_ID'
export const CANCEL_APPLICANT_ID = '/CANCEL_APPLICANT_ID'
export const ADD_ASSIGNMENT = '/ADD_ASSIGNMENT'
export const UPDATE_VIEW_RESPONSE = '/UPDATE_VIEW_RESPONSE'
export const RESET_VIEW_RESPONSE = '/RESET_VIEW_RESPONSE'
export const UPDATE_GRADED_QUIZ_START = '/UPDATE_GRADED_QUIZ_START'
export const UPDATE_GRADED_QUIZ_SUCCESS = '/UPDATE_GRADED_QUIZ_SUCCESS'
export const UPDATE_GRADED_QUIZ_FAILURE = '/UPDATE_GRADED_QUIZ_FAILURE'

// init state
const initialState = {

    //not needed
    quizzes: [],
    // not needed
    applicants: [],

    // not needed
    responses: [],

    assignments: [],
    toggleAssignQuiz: false,
    toggleGradeQuiz: false,
    messages: undefined,
    chosenApplicantId: undefined,
    assignUserId: undefined,
    assignQuizId: undefined,
    responseQuestion: undefined,

    updateGradedQuizPending: false,
    assignmentID: null,
    grade: null,
    gradedBy: null,
}

// Reducer
export default function gradeAssignmentReducer(state = initialState, action) {
    switch (action?.type) {
        case UPDATE_GRADED_QUIZ_START:
            return {
                ...state,
                updateGradedQuizPending: true
            }
        case UPDATE_GRADED_QUIZ_SUCCESS:
            return {
                ...state,
                updateGradedQuizPending: false,
                assignmentID: action.payload?.assignmentID,
                grade: action.payload?.grade,
                gradedBy: action.payload?.gradedBy

            }
        case UPDATE_GRADED_QUIZ_FAILURE:
            return {
                ...state,
                updateGradedQuizPending: false
            }
        case UPDATE_VIEW_RESPONSE:
            return {...state, responseQuestion: action.payload}
        case RESET_VIEW_RESPONSE:
            return {...state, responseQuestion: undefined}
        case ADD_ASSIGNMENT:
            return {
                ...state,
                assignQuizId: action?.payload?.assignQuizID,
                assignUserId: action?.payload?.userID
            }
        case TOGGLE_GRADE_QUIZ:
            return {...state, toggleGradeQuiz: !state.toggleGradeQuiz, messages: undefined}
        case TOGGLE_ASSIGN_QUIZ:
            return {...state, toggleAssignQuiz: !state.toggleAssignQuiz, messages: undefined}
        case GET_ALL_QUIZZES: // not needed
            return {...state, quizzes: action.payload}
        case GET_ALL_COMPLETED_ASSIGN: // not needed
            return {...state, responses: action.payload}
        case ASSIGN_QUIZ_SUCCESSFUL:
            return {...state, messages: 'Quiz assigned successful'}
        case ASSIGN_QUIZ_FAILED:
            return {...state, messages: 'Quiz assigned FAILED'}
        case CHOSEN_APPLICANT_ID:
            return {...state, chosenApplicantId: action?.id}
        case CANCEL_APPLICANT_ID:
            return {...state, chosenApplicantId: undefined}

        default:
            return {...state}
    }
}

// Side Effects

export function addAssignment(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        const userId = getState().gradeAssignmentReducer.assignUserId
        const quizId = getState().gradeAssignmentReducer.assignQuizId
        const url = `http://localhost:8082/addAssignment?assignedTo=${userId}&quizTemplateId=${quizId}`
        const response = await _fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        if (response.ok)
            dispatch({type: ASSIGN_QUIZ_SUCCESSFUL})
        else
            dispatch({type: ASSIGN_QUIZ_FAILED})
    }
}

export function getAssignment(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        const url = `http://localhost:8082/getAllCompletedAssignments?complete=true`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ALL_COMPLETED_ASSIGN, payload: result})
        }
    }
}

// export function updateGradedQuiz(_fetch = fetch) {
//     return async function sideEffect(dispatch, getState) {
//         dispatch({type: UPDATE_GRADED_QUIZ_START})
//         const assignmentId = getState().gradeAssignmentReducer.assignmentID
//         const grade = getState().gradeAssignmentReducer.grade
//         const gradedBy = getState().gradeAssignmentReducer.gradedBy
//         const url = http://localhost:8082/updateGrade?assignmentId=${assignmentId}&grade=${grade}&gradedBy=${gradedBy}
//         const response = await _fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({})
//         })
//         if (response.ok)
//             dispatch({type: UPDATE_GRADED_QUIZ_SUCCESS})
//         else
//             dispatch({type: UPDATE_GRADED_QUIZ_FAILURE})
//     }
// }