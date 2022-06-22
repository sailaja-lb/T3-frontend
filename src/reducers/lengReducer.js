// Action
const TOGGLE_ASSIGN_QUIZ = 'TOGGLE_ASSIGN_QUIZ'

// init state
const initialState = {
    quizzes:[],
    // users:[],
    toggleAssignQuiz:false,
}

// Reducer
export default function quizReducer(state = initialState, action) {
    switch (action?.type) {
        case TOGGLE_ASSIGN_QUIZ:
            return {...state, toggleAssignQuiz: !state.toggleAssignQuiz}

        default:
            return {...state}
    }
}

// Side Effects