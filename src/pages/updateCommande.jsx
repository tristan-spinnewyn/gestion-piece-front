import React, {useState} from 'react';
import CommandeInfo from "../components/commande/commandeInfo";
import LigneCommande from "../components/commande/ligneCommande";

function UpdateCommande(props) {
    const [change,setChange] = useState(0)
    return (
        <div className="container">
            <CommandeInfo change={change} id={props.id}/>
            <LigneCommande id={props.id} change={change} setChange={setChange}/>
        </div>
    );
}

export default UpdateCommande;