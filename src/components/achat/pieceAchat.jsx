import React, {useState} from 'react';
import PieceAchatInfo from "./pieceAchatInfo";
import AddLigneAchat from "./addLigneAchat";

function PieceAchat(props) {
    const [change,setChange] = useState(0)
    return (
        <div>
            <h2>Contenu de la commande</h2>
            <AddLigneAchat change={change} setChange={setChange} id={props.id} idFournisseur={props.idFournisseur}/>
            <PieceAchatInfo id={props.id} change={change}/>
        </div>
    );
}

export default PieceAchat;