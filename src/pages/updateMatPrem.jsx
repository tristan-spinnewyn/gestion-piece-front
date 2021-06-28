import React, {useEffect, useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import SelectLabel from "../components/form/selectLabel";
import {formHandleChange} from "../services/formService";
import {getAllFournisseur} from "../api/founisseur";
import {toast} from "react-toastify";
import {addMat, getMat, updateMat} from "../api/mat_premapi";

function UpdateMatPrem(props) {
    const [mat_prem, setMatPrem] = useState({lib_mat:'',fournisseur_id:'',prix_achat:0,quantite:0,id:''});

    const handleChange = (event)=>{
        formHandleChange(event,mat_prem,setMatPrem)
    }
    const [fournisseur, setFournisseur] = useState([]);

    useEffect(async () => {
        try{
            const fournisseurData = await getAllFournisseur()
            const arrayFournisseur = []
            fournisseurData.map((fournisseur,index)=>{
                arrayFournisseur.push({id:fournisseur.id,name:fournisseur.name_fournisseur})
            })
            setFournisseur(arrayFournisseur)

            setMatPrem(await getMat(props.id))

        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);

    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            await updateMat(mat_prem)
            toast.success("Modification effectué!")
        }catch (e) {
            console.log(e)
            toast.error("une erreur est survenue.")
        }
    }
    return (
        <div className="container">
            <h2>Modifier une matière première</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel label="Nom" value={mat_prem.lib_mat} change={handleChange} name="lib_mat" type="text" placeholder="Nom de la matière premiere"/>
                <InputLabel label="Prix d'achat" value={mat_prem.prix_achat} change={handleChange} name="prix_achat" placeholder="Prix d'achat" type="number" />
                <SelectLabel label="Fournisseur" value={mat_prem.fournisseur_id} defaultOption={true} sentenceOption="Veuillez choisir un fournisseur" options={fournisseur} name="fournisseur_id" change={handleChange}/>
                <InputLabel label="Quantite" value={mat_prem.quantite} change={handleChange} name="quantite" placeholder="Quantite" type="number" />
                <button className="btn btn-primary">Modifier</button>
            </form>
        </div>
    );
}

export default UpdateMatPrem;