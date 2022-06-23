//TODO ViewGrades tests
// noinspection JSCheckFunctionSignatures

import {render, screen} from "@testing-library/react";
import ViewGrades from "../components/Applicant/ViewGrades";

it('should show 3 grades', function () {
    const state = {
        responseReducer: {
            grades: [
                {
                    assignmentID: 2,
                    assignedTo: 'Ryan',
                    grade: 'terribad',
                    gradedBy: 'Brady',
                    quizTemplateId: 1
                },
                {
                    assignmentID: 8,
                    assignedTo: 'Brady',
                    grade: 'perfect',
                    gradedBy: 'Jonathan',
                    quizTemplateId: 5
                },
                {
                    assignmentID: 4,
                    assignedTo: 'Ryan',
                    grade: 'somehow worse',
                    gradedBy: 'Santa',
                    quizTemplateId: 6
                },
            ]}
    }
    render(<ViewGrades _useSelector={fn => fn(state)} _useDispatch={() => {}} />)
    expect(screen.getByText(state.responseReducer.grades[0].grade)).toBeInTheDocument()
    expect(screen.getByText(state.responseReducer.grades[1].grade)).toBeInTheDocument()
    expect(screen.getByText(state.responseReducer.grades[2].grade)).toBeInTheDocument()
});

it('should enable Get Grades button when gradesPending false', function () {
    const state = {responseReducer: {
            grades: [
                {
                    assignmentID: 2,
                    assignedTo: 'Ryan',
                    grade: 'terribad',
                    gradedBy: 'Brady',
                    quizTemplateId: 1
                }],
        getGradesPending: false}}
    render(<ViewGrades _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(screen.queryByText('Get Grades').getAttribute('disabled')).toBeNull()
});

it('should disable Get Grades button when gradesPending true', function () {
    const state = {responseReducer: {
            grades: [
                {
                    assignmentID: 2,
                    assignedTo: 'Ryan',
                    grade: 'terribad',
                    gradedBy: 'Brady',
                    quizTemplateId: 1
                }],
            getGradesPending: true}}
    render(<ViewGrades _useSelector={fn => fn(state)} _useDispatch={() => {}}/>)
    expect(screen.getByText('Get Grades').getAttribute('disabled')).not.toBeNull()
});

