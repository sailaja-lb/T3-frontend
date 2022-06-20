import {Alert, Button, Card, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {
    initiateLogin,
    REGISTER_START,
    UPDATE_CREDENTIALS
} from "../reducers/userReducer";
import {BsLock, BsPerson} from "react-icons/bs";


export default function Login({_useSelector=useSelector, _useDispatch=useDispatch}) {
    const credentials = _useSelector(state => state.userReducer.credentials)
    const successfulRegisterMessage = _useSelector(state => state.successfulRegisterMessage)
    const loginErrorMessage = _useSelector(state => state.loginErrorMessage)
    const dispatch = _useDispatch()

    function updateUsername(username) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, username}})
    }

    function updatePassword(password) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, password}})
    }


    function handleSubmit(event) {
        event.preventDefault()
        dispatch(initiateLogin())
    }

    function handleRegister() {
        dispatch({type: REGISTER_START})
    }

    return <Card style={{borderWidth: 0}}>
        <Card.Body>
            {successfulRegisterMessage ? (<Alert variant={"success"}>
                Successfully Registered. Please login</Alert>) : null}
            {loginErrorMessage ? (<Alert variant={"danger"}>
                Failed to login</Alert>) : null}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><BsPerson/></InputGroup.Text>
                        <Form.Control placeholder='Username' onChange={e => updateUsername(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><BsLock/></InputGroup.Text>
                        <Form.Control placeholder='Password' onChange={e => updatePassword(e.target.value)}/>
                    </InputGroup>
                </Form.Group>
                <Row className={'p-3'}>
                    <Button type={"submit"} variant={"primary"}>Login</Button>
                </Row>
                <Row className={'p-3'}>
                    <Button type='button' onClick={handleRegister}>Register</Button>
                </Row>
            </Form>
        </Card.Body>
    </Card>
}