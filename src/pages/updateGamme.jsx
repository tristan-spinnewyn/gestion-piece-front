import React from 'react';
import InfoGamme from "../components/gamme/infoGamme";
import OperationGamme from "../components/gamme/operationGamme";

function UpdateGamme(props) {
    return (
        <div className="container">
            <h2>Modifier la gamme</h2>
            <h3>Information de la gamme</h3>
            <InfoGamme id={props.id}/>
            <h3>Opération</h3>
            <OperationGamme id={props.id}/>
        </div>
    );
}

export default UpdateGamme;