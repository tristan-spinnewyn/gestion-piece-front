import React, {useEffect, useState} from 'react';
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import InputLabel from "../components/form/inputLabel";
import {getClient, updateClient} from "../api/client";

function UpdateClient(props) {
    const [client, setClient] = useState({name_cli:'',adresse_cli:'',ville_cli:'',cp_cli:'',email_cli:'',tel_cli:''});

    const handleChange = (event)=>{
        formHandleChange(event,client,setClient)
    }

    useEffect( async() => {
        try{
            const response = await getClient(props.id)
            setClient(response)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(client.name_cli === '' || client.adresse_cli === ''|| client.ville_cli === ''|| client.cp_cli === '' || client.email_cli === '' || client.tel_cli === ''){
                toast.warn("Veuillez saisir tout les champs.")
                return
            }
            await updateClient(client)
            toast.success("Client modifié !")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    }

    return (
        <div className="container">
            <h2>Modifier le fournisseur</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel name="name_cli" value={client.name_cli} change={handleChange} type="text" label="Nom du client" placeholder="Nom du client"/>
                <InputLabel name="adresse_cli" value={client.adresse_cli} change={handleChange} type="text" label="Adresse" placeholder="Adresse"/>
                <InputLabel name="ville_cli" value={client.ville_cli} change={handleChange} type="text" label="Ville" placeholder="ville"/>
                <InputLabel name="cp_cli" value={client.cp_cli} change={handleChange} type="text" label="Code postal" placeholder="code postal"/>
                <InputLabel name="email_cli" value={client.email_cli} change={handleChange} type="text" label="Email" placeholder="Email"/>
                <InputLabel name="tel_cli" value={client.tel_cli} change={handleChange} type="text" label="Téléphone" placeholder="Téléphone"/>
                <button className="btn btn-primary mb-3">Modifier</button>
            </form>
        </div>
    )
}

export default UpdateClient;