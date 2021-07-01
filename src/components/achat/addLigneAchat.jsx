import React, {useEffect, useState} from 'react';
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";
import InputLabel from "../form/inputLabel";
import {toast} from "react-toastify";
import {addLigne, getAchat, getMatPremFournisseur, getPieceFournisseur} from "../../api/achat";

function AddLigneAchat(props) {
    const [ligneAchat, setLigneAchat] = useState({
        piece_id: null,
        mat_prem_id: null,
        quantite: 0,
        achat_id: props.id,
        prix: null
    })
    const [type, setType] = useState({type: 1})
    const [matPrem, setMatPrem] = useState([])
    const [piece, setPiece] = useState([])
    const [displayPiece, setDisplayPiece] = useState(true)

    useEffect(async () => {
        try {
            const achatApi = await getAchat(props.id)
            console.log(achatApi)
            const pieceApi = await getPieceFournisseur(achatApi.fournisseur_id)
            const arrayPiece = []
            pieceApi.map((data, index) => {
                arrayPiece.push({id: data.id, name: `${data.lib_piece} (${data.prix_achat}€)`})
            })
            setPiece(arrayPiece)

            const matApi = await getMatPremFournisseur(achatApi.fournisseur_id)
            const arrayMat = []
            matApi.map((data, index) => {
                arrayMat.push({id: data.id, name: `${data.lib_mat} (${data.prix_achat}€)`})
            })
            setMatPrem(arrayMat)
        } catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, [])

    useEffect(() => {
        setLigneAchat({piece_id: null, mat_prem_id: null, quantite: 0, achat_id: props.id, prix: null})
        if (type.type == 1) {
            setDisplayPiece(true)
        }
        if (type.type == 2) {
            setDisplayPiece(false)
        }
    }, [type])

    const handleChange = (event) => {
        formHandleChange(event, ligneAchat, setLigneAchat)
    }

    const handleChangeDisplay = (event) => {
        formHandleChange(event, type, setType)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(type.type == 1){
                if(ligneAchat.piece_id === null){
                    toast.warn("Veuillez selectionner une pièce.")
                    return
                }
            }
            else{
                if(ligneAchat.mat_prem_id === null){
                    toast.warn("Veuillez selectionner une matière premiere")
                    return
                }
            }
            if(ligneAchat.quantite === 0){
                toast.warn("Veuillez saisir une quantité.")
                return
            }
             await addLigne(ligneAchat)
            toast.success("Le produit acheté a bien été inséré.")
            props.setChange(props.change +1)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }
    return (

        <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
            <div className="col-sm-12">Le prix est automatiquement ajouté selon ce qui est renseigné sur le produit.</div>
            <div className="col-sm-4">
                <SelectLabel change={handleChangeDisplay} value={type.type} label="Pièce ou matière première"
                             options={[{id: 1, name: 'Pièce'}, {id: 2, name: 'Matière première'}]} name="type"
                             defaultOption={false}/>
            </div>
            <div className={displayPiece ? 'col-sm-4' : 'none'}>
                <SelectLabel change={handleChange} value={ligneAchat.piece_id} label="Pièce utilisé" options={piece}
                             name="piece_id" defaultOption={true} sentenceOption="Veuillez choisir une pièce"/>
            </div>
            <div className={displayPiece ? 'none' : 'col-sm-4'}>
                <SelectLabel change={handleChange} value={ligneAchat.mat_prem_id} label="Matière première utilisé"
                             options={matPrem} name="mat_prem_id" defaultOption={true}
                             sentenceOption="Veuillez choisir une matière première"/>
            </div>
            <div className="col-sm-2">
                <InputLabel label="Quantité" value={ligneAchat.quantite} change={handleChange} type="number"
                            name="quantite" placeholder="Quantité"/>
            </div>
            <button className="col-sm-2 btn-primary btn">Ajouter</button>
        </form>
    );
}

export default AddLigneAchat;