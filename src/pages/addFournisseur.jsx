import React, {useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {addFournisseur} from "../api/founisseur";

function AddFournisseur(props) {

    const [fournisseur, setFournisseur] = useState({name_fournisseur:'',adresse:'',email:'',tel:''});

    const handleChange = (event)=>{
        formHandleChange(event,fournisseur,setFournisseur)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(fournisseur.name_fournisseur === '' || fournisseur.adresse === '' || fournisseur.email === '' || fournisseur.tel === ''){
            toast.warn("Veuillez saisir tout les champs.")
            return
        }
        await addFournisseur(fournisseur)
        props.history.push("/fournisseur")
    }

    return (
        <div className="container">
            <h2>Ajouter un fournisseur</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel name="name_fournisseur" value={fournisseur.name_fournisseur} change={handleChange} type="text" label="Nom du fournisseur" placeholder="Nom du fournisseur"/>
                <InputLabel name="adresse" value={fournisseur.adresse} change={handleChange} type="text" label="Adresse" placeholder="Adresse"/>
                <InputLabel name="email" value={fournisseur.email} change={handleChange} type="text" label="Email" placeholder="Email"/>
                <InputLabel name="tel" value={fournisseur.tel} change={handleChange} type="text" label="Téléphone" placeholder="Téléphone"/>
                <button className="btn btn-primary mb-3">Ajouter</button>
            </form>
        </div>
    )
}

export default AddFournisseur;