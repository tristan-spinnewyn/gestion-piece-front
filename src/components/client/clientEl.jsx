import React from 'react';
import {Link} from "react-router-dom";

function ClientEl(props) {
    return (
        <tr>
            <td>{props.data.name_cli}</td>
            <td>{props.data.adresse_cli}</td>
            <td>{props.data.ville_cli}</td>
            <td>{props.data.cp_cli}</td>
            <td>{props.data.email_cli}</td>
            <td>{props.data.tel_cli}</td>
            <td>
                <Link to={`/client/${props.data.id}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default ClientEl;
