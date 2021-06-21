import React, {useEffect, useState} from 'react';
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {getFournisseur, updateFournisseur} from "../api/founisseur";
import InputLabel from "../components/form/inputLabel";

function UpdateFournisseur(props) {
    const [fournisseur, setFournisseur] = useState({name_fournisseur:'',adresse:'',email:'',tel:'',id:''});

    const handleChange = (event)=>{
        formHandleChange(event,fournisseur,setFournisseur)
    }

    useEffect( async() => {
        try{
            const response = await getFournisseur(props.id)
            console.log(response)
            setFournisseur(response)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(fournisseur.name_fournisseur === '' || fournisseur.adresse === '' || fournisseur.email === '' || fournisseur.tel === ''){
                toast.warn("Veuillez saisir tout les champs.")
                return
            }
            await updateFournisseur(fournisseur)
            toast.success("Fournisseur modifié !")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    }

    return (
        <div className="container">
            <h2>Modifier le fournisseur</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel name="name_fournisseur" value={fournisseur.name_fournisseur} change={handleChange} type="text" label="Nom du fournisseur" placeholder="Nom du fournisseur"/>
                <InputLabel name="adresse" value={fournisseur.adresse} change={handleChange} type="text" label="Adresse" placeholder="Adresse"/>
                <InputLabel name="email" value={fournisseur.email} change={handleChange} type="text" label="Email" placeholder="Email"/>
                <InputLabel name="tel" value={fournisseur.tel} change={handleChange} type="text" label="Téléphone" placeholder="Téléphone"/>
                <button className="btn btn-primary mb-3">Modifier</button>
            </form>
        </div>
    )
}

export default UpdateFournisseur;