import React from 'react';
import {Link} from "react-router-dom";

function PieceEl(props) {
    return (
        <tr>
            <td>{props.data.lib_piece}</td>
            <td>{props.data.prix_achat} €</td>
            <td>{props.data.prix_vente} €</td>
            <td>{props.data.name_fournisseur}</td>
            <td>{props.data.label_type}</td>
            <td>{props.data.quantite}</td>
            <td>
                <Link to={`/piece/${props.data.idpiece}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default PieceEl;