// Action

export const TOGGLE_ASSIGN_QUIZ = '/TOGGLE_ASSIGN_QUIZ'
export const GET_ALL_QUIZZES = '/GET_ALL_QUIZZES'
export const GET_ALL_RESPONSES = '/GET_ALL_RESPONSES'
export const TOGGLE_GRADE_QUIZ = '/TOGGLE_GRADE_QUIZ'
export const ASSIGN_QUIZ_SUCCESSFUL = '/ASSIGN_QUIZ_SUCCESSFUL'
export const ASSIGN_QUIZ_FAILED = '/ASSIGN_QUIZ_FAILED'
export const CHOSEN_APPLICANT_ID = '/CHOSEN_APPLICANT_ID'
export const CANCEL_APPLICANT_ID = '/CANCEL_APPLICANT_ID'
export const ADD_ASSIGNMENT = '/ADD_ASSIGNMENT'

// init state
const initialState = {

    //not needed
    quizzes: [],
    // not needed
    applicants: [],

    //not needed
    responses: [],
    toggleAssignQuiz: false,
    toggleGradeQuiz: false,
    messages: undefined,
    chosenApplicantId: undefined,
    assignUserId: undefined,
    assignQuizId: undefined,
}

// Reducer
export default function lengReducer(state = initialState, action) {
    switch (action?.type) {
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
        case GET_ALL_RESPONSES: // not needed
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
        const userId = getState().lengReducer.assignUserId
        const quizId = getState().lengReducer.assignQuizId
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

export function getResponses(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        const url = `http://localhost:8081/getAllResponses`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ALL_RESPONSES, payload: result})
        }
    }
}

export function getAllQuizzes(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        const url = `http://localhost:8081/getallQuizzes`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ALL_QUIZZES, payload: result})
        }
    }
}