import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Row} from "react-bootstrap";

import {DELETE_USER_DONE, EDIT_ROLE} from "../reducers/userReducer";
import {BsFillTrash2Fill, BsPencilSquare} from "react-icons/bs";
import {useEffect} from "react";

export default function UsersList({_useSelector = useSelector, _useDispatch = useDispatch}) {
    const dispatch = _useDispatch()
    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)
    const users = _useSelector(state => state.userReducer.users)

    function updateRole(role) {
        dispatch({type: EDIT_ROLE, payload: {credentials: {...role}}})
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
                                        onClick={() => dispatch({type: DELETE_USER_DONE})}>
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