import React from 'react';
import {Table} from "react-bootstrap";

function ViewResponse({responsed}) {
    const {questionText, response} = responsed
    
    return <div>
        <div className={'d-flex flex-wrap justify-content-between'}>
            <Table striped bordered>
                <thead>
                <tr>
                    <th>Question</th>
                    <th>Response/Answer</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{questionText}</td>
                    <td>{response}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    </div>

}

export default ViewResponse;