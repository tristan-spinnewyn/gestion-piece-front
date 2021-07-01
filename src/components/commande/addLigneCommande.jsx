import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {formHandleChange} from "../../services/formService";
import SelectLabel from "../form/selectLabel";
import {addLigneDevisInCommande, getCommande, getLigneDevisForSet} from "../../api/commande";

function AddLigneCommande(props) {
    const [ligneCommande, setLigneCommande] = useState([])
    const [value,setValue] = useState({piece:''})

    useEffect(async () => {
        try {
            const commande = await getCommande(props.id)
            const ligneApi = await getLigneDevisForSet(commande.client_id)
            const arrayApi = []
            ligneApi.map((data, index) => {
                arrayApi.push({id: JSON.stringify({piece_id:data.piece_id,devis_id:data.devis_id}), name: `${data.lib_piece} (${data.prix}€) x ${data.qte}`})
            })
            setLigneCommande(arrayApi)
        } catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, [props.change])

    const handleChange = (event) => {
        formHandleChange(event, value, setValue)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(value.piece === ''){
                toast.warn("Veuillez saisir tout les champs.")
                return
            }
            const data = JSON.parse(value.piece)
            data.commande_id = props.id
            await addLigneDevisInCommande(data)
            toast.success("La ligne est bien ajouté..")
            props.setChange(props.change +1)
        }catch (e) {
            console.log(e)
            if(e == 'Error: Request failed with status code 401'){
                toast.error("Vous n'avez pas les droits requis ou la commande est terminé. Vérifier aussi qu'un produit similaire ne se trouve pas deja dans la commande en cours. Vous ne pouvez pas rajouter de produit.")
            }else{
                toast.error("Une erreur est survenue. Cette pièce est probablement déjà dans le devis.")
            }
        }
    }
    return (
        <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
            <div className="col-sm-10">
                <SelectLabel change={handleChange} value={value.piece} label="Ligne du devis" options={ligneCommande}
                             name="piece" defaultOption={true} sentenceOption="Veuillez choisir une ligne devis"/>
            </div>
            <button className="col-sm-2 btn-primary btn">Ajouter</button>
        </form>
    );
}

export default AddLigneCommande;