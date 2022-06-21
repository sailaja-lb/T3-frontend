

const initialState = {
    quizzes: [],
}

export default function quizReducer(state = initialState, action) {
    switch (action?.type) {


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