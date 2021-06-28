import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getAllMat} from "../../api/mat_premapi";
import {addCompo, getPieceCompo} from "../../api/composition";
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";
import InputLabel from "../form/inputLabel";

function CompositionForm(props) {
    const [matPremieres,setMatPremiers] = useState([])
    const [pieceInterm,setPieceInterm] = useState([])
    const [composition,setComposition] = useState({piece_maitre:props.id,piece_composite: null,mat_composite:null,quantite:0})
    const [type,setType] = useState({type:1})
    const [displayPiece,setDisplayPiece] = useState(true)

    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            if(type.type == 1){
                if(composition.piece_composite === null){
                    toast.warn("Veuillez selectionner une pièce.")
                    return
                }
            }
            else{
                if(composition.mat_composite === null){
                    toast.warn("Veuillez selectionner une matière premiere")
                    return
                }
            }
            if(composition.quantite === 0){
                toast.warn("Veuillez saisir une quantité.")
                return
            }

            await addCompo(composition)
            toast.success("La composition est bien inséré.")

            props.setChange(props.change +1)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    }

    useEffect(async()=>{
        try{
            const matPremData = await getAllMat()
            const arrayMat = []
            matPremData.map((data,index)=>{
                arrayMat.push({id:data.id,name:data.lib_mat})
            })
            setMatPremiers(arrayMat)
            const pieceData = await getPieceCompo()
            const arrayPiece = []
            pieceData.map((data,index)=>{
                arrayPiece.push({id:data.id,name:data.lib_piece})
            })
            setPieceInterm(arrayPiece)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue")
        }
    },[])

    const handleChange = (event)=>{
        formHandleChange(event,composition,setComposition)
    }

    const handleChangeDisplay = (event)=>{
        formHandleChange(event,type,setType)
    }

    useEffect(()=>{
        setComposition({piece_maitre:props.id,piece_composite: null,mat_composite:null,quantite:0})
        if(type.type == 1){
            setDisplayPiece(true)
        }
        if (type.type == 2){
            setDisplayPiece(false)
        }
        console.log(type)
        console.log(displayPiece)
    },[type])
    return (
        <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
            <div className="col-sm-4">
                <SelectLabel change={handleChangeDisplay} value={type.type} label="Pièce ou matière première" options={[{id:1,name:'Pièce'},{id:2,name:'Matière première'}]} name="type" defaultOption={false}/>
            </div>
            <div className={displayPiece ? 'col-sm-4' : 'none'}>
                <SelectLabel change={handleChange} value={composition.piece_composite} label="Pièce utilisé" options={pieceInterm} name="piece_composite" defaultOption={true} sentenceOption="Veuillez choisir une pièce"/>
            </div>
            <div className={displayPiece ? 'none' : 'col-sm-4'}>
                <SelectLabel change={handleChange} value={composition.mat_composite} label="Matière première utilisé" options={matPremieres} name="mat_composite" defaultOption={true} sentenceOption="Veuillez choisir une matière première"/>
            </div>
            <div className="col-sm-2">
                <InputLabel label="Quantité" value={composition.quantite} change={handleChange} type="number" name="quantite" placeholder="Quantité"/>
            </div>
            <button className="col-sm-2 btn-primary btn">Ajouter</button>
        </form>
    );
}

export default CompositionForm;