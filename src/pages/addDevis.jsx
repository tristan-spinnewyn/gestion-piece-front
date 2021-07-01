import React, {useEffect, useState} from 'react';
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {addAchat} from "../api/achat";
import SelectLabel from "../components/form/selectLabel";
import InputLabel from "../components/form/inputLabel";
import {getAllClient} from "../api/client";
import {addDevis} from "../api/devis";

function AddDevis(props) {
    const [client,setClient] = useState([])
    const [devis,setDevis] = useState({client_id:null,date_devis:'',date_limite:''})

    const handleChange = (event)=>{
        formHandleChange(event,devis,setDevis)
    }
    useEffect(async()=>{
        try{
            const clientData = await getAllClient()
            const arrayClient = []
            clientData.map((client,index)=>{
                arrayClient.push({id:client.id,name:client.name_cli})
            })
            setClient(arrayClient)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])

    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            if(devis.date_devis === '' || devis.date_limite === '' || devis.client_id === null){
                toast.warn("Veuillez remplir tout les champs")
                return
            }
            if(window.confirm("Attention, les données saisie ne pourrons plus être modifié. Voulez vous continuer ?")) {
                const data = await addDevis(devis)
                props.history.push(`/devis/${data.id}`)
            }else{
                return
            }
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }
    return (
        <div>
            <h2>Ajouter un devis</h2>
            <p>Le contenu du devis pourra être complété à la prochaine étape.</p>
            <form onSubmit={handleSubmit}>
                <SelectLabel label="Client" value={devis.client_id} defaultOption={true} sentenceOption="Veuillez choisir un client" options={client} name="client_id" change={handleChange}/>
                <InputLabel label="Date du devis" value={devis.date_devis} name="date_devis" type="date" change={handleChange} placeholder="Date du devis"/>
                <InputLabel label="Date limite" change={handleChange} type="date" value={devis.date_limite} name="date_limite" placeholder="Date limite."/>
                <button className="btn btn-primary">Valider</button>
            </form>
        </div>
    );
}

export default AddDevis;