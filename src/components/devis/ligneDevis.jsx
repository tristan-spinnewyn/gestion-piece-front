import React, {useEffect, useState} from 'react';
import LigneDevisInfo from "./ligneDevisInfo";
import AddLigneDevis from "./addLigneDevis";
import {getDevis} from "../../api/devis";
import {toast} from "react-toastify";

function LigneDevis(props) {
    const [devis,setDevis] = useState({})

    useEffect(async()=>{
        try{
            const achatApi = await getDevis(props.id)
            setDevis(achatApi)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    },[])
    return (
        <div>
            <h2>Contenu du devis</h2>
            {devis.status == 1 ? <AddLigneDevis id={props.id} setChange={props.setChange} change={props.change}/> : ''}
            <LigneDevisInfo id={props.id} change={props.change}/>
        </div>
    );
}

export default LigneDevis;