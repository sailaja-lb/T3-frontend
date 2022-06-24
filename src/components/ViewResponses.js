import React from 'react';
import ViewResponse from "./ViewResponse";

function ViewResponses({responses}) {
    return <div>
        {responses.map((response, index) => <ViewResponse responsed={response} key={index}/>)}
    </div>

}

export default ViewResponses;