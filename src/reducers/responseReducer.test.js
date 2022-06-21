import responseReducer, {
    GET_GRADES_FAILURE,
    GET_GRADES_START, GET_GRADES_SUCCESS,
    GET_QUIZ_FAILURE,
    GET_QUIZ_START,
    GET_QUIZ_SUCCESS,
    SEND_RESPONSE_FAILURE, SEND_RESPONSE_SUCCESS,
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

it('should start with sendResponsePending false', function () {
    const state = responseReducer()
    expect(state.getQuizPending).toBe(false)
});

it('should start with getGradesPending false', function () {
    const state = responseReducer()
    expect(state.getGradesPending).toBe(false)
});

it('should start with getQuizPending false', function () {
    const state = responseReducer()
    expect(state.getQuizPending).toBe(false)
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

it('should set getQuizPending true on GET_QUIZ_START', function () {
    const state =  responseReducer(undefined, {type: GET_QUIZ_START})
    expect(state.getQuizPending).toBe(true)
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

it('should set getQuizPending true on GET_QUIZ_START', function () {
    const state =  responseReducer(undefined, {type: GET_QUIZ_START})
    expect(state.getQuizPending).toBe(true)
});

it('should set getQuizPending false on GET_QUIZ_FAILURE', function () {
    const initialState = responseReducer()
    initialState.getQuizPending = true
    const state = responseReducer(initialState, {type: GET_QUIZ_FAILURE})
    expect(state.getQuizPending).toBe(false)
});

it('should set getQuizPending false on GET_QUIZ_SUCCESS', function () {
    const initialState = responseReducer()
    initialState.getQuizPending = true
    const state = responseReducer(initialState, {type: GET_QUIZ_SUCCESS})
    expect(state.getQuizPending).toBe(false)
});

it('should set sendResponsePending false on SEND_RESPONSE_FAILURE', function () {
    const initialState = responseReducer()
    initialState.sendResponsePending = true
    const state = responseReducer(initialState, {type: SEND_RESPONSE_FAILURE})
    expect(state.sendResponsePending).toBe(false)
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

