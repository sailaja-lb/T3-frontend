export const GET_QUIZ_START = 'responseReducer/GET_QUIZ'
export const GET_QUIZ_SUCCESS = 'responseReducer/GET_SUCCESS'
export const GET_QUIZ_FAILURE = 'responseReducer/GET_QUIZ_FAILURE'
export const TAKE_QUIZ = 'responseReducer/TAKE_QUIZ'
export const SEND_RESPONSE_START = 'responseReducer/SEND_RESPONSE_START'
export const SEND_RESPONSE_SUCCESS = 'responseReducer/SEND_RESPONSE_SUCCESS'
export const SEND_RESPONSE_FAILURE = 'responseReducer/SEND_RESPONSE_FAILURE'
export const GET_GRADES_START = 'responseReducer/GET_GRADES_START'
export const GET_GRADES_SUCCESS = 'responseReducer/GET_GRADES_SUCCESS'
export const GET_GRADES_FAILURE = 'responseReducer/GET_GRADES_FAILURE'
export const SET_RESPONSE = 'responseReducer/SET_RESPONSE'

const initialState = {
    responses: [],
    quizzes: [],
    grades: [],
    getQuizPending: false,

    user: {username: 'ssss', password: 'ssss'},

    sendResponsePending: false,
    isTakingQuiz: false,
    quizToTake: null,
    getGradesPending: false,

    responseToAdd: {
        quizTemplateId: null,
        questionNumber: null,
        questions: null,
        questionType: null,
        answer: '',
    }

}

export default function responseReducer(state = initialState, action) {
    switch (action?.type) {

        case GET_QUIZ_START:
            return {
                ...state,
                getQuizPending: true
            }

        case GET_QUIZ_SUCCESS:
            return {
                ...state,
                getQuizPending: false,
                quizzes: action.payload
            }

        case GET_QUIZ_FAILURE:
            return {
                ...state,
                getQuizPending: false
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

        case SEND_RESPONSE_FAILURE:
            return {
                ...state,
                sendResponsePending: false
            }

        case GET_GRADES_START:
            return {
                ...state,
                getGradesPending: true
            }

        case GET_GRADES_SUCCESS:
            return {
                getGradesPending: false,
                grades: action.payload
            }

        case GET_GRADES_FAILURE:
            return {
                getGradesPending: false
            }


        default:
            return {...state}
    }
}


//TODO
export function getAssigned(_fetch = fetch) {
    return async function getAssignedSE(dispatch) {
        dispatch({type: GET_QUIZ_START})
        //TODO get url
        const url = ``
        const response = await _fetch(url)

        if (response.ok) {
            const assigned = await response.json()
            dispatch({type: GET_QUIZ_SUCCESS, payload: assigned})
        }
        else {
            dispatch({type: GET_QUIZ_FAILURE})
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

export function getGrades(_fetch = fetch) {
    return async function getGradesSE(dispatch) {
        dispatch({type: GET_GRADES_START})
        //TODO get url
        const url = ``
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
