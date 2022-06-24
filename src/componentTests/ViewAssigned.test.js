// noinspection JSCheckFunctionSignatures

import {render, screen} from "@testing-library/react";
import ViewAssigned from "../components/Applicant/ViewAssigned";



it('should show 3 quizzes', function () {
    const state ={
        user: {loggedInUser: {
            username: 'brady', id: 1
            }},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}]},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 1},
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 2},
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 3}
            ]
        }}

    const assignedQuizzes = {getallQuizresult:
            [{quizTemplateId: 1, questions: 'why?'},
                {quizTemplateId: 2, questions: 'how?'},
                {quizTemplateId: 3, questions: 'when?'}]}

    const mockQuiz = ({staticQuiz}) => <div>{staticQuiz}</div>
    console.log(assignedQuizzes)
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={mockQuiz} _useDispatch={() => {}}/>)
    expect(screen.getByText(assignedQuizzes.getallQuizresult[0].questions)).toBeInTheDocument()
    expect(screen.getByText(assignedQuizzes.getallQuizresult[1].questions)).toBeInTheDocument()
    expect(screen.getByText(assignedQuizzes.getallQuizresult[2].questions)).toBeInTheDocument()
});

it('should filter out 1 quiz', function () {
    const state ={
        user: {loggedInUser: {
                username: 'brady', id: 1
            }},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}]},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 1},
                {assignment_id: 2, assigned_to: 2, quizTemplateId: 2},
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 3}
            ]
        }}

    const assignedQuizzes = {getallQuizresult:
            [{quizTemplateId: 1, questions: 'why?'},
                {quizTemplateId: 2, questions: 'how?'},
                {quizTemplateId: 3, questions: 'when?'}]}

    const mockQuiz = ({staticQuiz}) => <div>{staticQuiz}</div>
    console.log(assignedQuizzes)
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={mockQuiz} _useDispatch={() => {}}/>)
    expect(screen.getByText(assignedQuizzes.getallQuizresult[0].questions)).toBeInTheDocument()
    expect(screen.queryByText(assignedQuizzes.getallQuizresult[1].questions)).not.toBeInTheDocument()
    expect(screen.getByText(assignedQuizzes.getallQuizresult[2].questions)).toBeInTheDocument()
});

it('should enable Update button when recruiterPending false', function () {
    const state ={
        user: {loggedInUser: {
                username: 'brady', id: 1
            }},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}],
        recruiterPending: false},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 1},
                {assignment_id: 2, assigned_to: 2, quizTemplateId: 2},
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 3}
            ]
        }}
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={() => {}} _useDispatch={() => {}}/>)
    expect(screen.queryByText('Update').getAttribute('disabled')).toBeNull()
    expect(screen.getByText('Update')).toBeInTheDocument()
});

it('should disable Update button when recruiterPending true', function () {
    const state ={
        user: {loggedInUser: {
                username: 'brady', id: 1
            }},
        quizReducer: {
            getallQuizresult:
                [{quizTemplateId: 1, questions: 'why?'},
                    {quizTemplateId: 2, questions: 'how?'},
                    {quizTemplateId: 3, questions: 'when?'}],
            recruiterPending: true},
        responseReducer: {
            assignments: [
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 1},
                {assignment_id: 2, assigned_to: 2, quizTemplateId: 2},
                {assignment_id: 2, assigned_to: 1, quizTemplateId: 3}
            ]
        }}
    render(<ViewAssigned _useSelector={fn => fn(state)} StaticQuizX={() => {}} _useDispatch={() => {}}/>)
    expect(screen.getByText('Update').getAttribute('disabled')).not.toBeNull()
});

// it('should show 3 quizzes', function () {
//     const state ={
//         user: {username: 'brady', password: 'mypass'},
//         quizReducer: {getallQuizresult:
//                 [{quizTemplateId: 'quiz1', username: 'brady'},
//                     {quizTemplateId: 'quiz2', username: 'brady'},
//                     {quizTemplateId: 'quiz3', username: 'brady'}]}}
//
//
//     const assigned = {quizzes: [
//             {quizTemplateId: 'quiz1', username: 'brady'},
//             {quizTemplateId: 'quiz2', username: 'brady'},
//             {quizTemplateId: 'quiz3', username: 'brady'}]}
//
//     const mockQuiz = ({staticQuiz}) => <div>{staticQuiz}</div>
//     render(<ViewAssigned _useSelector={fn => fn(state)} GetQuizC={mockQuiz}  _useDispatch={() => {}}/>)
//     expect(screen.getByText(assigned.quizzes[0].quizTemplateId)).toBeInTheDocument()
//     expect(screen.getByText(assigned.quizzes[1].quizTemplateId)).toBeInTheDocument()
//     expect(screen.getByText(assigned.quizzes[2].quizTemplateId)).toBeInTheDocument()
// });
//
// it('should filter out 1 quiz', function () {
//     const state ={
//         user: {username: 'brady', password: 'mypass'},
//         quizReducer: {getallQuizresult:
//                 [{quizTemplateId: 'quiz1', username: 'brady'},
//                     {quizTemplateId: 'quiz2', username: 'brady'},
//                     {quizTemplateId: 'quiz3', username: 'brdy'}]}}
//
//     const assigned = {quizzes: [
//             {quizTemplateId: 'quiz1', username: 'brady'},
//             {quizTemplateId: 'quiz2', username: 'brady'},
//             {quizTemplateId: 'quiz3', username: 'd'}]}
//
//     const mockQuiz = ({staticQuiz}) => <div>{staticQuiz}</div>
//     render(<ViewAssigned _useSelector={fn => fn(state)} _FauxQuiz={mockQuiz} _useDispatch={() => {}}/>)
//     expect(screen.getByText(assigned.quizzes[0].quizTemplateId)).toBeInTheDocument()
//     expect(screen.getByText(assigned.quizzes[1].quizTemplateId)).toBeInTheDocument()
//     expect(screen.queryByText(assigned.quizzes[2].quizTemplateId)).not.toBeInTheDocument()
// });
//
// it('should enable Update button when recruiterPending false', function () {
//     const state ={
//         user: {username: 'brady', password: 'mypass'},
//         quizReducer: {getallQuizresult:
//                 [{quizTemplateId: 'quiz1', username: 'brady'},
//                     {quizTemplateId: 'quiz2', username: 'brady'},
//                     {quizTemplateId: 'quiz3', username: 'brdy'}]},
//         recruiterPending: false}
//     render(<ViewAssigned _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
//     expect(screen.queryByText('Update').getAttribute('disabled')).toBeNull()
//     expect(screen.getByText('Update')).toBeInTheDocument()
// });
//
// it('should disable Update button when recruiterPending true', function () {
//     const state ={
//         user: {username: 'brady', password: 'mypass'},
//         quizReducer: {getallQuizresult:
//                 [{quizTemplateId: 'quiz1', username: 'brady'},
//                     {quizTemplateId: 'quiz2', username: 'brady'},
//                     {quizTemplateId: 'quiz3', username: 'brdy'}]},
//         recruiterPending: true}
//     render(<ViewAssigned _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
//     expect(screen.getByText('Update').getAttribute('disabled')).not.toBeNull()
// });