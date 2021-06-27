import React from 'react';
import {Link} from "react-router-dom";

function OperationEl(props) {
    return (
        <tr>
            <td>{props.data.label_machine}</td>
            <td>{props.data.label_travail}</td>
            <td>{props.data.duree} mn</td>
            <td>
                <Link to={`/operation/${props.data.opid}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default OperationEl;