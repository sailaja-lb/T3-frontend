// import AddQuiz from "./components/AddQuiz";
// import RecruiterHeader from "./components/RecruiterHeader";
// import {useSelector} from "react-redux";
// import {Container} from "react-bootstrap";
// import GetAllQuizzes from "./components/GetAllQuizzes";
// //import AssignQuizToApplicant from "./components/AssignQuizToApplicant";
//
// import GetCompletedQuizzes from "./components/GetCompletedQuizzes";
// export default function App({
//                                 _useSelector = useSelector,
//                                 RecruiterHeaderC=RecruiterHeader,
//                                 GetAllQuizzesC=GetAllQuizzes,
//                                 GetCompletedQuizzesC=GetCompletedQuizzes,
//                                 AddQuizC = AddQuiz,
//                             }) {
//     const isAddQuiz = _useSelector(state => state.quizReducer.isAddQuiz)
//     const isGetAllQuiz = _useSelector(state => state.quizReducer.isGetAllQuiz)
//     const isGetApplicant= _useSelector(state => state.quizReducer.isGetApplicant)
//
//     if (isGetApplicant){
//         return <div className={'d-flex justify-content-center'}>
//             <GetCompletedQuizzesC/>
//         </div>
//     }
//  //   if (isRecruiter) {
//         return <div className={'d-flex justify-content-center'}>
//             <Container>
//                 <RecruiterHeaderC/>
//                 {isGetAllQuiz && <GetAllQuizzesC/>}
//                 {isAddQuiz && <AddQuizC/>}
// {/*                {isEditProc && <EditProcessC/>}*/}
//             </Container>
//         </div>
// //    }
//
// }
import {useSelector} from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import {Container} from "react-bootstrap";
// import Recruiter from "./components/Recruiter";
// import Applicant from "./components/Applicant";

function App({LoginC=Login, AdminC = Admin, RegisterC = Register, _useSelector = useSelector}) {

    const isLoggedIn = _useSelector(state => state.userReducer.isLoggedIn);
    const isRegister = _useSelector(state => state.userReducer.isRegister);
    const loggedInRole = _useSelector(state => state.userReducer.loggedInRole);


    if (isLoggedIn) {
        if (loggedInRole === 'Admin') {
            return <Container>
                <AdminC/>
            </Container>
        }
        // else if (loggedInRole === 'Recruiter') {
        //     return <Container>
        //         <RecruiterC/>
        //     </Container>
        // }else if (loggedInRole === 'Applicant') {
        //     return <Container>
        //         <ApplicantC/>
        //     </Container>
        // }

    } else if (isRegister) {
        return <div style={{
            position: 'absolute', left: '50%', top: '30%',
            transform: 'translate(-50%, -50%)'
        }}>
            <RegisterC/>
        </div>
    } else {
        return <div style={{
            position: 'absolute', left: '50%', top: '30%',
            transform: 'translate(-50%, -50%)'
        }}>
            <LoginC/>
        </div>
    }
}
export default App;

