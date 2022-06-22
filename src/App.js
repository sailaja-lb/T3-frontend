
import {useSelector} from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import {Container} from "react-bootstrap";
//import Applicant from "./components/Applicant";

function App({LoginC=Login, AdminC = Admin, RegisterC = Register, _useSelector = useSelector,
                 RecruiterC = Recruiter,
//                 ApplicantC = Applicant
}) {

    const isLoggedIn = _useSelector(state => state.userReducer.isLoggedIn);
    const isRegister = _useSelector(state => state.userReducer.isRegister);
    const loggedInRole = _useSelector(state => state.userReducer.loggedInRole);


    if (isLoggedIn) {
        if (loggedInRole === 'Admin') {
            return <Container>
                <AdminC/>
            </Container>
        }
        else if (loggedInRole === 'Recruiter') {
            return <Container>
                <Recruiter/>
            </Container>
        }
/*        else if (loggedInRole === 'Applicant') {
            return <Container>
                <ApplicantC/>
            </Container>
        }*/

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