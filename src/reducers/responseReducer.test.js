import responseReducer, {GET_QUIZ_FAILURE, GET_QUIZ_START, GET_QUIZ_SUCCESS} from "./responseReducer";

/** INITIAL STATE **/

it('should start with quizzes empty', function () {
    const state = responseReducer()
    expect(state.quizzes.length).toBe(0)
});

it('should start with responses empty', function () {
    const state = responseReducer()
    expect(state.responses.length).toBe(0)
});

it('should start with getQuizPending false', function () {
    const state = responseReducer()
    expect(state.getQuizPending).toBe(false)
});

/** SWITCH **/

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

