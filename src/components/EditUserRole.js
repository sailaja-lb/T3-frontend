import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {EDIT_ROLE_CANCEL, EDIT_ROLE_CHANGE, editUser} from "../reducers/userReducer";
import {Form} from "react-bootstrap";


export default function EditUserRole({_useSelector=useSelector, _useDispatch = useDispatch}) {
    const dispatch = _useDispatch()
    const editUserId = _useSelector(state => state.userReducer.editUserId)
    const editUserRoles = _useSelector(state => state.userReducer.editUserRoles)
    const users = _useSelector(state => state.userReducer.users)

    function handleClose() {
        dispatch({type: EDIT_ROLE_CANCEL})
    }
    function handleUpdateRole(updatedRole) {
        dispatch({type: EDIT_ROLE_CHANGE, payload: {updatedRole}})
    }

    function handleSave() {
        dispatch(editUser());
    }

    return (
        <Modal show={editUserId ? true : false} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>You can Edit this user to these roles.</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3"  onChange={e => handleUpdateRole(e.target.value)} >
                        {["Admin", "Recruiter", "Applicant"].map((each, index) => editUserRoles.indexOf(each) === -1 ? <Form.Check key={index} inline label={each} type="radio" value={each} name="user" /> : null)}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button title='close' variant={"secondary"} onClick={handleClose}>
                    Close
                </Button>
                <Button title='save' variant={"primary"} onClick={handleSave} disabled={editUserRoles.length > 3}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}