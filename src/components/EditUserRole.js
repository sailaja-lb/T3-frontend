import {useDispatch, useSelector} from "react-redux";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {EDIT_ROLE_CANCEL, EDIT_ROLE_CHANGE, editUser} from "../reducers/userReducer";
import {Form} from "react-bootstrap";


export default function EditUserRole({_useSelector=useSelector, _useDispatch = useDispatch}) {
    const dispatch = _useDispatch()
    const editUserId = _useSelector(state => state.userReducer.editUserId)

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
                <Modal.Title>Edit Role</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3"  onChange={e => handleUpdateRole(e.target.value)} >
                        <div>
                            <Form.Check inline label="Admin" type="radio" value="Admin" name="user" />
                            <Form.Check inline label="Recruiter" type="radio" value="Recruiter" name="user" />
                            <Form.Check inline label="Applicant" type="radio" value="Applicant" name="user" />
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}