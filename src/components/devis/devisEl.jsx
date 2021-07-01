import React from 'react';
import {Link} from "react-router-dom";

function DevisEl(props) {
    return (
        <tr>
            <td>{props.data.name_cli}</td>
            <td>{props.data.montant_tot}</td>
            <td>{(new Date(props.data.date_devis).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
            <td>{(new Date(props.data.date_limite).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
            <td>{props.data.status}</td>
            <td><Link to={`/devis/${props.data.iddevis}`} className="btn btn-primary">Modifier</Link></td>
        </tr>
    );
}

export default DevisEl;