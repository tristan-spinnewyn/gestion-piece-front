import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getAllFournisseur} from "../api/founisseur";
import SelectLabel from "../components/form/selectLabel";
import {formHandleChange} from "../services/formService";
import InputLabel from "../components/form/inputLabel";
import {addAchat} from "../api/achat";

function AddAchat(props) {
    const [fournisseur,setFournisseur] = useState([])
    const [achat,setAchat] = useState({fournisseur_id:null,date_achat:'',date_livraison_prev:'',montant_tot:''})

    const handleChange = (event)=>{
        formHandleChange(event,achat,setAchat)
    }
    useEffect(async()=>{
        try{
            const fournisseurData = await getAllFournisseur()
            const arrayFournisseur = []
            fournisseurData.map((fournisseur,index)=>{
                arrayFournisseur.push({id:fournisseur.id,name:fournisseur.name_fournisseur})
            })
            setFournisseur(arrayFournisseur)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])

    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            if(achat.date_achat === '' || achat.date_livraison_prev === '' || achat.fournisseur_id === null){
                toast.warn("Veuillez remplir tout les champs")
                return
            }
            const data = await addAchat(achat)
            props.history.push(`/achat/${data.id}`)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }
    return (
        <div>
            <h2>Ajouter une commande</h2>
            <p>La date de livraison réel ainsi que le contenu de la commande pourra être complété sur la prochaine étape.</p>
            <form onSubmit={handleSubmit}>
                <SelectLabel label="Fournisseur" value={achat.fournisseur_id} defaultOption={true} sentenceOption="Veuillez choisir un fournisseur" options={fournisseur} name="fournisseur_id" change={handleChange}/>
                <InputLabel label="Montant total" value={achat.montant_tot} name="montant_tot" change={handleChange} type="number" placeholder="Montant total"/>
                <InputLabel label="Date d'achat" value={achat.date_achat} name="date_achat" type="date" change={handleChange} placeholder="Date d'achat"/>
                <InputLabel label="Date de livraison prévu" change={handleChange} type="date" value={achat.date_livraison_prev} name="date_livraison_prev" placeholder="Date de livraison prévue."/>
                <button className="btn btn-primary">Valider</button>
            </form>
        </div>
    );
}

export default AddAchat;