import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {BsFillTrash2Fill, BsPencilSquare} from "react-icons/bs";
import {deleteUser, EDIT_ROLE_START, IMPERSONATE_START} from "../reducers/userReducer";


export default function UsersList({_useSelector = useSelector, _useDispatch = useDispatch}) {
    const users = _useSelector(state => state.userReducer.users)
    const dispatch = _useDispatch();
    const loggedInRole = _useSelector(state => state.userReducer.loggedInRole)

    function handleEditRole(userId) {
        dispatch({type: EDIT_ROLE_START, payload : {userId}})
    }
    function handleDeleteUser(userId) {
        dispatch(deleteUser(userId))
    }
    function switchToImpersonate(user) {
        dispatch({type: IMPERSONATE_START, payload: {user}})
    }

    return (
        <Card>
            <Card.Header><h5>Users List</h5></Card.Header>
            <Card.Body>
                {users.map((user, index) => (loggedInRole !== user.role) ?
                    <div key={index}>
                        <Row>
                            <Col>
                                <Button onClick={() => switchToImpersonate(user)} variant="link">{user.username}</Button>
                            </Col>
                            <Col>{user.role}</Col>
                            <Col>
                                <Button title='Edit' variant={"outline-secondary"} size='sm'
                                        onClick = {e => handleEditRole(user.id)} >
                                    <BsPencilSquare />
                                </Button>
                            </Col>
                            <Col>
                                <Button title='Delete' variant={"outline-danger"} size='sm'
                                        onClick={() => handleDeleteUser(user.id)}>
                                    <BsFillTrash2Fill />
                                </Button>
                            </Col>
                        </Row>
                    </div>: null)}
            </Card.Body>
        </Card>
    )
}
