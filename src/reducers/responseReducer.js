export const GET_QUIZ = 'responseReducer/GET_QUIZ'
export const GET_QUIZ_START = 'responseReducer/GET_QUIZ'
export const GET_QUIZ_SUCCESS = 'responseReducer/GET_SUCCESS'
export const GET_QUIZ_FAILURE = 'responseReducer/GET_QUIZ_FAILURE'

const initialState = {
    responses: [],
    quizzes: [],
    getQuizPending: false,
    user: {username: 'ssss', password: 'ssss'},

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
                getQuizPending: false
            }

        case GET_QUIZ_FAILURE:
            return {
                ...state,
                getQuizPending: false
            }


        default:
            return {...state}
    }
}

export function getAssigned(_fetch = fetch) {
    return async function getAssignedSE(dispatch) {
        dispatch({type: GET_QUIZ_START})
        //TODO get url
      /*  const url = */
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