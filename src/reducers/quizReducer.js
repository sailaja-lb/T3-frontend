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

const initialState = {
    getallQuizresult: [],
    recruiterPending: false,
    quizToAdd: {
        quizTemplateId: '',
        questionNumber:null,
        questions: '',
        questionType: '',


    },
    isGetAllQuiz: false,
    isAddQuiz: false,
    isEditQuiz: false,
    addQuizDetails:  {
        quizTemplateId: '',
        questionNumber: '',
        questions: '',
        questionType: '',

    },
    editProcDetails:  {
        quizId:'',
        quizTemplateId: '',
        questionType: '',
        questionNumber: '',
        questions: '',
    },
    deleteId:null,
    quizToEdit:  {
        quizId:'',
        quizTemplateId: '',
        questionType: '',
        questionNumber: '',
        questions: '',
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
 //       case UPDATE_PROCESS_START:
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
       /* case UPDATE_PROCESS_SUCCESS:
            return {
                ...state,
                editProcDetails: null,
                processToEdit: null,
                isEditProc: false,
                pending:false,
                getallProcessresult: action.payload,
                isGetAllProc: true,
            }*/
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
/*        case DELETE_PROCESS_FAILURE:
        case DELETE_STAGE_FAILURE:
        case UPDATE_PROCESS_FAILURE:
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
                editQuizDetails: null,
                isEditQuiz: false,
            }
        case ADD_QUIZZES:
            return {
                ...state,
                quizToAdd: {
                    quizTemplateId: '',
                    questionNumber: '',
                    questions: '',
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
            console.log(action.payload)
            return {
                ...state,
                addQuizDetails: {
                    quizTemplateId: action.payload.quizTemplateId,
                    questionNumber: action.payload.questionNumber,
                    questions: action.payload.questions,
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


export function initiateAddQuiz(_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: ADD_QUIZ_START})
        const {quizTemplateId, questionNumber, questions,questionType} = getState().quizReducer.addQuizDetails
        const url = `http://localhost:8081/createQuiz?quizTemId=${quizTemplateId}&questionNumber=${questionNumber}&quizQuestion=${questions}&questionType=${questionType}`
        const response = await _fetch(url)
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
        const url = `http://localhost:8081/getallQuizzes`
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
        const url = `http://localhost:8081/deleteQuiz?quizTemplateId=${quizTemplateId}`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: DELETE_QUIZ_SUCCESS,payload:result})
        } else
            dispatch({type: DELETE_QUIZ_FAILURE})
    }
}

export function initiatedeleteQuestion(quizId,_fetch = fetch) {
    return async function sideEffect(dispatch, getState) {
        dispatch({type: DELETE_QUESTION_START})
        const url = `http://localhost:8081/deleteQuestion?quizId=${quizId}`
        const response = await _fetch(url)
        if (response.ok) {
            const result = await response.json()
            dispatch({type: DELETE_QUESTION_SUCCESS,payload:result})
        } else
            dispatch({type: DELETE_QUESTION_FAILURE})
    }
}