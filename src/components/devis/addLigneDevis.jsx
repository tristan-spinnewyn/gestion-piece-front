import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {formHandleChange} from "../../services/formService";
import SelectLabel from "../form/selectLabel";
import InputLabel from "../form/inputLabel";
import {getPieceAVendre} from "../../api/piece";
import {addLigneDevis} from "../../api/devis";

function AddLigneDevis(props) {
    const [ligneDevis, setLigneDevis] = useState({
        piece_id: null,
        qte: 0,
        devis_id: props.id,
        prix:null,
    })
    const [piece, setPiece] = useState([])

    useEffect(async () => {
        try {
            const pieceApi = await getPieceAVendre()
            const arrayPiece = []
            pieceApi.map((data, index) => {
                arrayPiece.push({id: data.id, name: `${data.lib_piece} (${data.prix_vente}€)`})
            })
            setPiece(arrayPiece)
        } catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, [])

    const handleChange = (event) => {
        formHandleChange(event, ligneDevis, setLigneDevis)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(ligneDevis.qte === 0 || ligneDevis.piece_id === null){
                toast.warn("Veuillez saisir tout les champs.")
                return
            }
            await addLigneDevis(ligneDevis)
            toast.success("Le produit a bien été ajouté.")
            props.setChange(props.change +1)
        }catch (e) {
            console.log(e)
            if(e == 'Error: Request failed with status code 401'){
                toast.error("Vous n'avez pas les droits requis ou le devis est terminé. Vous ne pouvez pas rajouter de produit.")
            }else{
                toast.error("Une erreur est survenue. Cette pièce est probablement déjà dans le devis.")
            }
        }
    }
    return (

        <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
            <div className="col-sm-12">Le prix est automatiquement ajouté selon ce qui est renseigné sur le produit.</div>
            <div className="col-sm-8">
                <SelectLabel change={handleChange} value={ligneDevis.piece_id} label="Pièce utilisé" options={piece}
                             name="piece_id" defaultOption={true} sentenceOption="Veuillez choisir une pièce"/>
            </div>
            <div className="col-sm-2">
                <InputLabel label="Quantité" value={ligneDevis.qte} change={handleChange} type="number"
                            name="qte" placeholder="Quantité"/>
            </div>
            <button className="col-sm-2 btn-primary btn">Ajouter</button>
        </form>
    );
}

export default AddLigneDevis;