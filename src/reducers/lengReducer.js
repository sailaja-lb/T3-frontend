// Action
import {GET_ALL_QUIZZES_START, GET_ALL_QUIZZES_SUCCESS} from "./quizReducer";

export const TOGGLE_ASSIGN_QUIZ = 'TOGGLE_ASSIGN_QUIZ'
export const GET_ALL_QUIZZES = 'GET_ALL_QUIZZES'
export const GET_ALL_RESPONSES = 'GET_ALL_RESPONSES'

// init state
const initialState = {
    quizzes: [
        {
            "questionId": 1,
            "questionText": "Do you like apple?",
            "questionNumber": 2,
            "quizTemplateId": 3,
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
    applicants: [],
    toggleAssignQuiz: false,
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
}

// Reducer
export default function quizReducer(state = initialState, action) {
    switch (action?.type) {
        case TOGGLE_ASSIGN_QUIZ:
            return {...state, toggleAssignQuiz: !state.toggleAssignQuiz}
        case GET_ALL_QUIZZES:
            return {...state, quizzes: action.payload}
        case GET_ALL_RESPONSES:
            return {...state, responses: action.payload}

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