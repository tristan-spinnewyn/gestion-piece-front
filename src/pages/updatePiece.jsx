import React, {useEffect, useState} from 'react';
import {addPiece, getPiece, updatePiece} from "../api/piece";
import {getAllFournisseur} from "../api/founisseur";
import {toast} from "react-toastify";
import {formHandleChange} from "../services/formService";
import SelectLabel from "../components/form/selectLabel";
import InputLabel from "../components/form/inputLabel";
import GammePiece from "../components/piece/gammePiece";

function UpdatePiece(props) {
    const [piece, setPiece] = useState({type_id:'',prix_achat:0,prix_vente:0,lib_piece:'',fournisseur_id:null,quantite:0,id:''});
    const [fournisseur, setFournisseur] = useState([]);
    const [displayAchat, setDisplayAchat] = useState(false);
    const [displayVente, setDisplayVente] = useState(false);
    const [displayGamme, setDisplayGamme] = useState(false);

    useEffect(async () => {
        try{
            const fournisseurData = await getAllFournisseur()
            const arrayFournisseur = []
            fournisseurData.map((fournisseur,index)=>{
                arrayFournisseur.push({id:fournisseur.id,name:fournisseur.name_fournisseur})
            })
            setFournisseur(arrayFournisseur)

            setPiece(await getPiece(props.id))

        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);

    const handleChange = (event)=>{
        formHandleChange(event,piece,setPiece)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(piece.lib_piece === '' || piece.type_id === ''){
            toast.warn("Veuillez saisir tout les éléments")
            return
        }
        if(piece.type_id == 1){
            if(piece.prix_achat == 0 || piece.fournisseur_id == null){
                toast.warn("Veuillez saisir tout les éléments")
                return
            }
        }
        if(piece.type_id == 3){
            if(piece.prix_vente == 0){
                toast.warn("Veuillez saisir tout les éléments")
                return
            }
        }
        try{
            await updatePiece(piece)
            toast.success("La pièce a bien été mise a jour.")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }


    useEffect(() => {
        setDisplayVente(false)
        setDisplayGamme(false)
        setDisplayAchat(false)
        if(piece.type_id == 1){
            setDisplayAchat(true)
        }else if(piece.type_id == 3){
            setDisplayVente(true)
        }
        if(piece.type_id ==2 || piece.type_id == 3){
            setDisplayGamme(true)
        }

    }, [piece.type_id]);
    return (
        <div className="container">
            <div className={displayGamme ? '' : 'none'}>
                <GammePiece id={props.id} type_id={piece.type_id}/>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Info concernant la pièce</h3>
                <InputLabel label="Nom de la piece" change={handleChange} type="text" name="lib_piece" value={piece.lib_piece} placeholder="Nom de la piece" />
                <InputLabel label="Quantité" change={handleChange} type="number" name="quantite" value={piece.quantite} placeholder="Quantité" />
                <div className={displayAchat ? '' : 'none'}>
                    <InputLabel label="prix d'achat" change={handleChange} type="number" value={piece.prix_achat} name="prix_achat" placeholder="Prix d'achat"/>
                    <SelectLabel label="Fournisseur" value={piece.fournisseur_id} defaultOption={true} sentenceOption="Veuillez choisir un fournisseur" options={fournisseur} name="fournisseur_id" change={handleChange}/>
                </div>
                <div className={displayVente ? '' : 'none'}>
                    <InputLabel  label="prix de vente" change={handleChange} type="number" value={piece.prix_vente} name="prix_vente" placeholder="Prix de vente"/>
                </div>

                <button className="btn btn-primary">Modifier la pièce</button>
            </form>
        </div>
    );
}

export default UpdatePiece;