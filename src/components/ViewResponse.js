import React from 'react';
import {Table} from "react-bootstrap";

function ViewResponse({responsed}) {
    const {questionText, response} = responsed
    
    return <div>
        <div className={'d-flex flex-wrap justify-content-between'}>
            <Table striped bordered>
                <tbody>
                <tr>
                    <td>{'Question: ' + questionText}</td>
                    <td>{'Response: ' + response}</td>
                </tr>
                </tbody>
            </Table>
        </div>
    </div>

}

export default ViewResponse;