// noinspection JSCheckFunctionSignatures

import {render, screen} from "@testing-library/react";
import ViewAssigned from "../components/Applicant/ViewAssigned";

it('should show 3 quizzes', function () {
    const state ={
        userReducer: {credentials: {
            username: 'brady', password: 'mypass', role: 'Applicant'
            },
            users: [{username: 'brady', password: 'mypass', role: 'Applicant', id: 1},
                {username: 'leng', password: 'word', role: 'Applicant', id: 2},
                {username: 'ryan', password: 'password', role: 'Applicant', id: 3}]},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}]},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 1},
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 2},
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 3}
            ]
        }}

    const assignedQuizzes = {getallQuizresult:
            [{quizTemplateId: 1, questions: 'why?'},
                {quizTemplateId: 2, questions: 'how?'},
                {quizTemplateId: 3, questions: 'when?'}]}

    const mockQuiz = ({staticQuiz}) => <div>{staticQuiz.quizTemplateId}</div>
    console.log(assignedQuizzes)
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={mockQuiz} _useDispatch={() => {}}/>)
    expect(screen.getByText(assignedQuizzes.getallQuizresult[0].quizTemplateId)).toBeInTheDocument()
    expect(screen.getByText(assignedQuizzes.getallQuizresult[1].quizTemplateId)).toBeInTheDocument()
    expect(screen.getByText(assignedQuizzes.getallQuizresult[2].quizTemplateId)).toBeInTheDocument()
});

it('should filter out 1 quiz', function () {
    const state ={
        userReducer: {credentials: {
                username: 'brady', password: 'mypass', role: 'Applicant'
            },
            users: [{username: 'brady', password: 'mypass', role: 'Applicant', id: 1},
                {username: 'leng', password: 'word', role: 'Applicant', id: 2},
                {username: 'ryan', password: 'password', role: 'Applicant', id: 3}]},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}]},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 1},
                {assignment_id: 2, assignedTo: 2, quizTemplateId: 2},
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 3}
            ]
        }}

    const assignedQuizzes = {getallQuizresult:
            [{quizTemplateId: 1, questions: 'why?'},
                {quizTemplateId: 2, questions: 'how?'},
                {quizTemplateId: 3, questions: 'when?'}]}

    const mockQuiz = ({staticQuiz}) => <div>{staticQuiz.quizTemplateId}</div>
    console.log(assignedQuizzes)
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={mockQuiz} _useDispatch={() => {}}/>)
    expect(screen.getByText(assignedQuizzes.getallQuizresult[0].quizTemplateId)).toBeInTheDocument()
    expect(screen.queryByText(assignedQuizzes.getallQuizresult[1].quizTemplateId)).not.toBeInTheDocument()
    expect(screen.getByText(assignedQuizzes.getallQuizresult[2].quizTemplateId)).toBeInTheDocument()
});

it('should enable Update button when recruiterPending false', function () {
    const state ={
        userReducer: {credentials: {
                username: 'brady', password: 'mypass', role: 'Applicant'
            },
            users: [{username: 'brady', password: 'mypass', role: 'Applicant', id: 1},
                {username: 'leng', password: 'word', role: 'Applicant', id: 2},
                {username: 'ryan', password: 'password', role: 'Applicant', id: 3}]},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}]},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 1},
                {assignment_id: 2, assignedTo: 2, quizTemplateId: 2},
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 3}
            ]
        }}
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={() => {}} _useDispatch={() => {}}/>)
    expect(screen.queryByText('Update').getAttribute('disabled')).toBeNull()
    expect(screen.getByText('Update')).toBeInTheDocument()
});

it('should disable Update button when recruiterPending true', function () {
    const state ={
        userReducer: {credentials: {
                username: 'brady', password: 'mypass', role: 'Applicant'
            },
            users: [{username: 'brady', password: 'mypass', role: 'Applicant', id: 1},
                {username: 'leng', password: 'word', role: 'Applicant', id: 2},
                {username: 'ryan', password: 'password', role: 'Applicant', id: 3}]},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}],
        recruiterPending: true},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 1},
                {assignment_id: 2, assignedTo: 2, quizTemplateId: 2},
                {assignment_id: 2, assignedTo: 1, quizTemplateId: 3}
            ]
        }}
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={() => {}} _useDispatch={() => {}}/>)
    expect(screen.getByText('Update').getAttribute('disabled')).not.toBeNull()
});