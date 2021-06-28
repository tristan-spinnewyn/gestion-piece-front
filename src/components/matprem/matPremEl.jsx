import React from 'react';
import {Link} from "react-router-dom";

function MatPremEl(props) {
    return (
        <tr>
            <td>{props.data.lib_mat}</td>
            <td>{props.data.prix_achat} €</td>
            <td>{props.data.quantite}</td>
            <td>
                <Link to={`/mat_prem/${props.data.id}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default MatPremEl;