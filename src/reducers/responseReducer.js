export const GET_ASSIGNMENTS_START = 'responseReducer/GET_ASSIGNMENTS_START'
export const GET_ASSIGNMENTS_SUCCESS = 'responseReducer/GET_ASSIGNMENTS_SUCCESS'
export const GET_ASSIGNMENTS_FAILURE = 'responseReducer/GET_ASSIGNMENTS_FAILURE'
export const TAKE_QUIZ = 'responseReducer/TAKE_QUIZ'
export const SEND_RESPONSE_START = 'responseReducer/SEND_RESPONSE_START'
export const SEND_RESPONSE_SUCCESS = 'responseReducer/SEND_RESPONSE_SUCCESS'
export const SEND_RESPONSE_FAILURE = 'responseReducer/SEND_RESPONSE_FAILURE'
export const GET_GRADES_START = 'responseReducer/GET_GRADES_START'
export const GET_GRADES_SUCCESS = 'responseReducer/GET_GRADES_SUCCESS'
export const GET_GRADES_FAILURE = 'responseReducer/GET_GRADES_FAILURE'
export const SET_RESPONSE = 'responseReducer/SET_RESPONSE'
export const CANCEL_VIEW_GRADES = 'responseReducer/CANCEL_VIEW_GRADES'

const initialState = {
    assignments: [],
    responses: [],
    grades: [],
    getGradesPending: false,
    getAssignmentsPending: false,
    isTakingQuiz: false,
    quizToTake: null,
    viewingGrades: false

}

export default function responseReducer(state = initialState, action) {
    switch (action?.type) {


        case GET_ASSIGNMENTS_START:
            return {
                ...state,
                getAssignmentsPending: true
            }

        case GET_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                getAssignmentsPending: false,
                assignments: action.payload
            }

        case GET_ASSIGNMENTS_FAILURE:
            return {
                ...state,
                getAssignmentsPending: false
            }

        case TAKE_QUIZ:
            return {
                ...state,
                quizToTake: action.payload,
                isTakingQuiz: true,
            }

        case SET_RESPONSE:
            return {
                ...state,
                responseToAdd: {
                    quizTemplateId: action.payload.quizTemplateId,
                    questionNumber: action.payload.questionNumber,
                    questions: action.payload.questions,
                    questionType: action.payload.questionType,
                    answer: action.payload.answer,
                }
            }

        case SEND_RESPONSE_START:
            return {
                ...state,
                sendResponsePending: true
            }

        case SEND_RESPONSE_SUCCESS:
            return {
                ...state,
                sendResponsePending: false
            }
/*

        case SEND_RESPONSE_FAILURE:
            return {
                ...state,
                sendResponsePending: false
            }
*/

        case GET_GRADES_START:
            return {
                ...state,
                getGradesPending: true
            }

        case GET_GRADES_SUCCESS:
            return {
                ...state,
                getGradesPending: false,
                grades: action.payload,
                viewingGrades: true
            }

        case GET_GRADES_FAILURE:
            return {
                ...state,
                getGradesPending: false
            }

        case CANCEL_VIEW_GRADES:
            return {
                ...state,
                viewingGrades: false
            }




        default:
            return {...state}
    }

}


//TODO
export function getAssigned(_fetch = fetch) {
    return async function getAssignedSE(dispatch) {
        dispatch({type: GET_ASSIGNMENTS_START})
        //TODO get url
        const url = `http://localhost:8082/getAllAssignments`
        const response = await _fetch(url)

        if (response.ok) {
            const assigned = await response.json()
            dispatch({type: GET_ASSIGNMENTS_SUCCESS, payload: assigned})
        }
        else {
            dispatch({type: GET_ASSIGNMENTS_FAILURE})
        }
    }
}

export function sendResponseInit(_fetch = fetch) {
    return async function sendResponseSE(dispatch, getState) {
        dispatch({type: SEND_RESPONSE_START})
        const {quizTemplateId, questionNumber,
            questions, questionType, answer} = getState().responseReducer.responseToAdd
        const url = ``
        const response = await _fetch(url)

        if (response.ok) {
            dispatch({type: SEND_RESPONSE_SUCCESS})
        }
        else {
            dispatch({type: SEND_RESPONSE_FAILURE})
        }

    }
}

export function getGrades(assignedUser, _fetch = fetch) {
    return async function getGradesSE(dispatch) {
        dispatch({type: GET_GRADES_START})
        //TODO get url
        const url = `http://localhost:8082/getAllGradedAssignments?assignedTo=${assignedUser}`
        const response = await _fetch(url)

        if (response.ok) {
            const grades = await response.json()
            dispatch({type: GET_GRADES_SUCCESS, payload: grades})
        }
        else {
            dispatch({type: GET_GRADES_FAILURE})
        }
    }
}

