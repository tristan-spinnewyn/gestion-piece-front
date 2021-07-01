import React, {useState} from 'react';
import AchatInfo from "../components/achat/achatInfo";
import PieceAchat from "../components/achat/pieceAchat";

function UpdateAchat(props) {
    return (
        <div className="container">
            <AchatInfo id={props.id}/>
            <PieceAchat id={props.id}/>
        </div>
    );
}

export default UpdateAchat;