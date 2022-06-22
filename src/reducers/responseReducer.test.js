
import responseReducer, {
    GET_ASSIGNMENTS_FAILURE,
    GET_ASSIGNMENTS_START, GET_ASSIGNMENTS_SUCCESS,
    GET_GRADES_FAILURE,
    GET_GRADES_START, GET_GRADES_SUCCESS,
    getAssigned, getGrades,
    SEND_RESPONSE_FAILURE, SEND_RESPONSE_START, SEND_RESPONSE_SUCCESS, sendResponseInit,
    TAKE_QUIZ
} from "./responseReducer";

/** INITIAL STATE **/

it('should start with quizzes empty', function () {
    const state = responseReducer()
    expect(state.quizzes.length).toBe(0)
});

it('should start with grades empty', function () {
    const state = responseReducer()
    expect(state.grades.length).toBe(0)
});

it('should start with responses empty', function () {
    const state = responseReducer()
    expect(state.responses.length).toBe(0)
});

it('should start with getGradesPending false', function () {
    const state = responseReducer()
    expect(state.getGradesPending).toBe(false)
});

it('should start with getAssignmentsPending false', function () {
    const state = responseReducer()
    expect(state.getAssignmentsPending).toBe(false)
});

it('should start with isTakingQuiz false', function () {
    const state = responseReducer()
    expect(state.isTakingQuiz).toBe(false)
});

it('should start with quizToTake null', function () {
    const state = responseReducer()
    expect(state.quizToTake).toBeNull()
});

/** SWITCH **/

it('should set getAssignmentsPending true on GET_ASSIGNMENTS_START', function () {
    const state =  responseReducer(undefined, {type: GET_ASSIGNMENTS_START})
    expect(state.getAssignmentsPending).toBe(true)
});

it('should set isTakingQuiz true and set quizToTake on TAKE_QUIZ', function () {
    const quiz = {question: 'why?'}
    const initialState = responseReducer()
    const state =  responseReducer(initialState, {type: TAKE_QUIZ, payload: quiz})
    expect(state.isTakingQuiz).toBe(true)
    expect(state.quizToTake).toStrictEqual({
        question: 'why?'
    })
});

it('should set getAssignmentsPending false on GET_QUIZ_FAILURE', function () {
    const initialState = responseReducer()
    initialState.getAssignmentsPending = true
    const state = responseReducer(initialState, {type: GET_ASSIGNMENTS_FAILURE})
    expect(state.getAssignmentsPending).toBe(false)
});

it('should set getAssignmentsPending false on GET_QUIZ_SUCCESS', function () {
    const initialState = responseReducer()
    initialState.getAssignmentsPending = true
    const state = responseReducer(initialState, {type: GET_ASSIGNMENTS_SUCCESS})
    expect(state.getAssignmentsPending).toBe(false)
});

it('should set getAssignmentsPending true on GET_QUIZ_START', function () {
    const initialState = responseReducer()
    const state = responseReducer(initialState, {type: GET_ASSIGNMENTS_SUCCESS})
    expect(state.getAssignmentsPending).toBe(false)
});

it('should set sendResponsePending true on SEND_RESPONSE_START', function () {
    const initialState = responseReducer()
    const state = responseReducer(initialState, {type: SEND_RESPONSE_START})
    expect(state.sendResponsePending).toBe(true)
});

it('should set sendResponsePending false on SEND_RESPONSE_SUCCESS', function () {
    const initialState = responseReducer()
    initialState.sendResponsePending = true
    const state = responseReducer(initialState, {type: SEND_RESPONSE_SUCCESS})
    expect(state.sendResponsePending).toBe(false)
});

it('should set sendResponsePending false on SEND_RESPONSE_FAILURE', function () {
    const initialState = responseReducer()
    initialState.sendResponsePending = true
    const state = responseReducer(initialState, {type: SEND_RESPONSE_FAILURE})
    expect(state.sendResponsePending).toBe(false)
});

it('should set getGradesPending true on GET_GRADES_START', function () {
    const initialState = responseReducer()
    initialState.getGradesPending = false
    const state = responseReducer(initialState, {type: GET_GRADES_START})
    expect(state.getGradesPending).toBe(true)
});

it('should set getGradesPending false on GET_GRADES_SUCCESS', function () {
    const initialState = responseReducer()
    initialState.getGradesPending = true
    const state = responseReducer(initialState, {type: GET_GRADES_SUCCESS})
    expect(state.getGradesPending).toBe(false)
});

it('should set getGradesPending false on GET_GRADES_FAILURE', function () {
    const initialState = responseReducer()
    initialState.getGradesPending = true
    const state = responseReducer(initialState, {type: GET_GRADES_FAILURE})
    expect(state.getGradesPending).toBe(false)
});

/** FETCH **/

it('should dispatch GET_ASSIGNMENTS_START and GET_ASSIGNMENTS_SUCCESS when getAssigned', async function () {
    const dispatch = jest.fn()
    const result = 'some result'
    const url = 'http://localhost:8082/getAllAssignments'
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await getAssigned(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_ASSIGNMENTS_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_ASSIGNMENTS_SUCCESS, payload: result})
});

it('should dispatch GET_ASSIGNMENTS_START and GET_QUIZ_FAILURE when getAssigned', async function () {
    const dispatch = jest.fn()
    const url = 'http://localhost:8082/getAllAssignments'
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
        }))
    }

    await getAssigned(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_ASSIGNMENTS_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_ASSIGNMENTS_FAILURE})
});

it('should dispatch GET_GRADES_START and GET_GRADES_SUCCESS when getAssigned', async function () {
    const dispatch = jest.fn()
    const result = 'some result'
    const url = 'http://localhost:8082/getAllGradedResponses'
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await getGrades(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_GRADES_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_GRADES_SUCCESS, payload: result})
});

it('should dispatch GET_GRADES_START and GET_GRADES_FAILURE when getAssigned', async function () {
    const dispatch = jest.fn()
    const url = 'http://localhost:8082/getAllGradedResponses'
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
        }))
    }

    await getGrades(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_GRADES_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_GRADES_FAILURE})
});

it('should dispatch SEND_RESPONSE_START and SEND_RESPONSE_SUCCESS when sendResponseInit', async function () {
    const dispatch = jest.fn()
    const result = 'some result'
    const url = ''
    let _url

    const state = {responseReducer: {
            responseToAdd: {
                quizTemplateId: 5,
                questionId: 2,
                questionText: 'why is gamora',
                answer: 'cause',
                user: 'drax',
                assignmentID: 9
            }}}

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    const getState = () => state
    await sendResponseInit(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SEND_RESPONSE_START})
    expect(dispatch).toHaveBeenCalledWith({type: SEND_RESPONSE_SUCCESS})
});

it('should dispatch SEND_RESPONSE_START and SEND_RESPONSE_FAILURE when sendResponseInit', async function () {
    const dispatch = jest.fn()
    const url = ''
    let _url

    const state = {responseReducer: {
        responseToAdd: {
            quizTemplateId: 5,
            questionId: 2,
            questionText: 'why is gamora',
            answer: 'cause',
            user: 'drax',
            assignmentID: 9
        }}}

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
        }))
    }

    const getState = () => state
    await sendResponseInit(mockFetch)(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SEND_RESPONSE_START})
    expect(dispatch).toHaveBeenCalledWith({type: SEND_RESPONSE_FAILURE})
});
=======
it('should ', function () {

});
