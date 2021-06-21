import React from 'react';
import {Link} from "react-router-dom";

function FournisseurEl(props) {
    return (
        <tr>
            <td>{props.data.name_fournisseur}</td>
            <td>{props.data.adresse}</td>
            <td>{props.data.email}</td>
            <td>{props.data.tel}</td>
            <td>
                <Link to={`/fournisseur/${props.data.id}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default FournisseurEl;
