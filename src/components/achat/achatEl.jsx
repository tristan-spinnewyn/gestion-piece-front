import React from 'react';
import {Link} from "react-router-dom";

function AchatEl(props) {
    return (
        <tr>
            <td>{props.data.name_fournisseur}</td>
            <td>{props.data.montant_tot}</td>
            <td>{(new Date(props.data.date_achat).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
            <td>{(new Date(props.data.date_livraison_prev).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
            <td>{props.data.date_livraison_reel ? (new Date(props.data.date_livraison_reel).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'})) : ''}</td>
            <td><Link to={`/achat/${props.data.idachat}`} className="btn btn-primary">Modifier</Link></td>
        </tr>
    );
}

export default AchatEl;