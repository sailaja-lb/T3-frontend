import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Form, InputGroup, Row} from "react-bootstrap";
import {
    ADMIN_CANCEL,
    CANCEL,
    initiateRegister, REGISTER_USER
} from "../reducers/userReducer";
import {BsLock, BsPerson} from "react-icons/bs";

export default function Register({_useSelector = useSelector, _useDispatch=useDispatch}){
    const users = _useSelector(state => state.userReducer.addNewUser)

    const dispatch = _useDispatch()

    function handleRegister(event) {
        event.preventDefault()
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
            <Form onSubmit={handleRegister}>
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
                <Form.Group className="mb-3">
                    <div onChange={e => updateRole(e.target.value)}>
                        <Form.Check inline label="Admin" type="radio" value="Admin" name="user" />
                        <Form.Check inline label="Recruiter" type="radio" value="Recruiter" name="user" />
                        <Form.Check inline label="Applicant" type="radio" value="Applicant" name="user" />
                    </div>
                </Form.Group>
                <Row className={'p-3'}>
                    <Button type={"submit"} variant={"primary"}>Register</Button>
                </Row>
                <Row className={'p-3'}>
                    <Button title='Cancel' variant={"primary"} onClick={() =>  dispatch({type:CANCEL})}>Cancel</Button>
                </Row>
                {/*<Row className={'p-3'}>*/}
                {/*    <Button title='Cancel' variant={"primary"} onClick={() =>  dispatch({type:ADMIN_CANCEL})}>GO BACK TO ADMIN</Button>*/}
                {/*</Row>*/}
            </Form>
        </Card.Body>
    </Card>
}