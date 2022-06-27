

export const CANCEL_TAKE_QUIZ = 'applicantReducer/CANCEL_TAKE_QUIZ'
export const EDIT_APPLICANT_INPUT = 'applicantReducer/EDIT_APPLICANT_INPUT'
export const PREVIOUS_PAGE = 'applicantReducer/PREVIOUS_PAGE'
export const SAVE_QUIZ_START = 'applicantReducer/SAVE_QUIZ_START'
export const SAVE_QUIZ_SUCCESS = 'applicantReducer/SAVE_QUIZ_SUCCESS'
export const SAVE_QUIZ_FAILURE = 'applicantReducer/SAVE_QUIZ_FAILURE'
export const SUBMIT_RESPONSE_START = 'applicantReducer/SUBMIT_RESPONSE_START'
export const SUBMIT_RESPONSE_SUCCESS = 'applicantReducer/SUBMIT_RESPONSE_SUCCESS'
export const SUBMIT_RESPONSE_FAILURE = 'applicantReducer/SUBMIT_RESPONSE_FAILURE'
export const GET_QUIZ_TO_RESPOND_START = 'applicantReducer/GET_QUIZ_TO_RESPOND_START'
export const GET_QUIZ_TO_RESPOND_SUCCESS = 'applicantReducer/GET_QUIZ_TO_RESPOND_SUCCESS'
export const GET_QUIZ_TO_RESPOND_FAILURE = 'applicantReducer/GET_QUIZ_TO_RESPOND_FAILURE'
export const GET_ASSIGNMENT_START = 'applicantReducer/GET_ASSIGNMENT_START'
export const GET_ASSIGNMENT_SUCCESS = 'applicantReducer/GET_ASSIGNMENT_SUCCESS'
export const GET_ASSIGNMENT_FAILURE = 'applicantReducer/GET_ASSIGNMENT_FAILURE'
export const TAKE_QUIZ = 'applicantReducer/TAKE_QUIZ'

const initialState = {
    applicantLoginpending: false,
    assignments: [],
//    isFollowerLoggedIn:false,
    follproc: '',
    quizToTake: [],
    quizTake:[],
    responseToAdd: null,
    isTakeQuiz: false,
    isGetFollow: false,
    savecount: 0,
    isTakingQuiz:false
}

export default function reducer(state = initialState, action) {

    switch (action?.type) {
        case SAVE_QUIZ_START:
        case SUBMIT_RESPONSE_START:

            return {
                ...state,
                applicantLoginpending: true,
                responseToAdd: {...state.responseToAdd,completed:true}
            }
        case GET_ASSIGNMENT_START:
            console.log("inside Assignment start")
            return {
                ...state,
                applicantLoginpending: true,
            }
        case GET_ASSIGNMENT_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                applicantLoginpending: false,
                assignments: action.payload
            }
        case SAVE_QUIZ_SUCCESS:
            console.log(state.savecount)
            return {
                ...state,
                applicantLoginpending: false,
                savecount: (state.savecount + 1),
            }
        case SUBMIT_RESPONSE_SUCCESS:
            return {
                ...state,
                applicantLoginpending: false,
                isTakingQuiz: false,
                savecount: 0,
                //               isGetFollow: false,
            }

        case GET_QUIZ_TO_RESPOND_SUCCESS:
            return {
                ...state,
                applicantLoginpending: false,
                isTakeQuiz: true,
                quizToTake: action.payload,
            }

        case TAKE_QUIZ:
            return {
                ...state,
                quizTake: action.payload,
                isTakingQuiz: true,
            }

        case SAVE_QUIZ_FAILURE:
        case SUBMIT_RESPONSE_FAILURE:
        case GET_QUIZ_TO_RESPOND_FAILURE:
        case GET_ASSIGNMENT_FAILURE:

            return {
                ...state,
                applicantLoginpending: false,
            }
        case CANCEL_TAKE_QUIZ:
            return {
                ...state,
                responseToAdd: null,
                isTakingQuiz:false,
                savecount: 0
            }
        case EDIT_APPLICANT_INPUT:
            return {
                ...state,
                responseToAdd: action.responseToAdd
            }

        case PREVIOUS_PAGE:
            return {
                ...state,
                isTakingQuiz: false,
                //               isGetFollow: false,
                savecount: 0,

            }

        default:
            return {...state}
    }
}

/*
export function initiateGetProcesses(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: GET_PROCESSES_START})
        const url = `http://localhost:8080/getProcess`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_PROCESSES_SUCCESS, payload: result})
        } else
            dispatch({type: GET_PROCESSES_FAILURE})
    }
}

export function initiateFollowProc(process,_fetch = fetch) {
    return async function sideEffect(dispatch,getState) {
        dispatch({type: FOLLOW_PROCESS_START,payload: process})
        const url = `http://localhost:8081/followProcess`
        const response = await _fetch(url)
        if (response.ok) {
            const token = await response.json()
            dispatch({type: FOLLOW_PROCESS_SUCCESS, payload: token})
        } else
            dispatch({type: FOLLOW_PROCESS_FAILURE})
    }
}
*/
export function initiateGetQuizToRespond(quizTemplateId, _fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: GET_QUIZ_TO_RESPOND_START})
        const url = `http://localhost:8081/getQuizToRespond?quizTempId=` + quizTemplateId
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_QUIZ_TO_RESPOND_SUCCESS, payload: result})
        } else
            dispatch({type: GET_QUIZ_TO_RESPOND_FAILURE})
    }
}

export function initiateGetAssigned( _fetch = fetch) {
    console.log("inside getAssigned")
    return async function sideEffect(dispatch, getState) {
        console.log("inside return function")
        dispatch({type: GET_ASSIGNMENT_START})
        const url = `http://localhost:8082/getAllAssignments`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ASSIGNMENT_SUCCESS, payload: result})
        } else
            dispatch({type: GET_ASSIGNMENT_FAILURE})
    }
}



export function initiateSaveResponse(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        const {
            assignmentId,
            questionId,
            questionText,
            responseText,
            completed
        } = getState().applicantReducer.responseToAdd

        dispatch({type: SAVE_QUIZ_START})
        //       getState().applicantReducer.responseToAdd.completed=false
        const url = `http://localhost:8082/addResponse?assignmentId=` + assignmentId + "&questionId=" + questionId + "&questionText=" + questionText + "&response=" + responseText
    //        + "&completed=" + completed
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.text()
            dispatch({type: SAVE_QUIZ_SUCCESS})
        } else
            dispatch({type: SAVE_QUIZ_FAILURE})
    }
}

export function initiateSubmitResponse(token, _fetch = fetch) {
    return async function sideEffect(dispatch, getState) {

        dispatch({type: SUBMIT_RESPONSE_START})
        /*const {
            assignmentId,
            questionId,
            questionText,
            responseText,
            completed
        } = getState().applicantReducer.assignments*/
        const assignmentId= getState().applicantReducer.responseToAdd.assignmentId
        console.log(assignmentId)
        const url = `http://localhost:8082/updateCompleteAssignment?assignmentId=` + assignmentId
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.text()
            dispatch({type: SUBMIT_RESPONSE_SUCCESS})
        } else
            dispatch({type: SUBMIT_RESPONSE_FAILURE})
    }
}

