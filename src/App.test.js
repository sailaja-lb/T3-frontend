import { render, screen } from '@testing-library/react';
import App from './App';

it('should show the Recruiter Header component when a recruiter logs in', () => {
  const state = {quizReducer: {recruiterPending: false}}
  const expectedText = 'some text here'
  const mock = () => <>{expectedText}</>
  render(<App _useSelector={fn => fn(state)} RecruiterHeaderC={mock}/>)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
})

it('should show Get All Quizzes for recruiter when GetAllQuiz is set', () => {
  const state = {quizReducer: {isGetAllQuiz: true}}
  const expectedText = 'some text here'
  const mock = () => <>{expectedText}</>
  render(<App _useSelector={fn => fn(state)} GetAllQuizzesC={mock} RecruiterHeaderC={jest.fn()}
              />)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
})


it('should show Add Quiz for Recruiter when AddQuiz is set', () => {
  const state = {quizReducer: {isGetAllQuiz: false,
      isAddQuiz:true}}
  const expectedText = 'some text here'
  const mock = () => <>{expectedText}</>
  render(<App _useSelector={fn => fn(state)} GetAllQuizzesC={mock} RecruiterHeaderC={jest.fn()}
              AddQuizC={mock}/>)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
})

it('should show Edit Quiz for Recruiter when EditQuiz is set', () => {
  const state = {quizReducer: {isGetAllQuiz: false,
      isAddQuiz:false,isEditQuiz:true}}
  const expectedText = 'some text here'
  const mock = () => <>{expectedText}</>
  render(<App _useSelector={fn => fn(state)} GetAllQuizzesC={mock} RecruiterHeaderC={jest.fn()}
              AddQuizC={mock} EditQuizC={mock}/>)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
})


it('should show Get Completed Quiz for Recruiter when GetApplicant is set', () => {
  const state = {quizReducer: {isGetAllQuiz: false,
      isAddQuiz:false,isEditQuiz:false,isGetApplicant: true}}
  const expectedText = 'some text here'
  const mock = () => <>{expectedText}</>
  render(<App _useSelector={fn => fn(state)} GetAllQuizzesC={mock} RecruiterHeaderC={jest.fn()}
              AddQuizC={mock} EditQuizC={mock} GetCompletedQuizzesC={mock}/>)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
})