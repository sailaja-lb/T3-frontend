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
import Applicant from "./Applicant";


export default function Admin({_useDispatch = useDispatch, _useSelector = useSelector, UsersListC = UsersList}) {
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
                    {impersonateDetails.role === "Recruiter" ? <Recruiter /> : null}
                    {impersonateDetails.role === "Applicant" ? <Applicant /> : null}
                </> : <>
                    <Row className='my-3 align-items-center'>
                        <Col>
                            <Button type='button' onClick={handleRegister}>ADD USER</Button>
                        </Col>
                        <Col xs='auto'>Welcome {loggedInUser}</Col>
                        <Col xs='auto'><Button title='Logout' onClick={() => dispatch({type: LOGOUT})} variant={"outline-secondary"}>
                            LOGOUT
                        </Button></Col>
                    </Row>
                    <Row>
                        <Col xs lg="2">
                            {loading ? <Spinner animation="grow" /> : <UsersListC />}
                        </Col>
                    </Row>
                    <EditUserRole />
                </>}
        </>
    )
}