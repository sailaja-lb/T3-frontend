import {useDispatch, useSelector} from "react-redux";
import {LOGOUT, REGISTER_START, REGISTER_USER} from "../reducers/userReducer";
import {Button, Col, Row} from "react-bootstrap";
import UsersList from "./UsersList";


export default function Admin({_useDispatch = useDispatch, _useSelector = useSelector, UsersListC = UsersList}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector(state => state.userReducer.credentials.username)

    function handleRegister() {
        dispatch({type: REGISTER_START})
    }

    return (
        <>
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
                    <UsersListC />
                </Col>
            </Row>
        </>
    )
}