import React from 'react';
import {Link} from "react-router-dom";

function CommandeEl(props) {
    return (
        <tr>
            <td>{props.data.name_cli}</td>
            <td>{props.data.montant_tot}</td>
            <td>{(new Date(props.data.date_commande).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
            <td>{props.data.status}</td>
            <td><Link to={`/commande/${props.data.idcommande}`} className="btn btn-primary">Modifier</Link></td>
        </tr>
    );
}

export default CommandeEl;