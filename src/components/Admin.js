import {useDispatch, useSelector} from "react-redux";
import {
    initLoadAllUsers,
    LOGOUT,
    REGISTER_START
} from "../reducers/userReducer";
import {Button, Col, Row, Spinner} from "react-bootstrap";
import UsersList from "./UsersList";
import {useEffect} from "react";
import EditUserRole from "./EditUserRole";
import Recruiter from "./Recruiter";
import Applicant from "./Applicant/Applicant";


export default function Admin({_useDispatch = useDispatch, _useSelector = useSelector, UsersListC = UsersList, SpinnerC = Spinner, EditUserRoleC=EditUserRole, RecruiterC = Recruiter, ApplicantC = Applicant}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector(state => state.userReducer.credentials.username)
    const loading = _useSelector(state => state.userReducer.loading)
    const isImpersonate = _useSelector(state => state.userReducer.isImpersonate)
    const impersonateDetails = _useSelector(state => state.userReducer.impersonateDetails)

    useEffect(() => {
        dispatch(initLoadAllUsers());
    }, []);


    function handleRegister() {
        dispatch({type: REGISTER_START})
    }

    return (
        <>
            {isImpersonate ?
                <>
                    {impersonateDetails.role === "Recruiter" ? <RecruiterC /> : null}
                    {impersonateDetails.role === "Applicant" ? <ApplicantC /> : null}
                </> : <>
                    <Row className='my-3 align-items-center'>
                        <Col>
                            <Button type='button' title='ADD USER' onClick={handleRegister}>ADD USER</Button>
                        </Col>
                        <Col xs='auto'>Welcome {loggedInUser}</Col>
                        <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT})} variant={"outline-secondary"}>
                            LOGOUT
                        </Button></Col>
                    </Row>
                    <Row>
                        <Col>
                            {loading ? <SpinnerC animation="grow" /> : <UsersListC />}
                        </Col>
                    </Row>
                    <EditUserRoleC />
                </>}
        </>
    )
}