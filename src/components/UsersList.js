import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Row} from "react-bootstrap";

import {DELETE_USER, EDIT_ROLE, UPDATE_CREDENTIALS} from "../reducers/userReducer";
import {BsFillTrash2Fill, BsPencilSquare} from "react-icons/all";

export default function UsersList({_useSelector = useSelector, _useDispatch = useDispatch}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)
    const users = _useSelector(state => state.userReducer.users)
    const credentials = _useSelector(state => state.userReducer.credentials)
    function updateRole(role) {
        dispatch({type: UPDATE_CREDENTIALS, payload: {...credentials, role}})
    }

    return (
        <Card>
            <Card.Header><h5>Users List</h5></Card.Header>
            <Card.Body>
                {users.map((user, index) => (loggedInUser !== user.username) ?
                    <div key={index}>
                        <Row>
                            <Col>{user.username}</Col>
                            <Col>{user.role}</Col>
                            <Col xs='auto'>
                                <Button title='Edit' variant={"outline-secondary"} size='sm'
                                        onClick = {e => updateRole(e.target.value)} >
                                    EDIT
                                    <BsPencilSquare />
                                </Button>
                            </Col>
                            <Col xs='auto'>
                                <Button title='Delete' variant={"outline-danger"} size='sm'
                                        onClick={() => dispatch({type: DELETE_USER})}>
                                    DELETE
                                    <BsFillTrash2Fill />
                                </Button>
                            </Col>
                        </Row>
                    </div>:
                    null)}
            </Card.Body>
        </Card>
    )
}