import React from 'react';
import InfoRealisation from "../components/realisation/infoRealisation";
import OperationLst from "../components/realisation/operations/operationLst";

function UpdateRealisation(props) {
    return (
        <div className="container">
            <h3>Information de la réalisation</h3>
            <InfoRealisation id={props.id}/>
            <h3>Liste des opérations</h3>
            <OperationLst id={props.id}/>
        </div>
    );
}

export default UpdateRealisation;