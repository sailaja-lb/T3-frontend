export const ADD_QUIZZES = 'quizReducer/ADD_QUIZZES'
export const ADD_QUIZ_START = 'quizReducer/ADD_QUIZ_START'
export const ADD_QUIZ_SUCCESS = 'quizReducer/ADD_QUIZ_SUCCESS'
export const ADD_QUIZ_FAILURE = 'quizReducer/ADD_QUIZ_FAILURE'
export const LOGOUT_RECRUITER = 'quizReducer/LOGOUT_RECRUITER'
export const ADD_QUIZ_DETAILS = 'quizReducer/ADD_QUIZ_DETAILS'
export const PREVIOUS_PAGE='quizReducer/PREVIOUS_PAGE'
export const CANCEL_ADD_QUIZ = 'quizReducer/CANCEL_ADD_QUIZ'
export const CANCEL_EDIT_QUIZ = 'quizReducer/CANCEL_EDIT_QUIZ'
export const EDIT_QUIZ= 'quizReducer/EDIT_QUIZ'
export const DELETE_QUIZ_START = 'quizReducer/DELETE_QUIZ_START'
export const DELETE_QUIZ_SUCCESS = 'quizReducer/DELETE_QUIZ_SUCCESS'
export const DELETE_QUIZ_FAILURE = 'quizReducer/DELETE_QUIZ_FAILURE'
export const DELETE_QUESTION_START = 'quizReducer/DELETE_QUESTION_START'
export const DELETE_QUESTION_SUCCESS = 'quizReducer/DELETE_QUESTION_SUCCESS'
export const DELETE_QUESTION_FAILURE = 'quizReducer/DELETE_QUESTION_FAILURE'
export const GET_ALL_QUIZZES_START = 'quizReducer/GET_ALL_QUIZZES_START'
export const GET_ALL_QUIZZES_SUCCESS = 'quizReducer/GET_ALL_QUIZZES_SUCCESS'
export const GET_ALL_QUIZZES_FAILURE = 'quizReducer/GET_ALL_QUIZZES_FAILURE'
export const UPDATE_QUIZ_START = 'quizReducer/UPDATE_QUIZ_START'
export const UPDATE_QUIZ_SUCCESS = 'quizReducer/UPDATE_QUIZ_SUCCESS'
export const UPDATE_QUIZ_FAILURE = 'quizReducer/UPDATE_QUIZ_FAILURE'

const initialState = {
    getallQuizresult: [],
    recruiterPending: false,
    quizToAdd: {
        quizTemplateId: '',
        questionNumber:null,
        questionText: '',
        questionType: '',


    },
    isGetAllQuiz: false,
    isAddQuiz: false,
    isEditQuiz: false,
    addQuizDetails:  {
        quizTemplateId: '',
        questionNumber: '',
        questionText: '',
        questionType: '',

    },
    editProcDetails:  {
        quizId:'',
        quizTemplateId: '',
        questionType: '',
        questionNumber: '',
        questionText: '',
    },
    deleteId:null,
    quizToEdit:  {
        questionId:'',
        quizTemplateId: '',
        questionType: '',
        questionNumber: '',
        questionText: '',
    },
    isApplicant:false,
    isGetApplicant:false,
    getResponses:'',
}

export default function reducer(state = initialState, action) {
    switch (action?.type) {

        case GET_ALL_QUIZZES_START:
            return {
                ...state,
                recruiterPending: true,
                isGetAllQuiz: true,
            }
        case ADD_QUIZ_START:
        case DELETE_QUIZ_START:
        case DELETE_QUESTION_START:
        case UPDATE_QUIZ_START:
 //       case GET_FOLLOWINGS_START:
 //       case DELETE_FOLLOWINGS_START:
            return {
                ...state,
                recruiterPending: true,
            }
        case ADD_QUIZ_SUCCESS:
            return {
                ...state,
                addQuizDetails: null,
                quizToAdd: null,
                isAddQuiz: false,
                recruiterPending:false,
                addSuccessMessage: true,
                getallQuizresult: action.payload,
                isGetAllQuiz: true,
            }
        case UPDATE_QUIZ_SUCCESS:
            return {
                ...state,
 //               editQuizDetails: null,
                quizToEdit: null,
                isEditQuiz: false,
                recruiterPending:false,
                getallQuizresult: action.payload,
                isGetAllQuiz: true,
            }
        case DELETE_QUIZ_SUCCESS:
        case DELETE_QUESTION_SUCCESS:
            return {
                ...state,
                recruiterPending:false,
                getallQuizresult: action.payload,
                isGetAllQuiz: true,
            }
        case GET_ALL_QUIZZES_SUCCESS:
            return {
                ...state,
                recruiterPending: false,
                getallQuizresult: action.payload
            }
/*        case GET_FOLLOWINGS_SUCCESS:
            return{
                ...state,
                isGetFollow:true,
                getFollowings:action.payload
            }
        case DELETE_FOLLOWINGS_SUCCESS:

            return {
                ...state,
                pending: false,
                isAddProc: false,
                isEditProc: false,
                isGetFollow:true,
                getFollowings:action.payload
            }*/

        case ADD_QUIZ_FAILURE:
        case UPDATE_QUIZ_FAILURE:
/*        case DELETE_PROCESS_FAILURE:
        case DELETE_STAGE_FAILURE:
        case GET_FOLLOWINGS_FAILURE:
        case DELETE_FOLLOWINGS_FAILURE:
        case GET_ALL_PROCESSES_FAILURE:*/
            return {
                ...state,
                recruiterPending: false,
                isAddQuiz: false,
                isEditQuiz: false,
            }
        case CANCEL_ADD_QUIZ:
            return {
                ...state,
                quizToAdd: null,
                isAddQuiz: false,
            }
        case CANCEL_EDIT_QUIZ:
            return {
                ...state,
                quizToEdit: null,
//                editQuizDetails: null,
                isEditQuiz: false,
            }
        case ADD_QUIZZES:
            return {
                ...state,
                quizToAdd: {
                    quizTemplateId: '',
                    questionNumber: '',
                    questionText: '',
                    questionType: '',

                },
                isAddQuiz: true,

            }
        case LOGOUT_RECRUITER:
            return {
                ...state,
             /*   isLoggedIn: false,*/
                recruiterPending: false,
                quizToAdd: '',
                quizToEdit: '',
                getallQuizresult: [],
                isGetAllQuiz: false,
                isAddQuiz: false,
                isEditQuiz:false,
                isGetApplicant:false,
                isApplicant:false,
                getResponses:'',
            }
        case ADD_QUIZ_DETAILS:
            return {
                ...state,
                addQuizDetails: {
                    quizTemplateId: action.payload.quizTemplateId,
                    questionNumber: action.payload.questionNumber,
                    questionText: action.payload.questionText,
                    questionType: action.payload.questionType,

                },
            }

        case EDIT_QUIZ:
            return {
                ...state,
                quizToEdit: action.quiz,
                isEditQuiz:true,
            }

        case PREVIOUS_PAGE:
            return {
                ...state,
                isGetApplicant: false
            }
        default:
            return {...state}
    }
}

export function assignQuiz(_fetch = fetch, assignmentId, quizId) {
    return async function sideEffect() {
        const url = `http://localhost:8082/placeholder`
        const response = await _fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({assignmentId, quizId})
        })
        if (response.ok)
            console.log("passed")
        else
            console.log("failed")
    }
}

export function initiateAddQuiz(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: ADD_QUIZ_START})
        const {quizTemplateId, questionNumber, questionText,questionType} = getState().quizReducer.addQuizDetails
 //       const url = `http://localhost:8081/createQuiz?quizTemId=${quizTemplateId}&questionNumber=${questionNumber}&quizQuestion=${questions}&questionType=${questionType}`
        const url = `http://localhost:8081/createQuiz`
        const response = await _fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({quizTemplateId, questionNumber, questionText,questionType})
        })
        if (response.ok) {
            const addResult = await response.json()
            dispatch({type: ADD_QUIZ_SUCCESS,payload:addResult})
        } else
            dispatch({type: ADD_QUIZ_FAILURE})
    }
}

export function initiateGetAllQuizzes(_fetch = fetch) {
    return async function sideEffect(dispatch) {
        dispatch({type: GET_ALL_QUIZZES_START})
        const url = `http://localhost:8081/getAllQuizzes`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ALL_QUIZZES_SUCCESS, payload: result})
        } else
            dispatch({type: GET_ALL_QUIZZES_FAILURE})
    }
}
export function initiatedeleteQuiz(quizTemplateId,_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: DELETE_QUIZ_START})
        const url=`http://localhost:8081/deleteQuiz/${quizTemplateId}`

 //       const url = `http://localhost:8081/deleteQuiz?quizTemplateId=${quizTemplateId}`
        const response = await _fetch(url,{
            method:"DELETE"
        })
        if (response.ok) {
            const result = await response.json()
            dispatch({type: DELETE_QUIZ_SUCCESS,payload:result})
        } else
            dispatch({type: DELETE_QUIZ_FAILURE})
    }
}

export function initiatedeleteQuestion(questionId,_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: DELETE_QUESTION_START})
        const url=`http://localhost:8081/deleteQuestion/${questionId}`
 //       const url = `http://localhost:8081/deleteQuestion?questionId=${questionId}`
        const response = await _fetch(url,{
            method:"DELETE"})
        if (response.ok) {
            const result = await response.json()
            dispatch({type: DELETE_QUESTION_SUCCESS,payload:result})
        } else
            dispatch({type: DELETE_QUESTION_FAILURE})
    }
}
export function initiateUpdateQuiz(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: UPDATE_QUIZ_START})
        const { questionId, quizTemplateId, questionType, questionText} = getState().quizReducer.quizToEdit
        const url = `http://localhost:8081/editQuiz?questionId=${questionId}&questionText=${questionText}&questionType=${questionType}`
        const response = await _fetch(url)
        if (response.ok) {
            const updateResult = await response.json()
            dispatch({type: UPDATE_QUIZ_SUCCESS,payload:updateResult})
        } else
            dispatch({type: UPDATE_QUIZ_FAILURE})
    }
}
