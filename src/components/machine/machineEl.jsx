import React from 'react';
import {Link} from "react-router-dom";

function MachineEl(props) {
    return (
        <tr>
            <td>{props.data.label_machine}</td>
            <td>
                <Link to={`/machine/${props.data.id}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default MachineEl;