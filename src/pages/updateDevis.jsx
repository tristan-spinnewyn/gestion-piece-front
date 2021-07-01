import React, {useState} from 'react';
import DevisInfo from "../components/devis/devisInfo";
import LigneDevis from "../components/devis/ligneDevis";

function UpdateDevis(props) {
    const [change,setChange] = useState(0)
    return (
        <div className="container">
            <DevisInfo id={props.id} change={change}/>
            <LigneDevis id={props.id} change={change} setChange={setChange}/>
        </div>
    );
}

export default UpdateDevis;