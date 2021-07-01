import React, {useEffect, useState} from 'react';
import {formHandleChange} from "../services/formService";
import {getAllClient} from "../api/client";
import {toast} from "react-toastify";
import {addDevis} from "../api/devis";
import SelectLabel from "../components/form/selectLabel";
import InputLabel from "../components/form/inputLabel";
import {addCommande} from "../api/commande";

function AddCommande(props) {
    const [client,setClient] = useState([])
    const [commande,setCommande] = useState({client_id:null,date_commande:''})

    const handleChange = (event)=>{
        formHandleChange(event,commande,setCommande)
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
            if(commande.date_commande === '' || commande.client_id === null){
                toast.warn("Veuillez remplir tout les champs")
                return
            }
            if(window.confirm("Attention, les données saisie ne pourrons plus être modifié. Voulez vous continuer ?")) {
                const data = await addCommande(commande)
                props.history.push(`/commande/${data.id}`)
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
            <p>Le contenu de la commande pourra être complété à la prochaine étape.</p>
            <form onSubmit={handleSubmit}>
                <SelectLabel label="Client" value={commande.client_id} defaultOption={true} sentenceOption="Veuillez choisir un client" options={client} name="client_id" change={handleChange}/>
                <InputLabel label="Date de commande" value={commande.date_commande} name="date_commande" type="date" change={handleChange} placeholder="Date de la commande"/>
                <button className="btn btn-primary">Valider</button>
            </form>
        </div>
    );
}

export default AddCommande;