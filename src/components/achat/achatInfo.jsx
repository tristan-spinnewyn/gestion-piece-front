import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getAchat, updateAchat} from "../../api/achat";
import {formHandleChange} from "../../services/formService";
import InputLabel from "../form/inputLabel";

function AchatInfo(props) {
    const [achat,setAchat] = useState({})
    const [achatUpdate,setAchatUpdate] = useState({montant_tot:0,id:props.id,date_livraison_reel:''})
    useEffect(async()=>{
        try{
            const achatApi = await getAchat(props.id)
            setAchat(achatApi)
            let date = ''
            if(achatApi.date_livraison_reel != null){
                date = (new Date(achatApi.date_livraison_reel)).toISOString().slice(0, 10)
            }
            setAchatUpdate({montant_tot:achatApi.montant_tot,id:props.id,date_livraison_reel:date})
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue. Peut etre que l'objet demander n'existe plus.")
        }
    },[])

    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            await updateAchat(achatUpdate)
            toast.success("La commande a bien été mise a jour.")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }

    const handleChange = (event)=>{
        formHandleChange(event,achatUpdate,setAchatUpdate)
    }
    return (
        <div>
            <h2>Information sur la commande</h2>
            <table className="table">
                <thead>
                <th>Date d'achat</th>
                <th>Date de livraison prévue</th>
                <th>Fournisseur</th>
                </thead>
                <tbody>
                <td>{new Date(achat.date_achat).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'})}</td>
                <td>{new Date(achat.date_livraison_prev).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'})}</td>
                <td>{achat.name_fournisseur}</td>
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                <InputLabel label="montant" change={handleChange} type="number" value={achatUpdate.montant_tot} name="montant_tot" placeholder="Montant total"/>
                <InputLabel label="date de livraison réel" change={handleChange} type="date" value={achatUpdate.date_livraison_reel} name="date_livraison_reel" placeholder="date de livraison reel"/>
                <button className="btn btn-primary">Valider</button>
            </form>
        </div>
    );
}

export default AchatInfo;