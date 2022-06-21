import {render, screen} from "@testing-library/react";
import ViewAssigned from "./ViewAssigned";
import userEvent from "@testing-library/user-event";


it('should show 3 quizzes', function () {
    const state = {responseReducer: {quizzes:
                [{title: 'quiz1', username: 'brady'}, {title: 'quiz2', username: 'brady'},
                    {title: 'quiz3', username: 'brady'}]},
        user: {username: 'brady', password: 'mypass'}}

    const assigned = {quizzes: [
        {title: 'quiz1', username: 'brady'},
            {title: 'quiz2', username: 'brady'},
                {title: 'quiz3', username: 'brady'}]}

    const mockQuiz = ({staticQuiz}) => <div>{staticQuiz}</div>
    render(<ViewAssigned _useSelector={fn => fn(state)} _FauxQuiz={mockQuiz}  _useDispatch={() => {}}/>)
    expect(screen.getByText(assigned.quizzes[0].title)).toBeInTheDocument()
    expect(screen.getByText(assigned.quizzes[1].title)).toBeInTheDocument()
    expect(screen.getByText(assigned.quizzes[2].title)).toBeInTheDocument()
});

it('should filter out 1 quiz', function () {
    const state = {responseReducer: {quizzes:
                [{title: 'quiz1', username: 'brady'}, {title: 'quiz2', username: 'brady'},
                    {title: 'quiz3', username: 'not'}]},
        user: {username: 'brady', password: 'mypass'}}

    const assigned = {quizzes: [
            {title: 'quiz1', username: 'brady'},
            {title: 'quiz2', username: 'brady'},
            {title: 'quiz3', username: 'brady'}]}

    const mockQuiz = ({staticQuiz}) => <div>{staticQuiz}</div>
    render(<ViewAssigned _useSelector={fn => fn(state)} _FauxQuiz={mockQuiz} _useDispatch={() => {}}/>)
    expect(screen.getByText(assigned.quizzes[0].title)).toBeInTheDocument()
    expect(screen.getByText(assigned.quizzes[1].title)).toBeInTheDocument()
    expect(screen.queryByText(assigned.quizzes[2].title)).not.toBeInTheDocument()
});

it('should enable Update button when assignedPending false', function () {
    const state = {responseReducer: {quizzes:
                [{title: 'quiz1', username: 'brady'}, {title: 'quiz2', username: 'brady'},
                    {title: 'quiz3', username: 'not'}]},
        getQuizPending: false,
        user: {username: 'brady', password: 'mypass'}}
    render(<ViewAssigned _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(screen.queryByText('Update').getAttribute('disabled')).toBeNull()
    expect(screen.getByText('Update')).toBeInTheDocument()
});

it('should disable Update button when assignedPending true', function () {
    const state = {responseReducer: {
        quizzes: [
            {title: 'quiz1', username: 'brady'},
            {title: 'quiz2', username: 'brady'},
            {title: 'quiz3', username: 'not'}]},
        getQuizPending: true,
        user: {username: 'brady', password: 'mypass'}}
    render(<ViewAssigned _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(state.getQuizPending).toBe(true)
    expect(screen.getByText('Update').getAttribute('disabled')).not.toBeNull()
});
