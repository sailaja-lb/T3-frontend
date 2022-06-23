// Action
export const TOGGLE_ASSIGN_QUIZ = '/TOGGLE_ASSIGN_QUIZ'
export const GET_ALL_QUIZZES = '/GET_ALL_QUIZZES'
export const GET_ALL_RESPONSES = '/GET_ALL_RESPONSES'
export const TOGGLE_GRADE_QUIZ = '/TOGGLE_GRADE_QUIZ'
export const ASSIGN_QUIZ_SUCCESSFUL = '/ASSIGN_QUIZ_SUCCESSFUL'
export const ASSIGN_QUIZ_FAILED = '/ASSIGN_QUIZ_FAILED'
export const CHOSEN_APPLICANT_ID = '/CHOSEN_APPLICANT_ID'
export const CANCEL_APPLICANT_ID = '/CANCEL_APPLICANT_ID'

// init state
const initialState = {
    quizzes: [
        {
            "questionId": 1,
            "questionText": "Do you like apple?",
            "questionNumber": 2,
            'quizTemplateId': 3,
            "questionType": "some type"
        },
        {
            "questionId": 4,
            "questionText": "Do you like grapes?",
            "questionNumber": 5,
            "quizTemplateId": 6,
            "questionType": "some type"
        }
    ],
    applicants: [{id: 1, username: "leng"}, {id: 7, username: "jack"}],
    responses: [
        {
            'assignmentId': 1,
            'questionId': 2,
            'questionText': 'do you like orange',
            'response': 'yes',
            'completed': true,
        },
        {
            'assignmentId': 3,
            'questionId': 4,
            'questionText': 'do you like peppers',
            'response': 'no',
            'completed': true,
        },
        {
            'assignmentId': 3,
            'questionId': 4,
            'questionText': 'do you like peppers',
            'response': 'no',
            'completed': false,
        }
    ],
    toggleAssignQuiz: false,
    toggleGradeQuiz: false,
    messages: undefined,
    chosenApplicantId: undefined,
}

// Reducer
export default function lengReducer(state = initialState, action) {
    switch (action?.type) {
        case TOGGLE_GRADE_QUIZ:
            return {...state, toggleGradeQuiz: !state.toggleGradeQuiz, messages: undefined}
        case TOGGLE_ASSIGN_QUIZ:
            return {...state, toggleAssignQuiz: !state.toggleAssignQuiz, messages: undefined}
        case GET_ALL_QUIZZES:
            return {...state, quizzes: action.payload}
        case GET_ALL_RESPONSES:
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