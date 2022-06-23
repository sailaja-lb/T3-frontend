import reducer, {
    ADD_QUIZ_DETAILS,
    ADD_QUIZ_FAILURE,
    ADD_QUIZ_START,
    ADD_QUIZ_SUCCESS, ADD_QUIZZES, CANCEL_ADD_QUIZ, CANCEL_EDIT_QUIZ, DELETE_QUESTION_FAILURE,
    DELETE_QUESTION_START, DELETE_QUESTION_SUCCESS,
    DELETE_QUIZ_FAILURE,
    DELETE_QUIZ_START,
    DELETE_QUIZ_SUCCESS, EDIT_QUIZ,
    GET_ALL_QUIZZES_FAILURE,
    GET_ALL_QUIZZES_START,
    GET_ALL_QUIZZES_SUCCESS,
    initiateAddQuiz, initiatedeleteQuestion,
    initiatedeleteQuiz,
    initiateGetAllQuizzes, initiateUpdateQuiz, UPDATE_QUIZ_FAILURE, UPDATE_QUIZ_START, UPDATE_QUIZ_SUCCESS
} from "./quizReducer";

it('should start with initial state', () => {
    const state = reducer()

    expect(state.recruiterPending).toBe(false)
    expect(state.isAddQuiz).toBe(false)
    expect(state.isEditQuiz).toBe(false)
    expect(state.isGetAllQuiz).toBe(false)
    expect(state.isGetApplicant).toBe(false)
})


it('should dispatch GET_ALL_QUIZZES_START and GET_ALL_QUIZZES_SUCCESS when initiateGetAllQuizzes is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const url = `http://localhost:8081/getAllQuizzes`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiateGetAllQuizzes(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_QUIZZES_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_QUIZZES_SUCCESS, payload: result})
})

it('should dispatch GET_ALL_QUIZZES_START and GET_ALL_QUIZZES_FAILURE when initiateGetAllQuizzes is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const url = `http://localhost:8081/getAllQuizzes`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,

        }))
    }

    await initiateGetAllQuizzes(mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_QUIZZES_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_QUIZZES_FAILURE})
})

it('should dispatch ADD_QUIZ_START and ADD_QUIZ_SUCCESS when initiateAddQuiz is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const quizTemplateId= '1L'
    const questionType="Text"
    const questionNumber=1
    const questionText="some question"
    const url = `http://localhost:8081/createQuiz`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }
    const state = {quizReducer: {addQuizDetails: {quizTemplateId, questionNumber, questionText,questionType}}}
    const getState = () => state
    const sideEffect = initiateAddQuiz(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_SUCCESS,payload:result})
})

it('should dispatch ADD_QUIZ_START and ADD_QUIZ_FAILURE when initiateAddQuiz is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const quizTemplateId= '1L'
    const questionType="Text"
    const questionNumber=1
    const questionText="some question"
    const url = `http://localhost:8081/createQuiz`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(res => res(result))
        }))
    }
    const state = {quizReducer: {addQuizDetails: {quizTemplateId, questionNumber, questionText,questionType}}}
    const getState = () => state
    const sideEffect = initiateAddQuiz(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: ADD_QUIZ_FAILURE})
})

it('should dispatch DELETE_QUIZ_START and DELETE_QUIZ_SUCCESS when initiatedeleteQuiz is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const quizTemplateId= '1L'
    const url=`http://localhost:8081/deleteQuiz/${quizTemplateId}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiatedeleteQuiz(quizTemplateId,mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUIZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUIZ_SUCCESS,payload:result})
})

it('should dispatch DELETE_QUIZ_START and DELETE_QUIZ_FAILURE when initiatedeleteQuiz is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const quizTemplateId= '1L'
    const url=`http://localhost:8081/deleteQuiz/${quizTemplateId}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiatedeleteQuiz(quizTemplateId,mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUIZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUIZ_FAILURE})
})

it('should dispatch DELETE_QUESTION_START and DELETE_QUESTION_SUCCESS when initiatedeleteQuestion is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const questionId=1
    const url=`http://localhost:8081/deleteQuestion/${questionId}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiatedeleteQuestion(questionId,mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUESTION_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUESTION_SUCCESS,payload:result})
})

it('should dispatch DELETE_QUESTION_START and DELETE_QUESTION_FAILURE when initiatedeleteQuestion is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const questionId=1
    const url=`http://localhost:8081/deleteQuestion/${questionId}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(res => res(result))
        }))
    }

    await initiatedeleteQuestion(questionId,mockFetch)(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUESTION_START})
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_QUESTION_FAILURE})
})

it('should dispatch UPDATE_QUIZ_START and UPDATE_QUIZ_SUCCESS when initiateUpdateQuiz is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const quizTemplateId= '1L'
    const questionType="Text"
    const questionId=1
    const questionText="some question"
    const url = `http://localhost:8081/editQuiz?questionId=${questionId}&questionText=${questionText}&questionType=${questionType}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }
    const state = {quizReducer: {quizToEdit: {questionId, quizTemplateId, questionType, questionText}}}
    const getState = () => state
    const sideEffect = initiateUpdateQuiz(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_QUIZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_QUIZ_SUCCESS,payload:result})
})

it('should dispatch UPDATE_QUIZ_START and UPDATE_QUIZ_FAILURE when initiateUpdateQuiz is called', async () => {
    const dispatch = jest.fn()
    const result = 'some result'
    const quizTemplateId= '1L'
    const questionType="Text"
    const questionId=1
    const questionText="some question"
    const url = `http://localhost:8081/editQuiz?questionId=${questionId}&questionText=${questionText}&questionType=${questionType}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: false,
            json: () => new Promise(res => res(result))
        }))
    }
    const state = {quizReducer: {quizToEdit: {questionId, quizTemplateId, questionType, questionText}}}
    const getState = () => state
    const sideEffect = initiateUpdateQuiz(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_QUIZ_START})
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_QUIZ_FAILURE})
})

it('should set quizToAdd to null and isAddQuiz to false when CANCEL_ADD_QUIZ is performed', () => {
    const currentState = reducer()
    currentState.quizToAdd = 'test quiz'
    currentState.isAddQuiz = true
    const state = reducer(currentState, {type: CANCEL_ADD_QUIZ})
    expect(state.quizToAdd).toBeNull()
    expect(state.isAddQuiz).toBe(false)
})


it('should set quizToEdit to null and isEditQuiz to false when CANCEL_EDIT_QUIZ is performed', () => {
    const currentState = reducer()
    currentState.quizToEdit = 'test quiz'
    currentState.isEditQuiz = true
    const state = reducer(currentState, {type: CANCEL_EDIT_QUIZ})
    expect(state.quizToEdit).toBeNull()
    expect(state.isEditQuiz).toBe(false)
})

it('should set isAddProc when ADD_QUIZZES action is performed', () => {
    const currentState =reducer()
    currentState.isAddQuiz=false
    const state=reducer(currentState,{type:ADD_QUIZZES})
    expect(state.isAddQuiz).toBe(true)
    expect(state.quizToAdd).toStrictEqual({
        quizTemplateId: '',
        questionNumber: '',
        questionText: '',
        questionType: '',
    })
})
it('should update addQuizDetails  when ADD_QUIZ_DETAILS action is performed', () => {

    const currentState = reducer()
    currentState.addQuizDetails= {
        quizTemplateId: '',
        questionNumber: '',
        questionText: '',
        questionType: '',
    }
    const addQuizDetails = {
        quizTemplateId: '1L',
        questionNumber: 1,
        questionText: 'some text',
        questionType: 'Text',
    }
    const state = reducer(currentState, {type:ADD_QUIZ_DETAILS, payload: addQuizDetails})
    expect(state.addQuizDetails).toStrictEqual({
        quizTemplateId: '1L',
        questionNumber: 1,
        questionText: 'some text',
        questionType: 'Text',
    })
})

it('should set processToEdit with the new process and set isEditQuiz  when EDIT_QUIZ action is performed', () => {
    const currentState = reducer()
    currentState.quizToEdit = ''
    currentState.isEditQuiz=false
    const quiz={
        questionId:'1L',
        quizTemplateId: '1L',
        questionType: 'Text',
        questionNumber: 1,
        questionText: 'some text',
    }
    const state = reducer(currentState, {type: EDIT_QUIZ,quiz})
    expect(state.isEditQuiz).toBe(true)
    expect(state.quizToEdit).toStrictEqual({
        questionId:'1L',
        quizTemplateId: '1L',
        questionType: 'Text',
        questionNumber: 1,
        questionText: 'some text',
    })
})