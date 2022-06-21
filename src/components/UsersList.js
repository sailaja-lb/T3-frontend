import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {BsFillTrash2Fill, BsPencilSquare} from "react-icons/bs";
import {deleteUser, EDIT_ROLE_START, editUser} from "../reducers/userReducer";


export default function UsersList({_useSelector = useSelector, _useDispatch = useDispatch}) {
    const loggedInUser = _useSelector(state => state.userReducer.loggedInUser)
    const users = _useSelector(state => state.userReducer.users)

    const dispatch = _useDispatch();

    function handleEditRole(userId) {
        dispatch({type: EDIT_ROLE_START, payload : {userId}})
    }
    function handleDeleteUser(userId) {
        dispatch(deleteUser(userId))
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
                                        onClick = {e => handleEditRole(user.id)} >
                                    EDIT
                                    <BsPencilSquare />
                                </Button>
                            </Col>
                            <Col xs='auto'>
                                <Button title='Delete' variant={"outline-danger"} size='sm'
                                        onClick={() => handleDeleteUser(user.id)}>
                                    DELETE
                                    <BsFillTrash2Fill />
                                </Button>
                            </Col>
                        </Row>
                    </div>: null)}
            </Card.Body>
        </Card>
    )
}

//handleEditRole(user.role)