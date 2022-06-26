import {useDispatch, useSelector} from "react-redux";
import {Alert, Button, Card, Form, InputGroup, Row} from "react-bootstrap";
import {
    ADMIN_CANCEL,
    CANCEL,
    initiateRegister, REGISTER_USER
} from "../reducers/userReducer";
import {BsLock, BsPerson} from "react-icons/bs";

export default function Register({_useSelector = useSelector, _useDispatch=useDispatch}){
    const users = _useSelector(state => state.userReducer.addNewUser)
    const isAddNewUser = _useSelector(state => state.userReducer.isAddNewUser)
    const authMessage = _useSelector(state => state.userReducer.authMessage)

    const dispatch = _useDispatch()

    function handleRegister(event) {
        event.preventDefault()
        // setSubmit(true)
        dispatch(initiateRegister())
    }

    function updateUsername(username) {
        dispatch({type: REGISTER_USER, payload: {...users, username}})
    }

    function updatePassword(password) {
        dispatch({type: REGISTER_USER, payload: {...users, password}})
    }
    function updateRole(role) {
        dispatch({type: REGISTER_USER, payload: {...users, role}})
    }

    return <Card style={{borderWidth: 0}}>
        <Card.Body>
            {authMessage ? (<Alert variant={"danger"}>
                Not Authorized. Should be a Admin</Alert>) : null}
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <InputGroup className="mb-2">
                        <InputGroup.Text><BsPerson/></InputGroup.Text>
                        <Form.Control placeholder='Username' onChange={e => updateUsername(e.target.value)} required={true}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text><BsLock/></InputGroup.Text>
                        <Form.Control placeholder='Password' onChange={e => updatePassword(e.target.value)} required ={true}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div onChange={e => updateRole(e.target.value)}>
                        <Form.Check inline label="Admin" type="radio" value="Admin" name="user" required={true}/>
                        <Form.Check inline label="Recruiter" type="radio" value="Recruiter" name="user" required={true}/>
                        <Form.Check inline label="Applicant" type="radio" value="Applicant" name="user" required={true}/>
                    </div>
                </Form.Group>
                <Row className={'p-3'}>
                    <Button type={"submit"} variant={"primary"}>Register</Button>
                </Row>
                <Row className={'p-3'}>
                    <Button title='Cancel' variant={"primary"} onClick={() =>  dispatch({type:CANCEL})}>Back To Login</Button>
                </Row>
                {isAddNewUser ?
                    <Row className={'p-3'}>
                        <Button title='Cancel' variant={"primary"} onClick={() =>  dispatch({type:ADMIN_CANCEL})}>Back To Admin</Button>
                    </Row>:null}
            </Form>
        </Card.Body>
    </Card>
}