import React, {useEffect, useState} from 'react';
import SelectLabel from "../components/form/selectLabel";
import {toast} from "react-toastify";
import {addPiece, getAllType} from "../api/piece";
import {formHandleChange} from "../services/formService";
import {getOuvrier} from "../api/user";
import InputLabel from "../components/form/inputLabel";
import {getAllFournisseur} from "../api/founisseur";

function AddPiece(props) {
    const [piece, setPiece] = useState({type_id:'',prix_achat:0,prix_vente:0,lib_piece:'',fournisseur_id:null,lib_gamme:'',user_id:'',quantite:0});
    const [type_piece, setType_piece] = useState([]);
    const [user, setUser] = useState([]);
    const [fournisseur, setFournisseur] = useState([]);
    const [displayAchat, setDisplayAchat] = useState(false);
    const [displayVente, setDisplayVente] = useState(false);
    const [displayGamme, setDisplayGamme] = useState(false);

    useEffect(async () => {
        try{
            const type = await getAllType()
            const arrayType =[]
            type.map((aType,index)=>{
                arrayType.push({id:aType.id,name:aType.label_type})
            })
            setType_piece(arrayType)
            const usersData = await getOuvrier()
            const arrayUsers = []
            usersData.map((user,index)=>{
                arrayUsers.push({id:user.id,name:`${user.firstname} ${user.lastname}`})
            })
            setUser(arrayUsers)

            const fournisseurData = await getAllFournisseur()
            const arrayFournisseur = []
            fournisseurData.map((fournisseur,index)=>{
                arrayFournisseur.push({id:fournisseur.id,name:fournisseur.name_fournisseur})
            })
            setFournisseur(arrayFournisseur)

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
        if(piece.type_id ==2 || piece.type_id == 3){
            if(piece.user_id === '' || piece.lib_gamme === ''){
                toast.warn("Veuillez saisir tout les éléments")
                return
            }
        }
        try{
            await addPiece(piece)
            props.history.push("/piece")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }


    useEffect(() => {
        setPiece({type_id:piece.type_id,prix_achat:0,prix_vente:0,lib_piece:piece.lib_piece,fournisseur_id:null,lib_gamme:'',user_id:'',quantite:piece.quantite})
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
            <h2>Ajouter une pièce</h2>
            <form onSubmit={handleSubmit}>
                <SelectLabel label="Type de pièce" value={piece.type_id} defaultOption={true} sentenceOption="Veuillez choisir un type" options={type_piece} name="type_id" change={handleChange} />
                <InputLabel label="Nom de la piece" change={handleChange} type="text" name="lib_piece" value={piece.lib_piece} placeholder="Nom de la piece" />
                <InputLabel label="Quantité initial" change={handleChange} type="number" name="quantite" value={piece.quantite} placeholder="Quantité initial" />
                <div className={displayAchat ? '' : 'none'}>
                    <InputLabel label="prix d'achat" change={handleChange} type="number" value={piece.prix_achat} name="prix_achat" placeholder="Prix d'achat"/>
                    <SelectLabel label="Fournisseur" value={piece.fournisseur_id} defaultOption={true} sentenceOption="Veuillez choisir un fournisseur" options={fournisseur} name="fournisseur_id" change={handleChange}/>
                </div>
                <div className={displayVente ? '' : 'none'}>
                    <InputLabel  label="prix de vente" change={handleChange} type="number" value={piece.prix_vente} name="prix_vente" placeholder="Prix de vente"/>
                </div>
                <div className={displayGamme ? '' : 'none'}>
                    <h3>Information concernant la gamme</h3>
                    <InputLabel label="Nom de la gamme" value={piece.lib_gamme} change={handleChange} type="text" name="lib_gamme" placeholder="Nom de la gamme"/>
                    <SelectLabel label="Responsable de gamme" value={piece.user_id} defaultOption={true} sentenceOption="Veuillez choisir un responsable" options={user} name="user_id" change={handleChange}/>
                </div>
                <button className="btn btn-primary">Ajouter la pièce</button>
            </form>
        </div>
    )
}

export default AddPiece;