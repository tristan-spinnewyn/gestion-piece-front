import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getCommande} from "../../api/commande";
import AddLigneCommande from "./addLigneCommande";
import LigneCommandeInfo from "./ligneCommandeInfo";

function LigneCommande(props) {
    const [commande,setCommande] = useState({})

    useEffect(async()=>{
        try{
            const commandeApi = await getCommande(props.id)
            setCommande(commandeApi)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    },[])
    return (
        <div>
            <h2>Contenu de la commande</h2>
            {commande.status == 1 ? <AddLigneCommande id={props.id} setChange={props.setChange} change={props.change}/> : ''}
            <LigneCommandeInfo id={props.id} change={props.change}/>
        </div>
    );
}

export default LigneCommande;