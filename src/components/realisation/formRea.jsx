import React, {useEffect, useState} from 'react';
import {formHandleChange} from "../../services/formService";
import {toast} from "react-toastify";
import {getGammes} from "../../api/operation";
import SelectLabel from "../form/selectLabel";
import InputLabel from "../form/inputLabel";
import {addRealisation} from "../../api/realisation";

function FormRea(props) {
    const [realisation,setRealisation] = useState({gamme_id:null,date_rea:''})
    const [gamme,setGamme] = useState([])

    useEffect(async()=>{
        try{
            const gammedate = await getGammes()
            const gammeArray = []
            gammedate.map((data,index)=>{
                gammeArray.push({id:data.idgamme,name: `gamme de ${data.lib_piece}`})
            })
            setGamme(gammeArray)
        }catch (e) {
            console.log(e)
            toast.erro("Une erreur est survenue.")
        }
    },[])
    const handleChange = (event)=>{
        formHandleChange(event,realisation,setRealisation)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(realisation.gamme_id === null || realisation.date_rea === ''){
            toast.warn("Veuillez remplir tout les champs")
            return
        }
        try{
            await addRealisation(realisation)
            props.setChange(props.change +1)
            toast.success("La réalisation est bien inséré !")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
            <div className="col-sm-6">
                <SelectLabel change={handleChange} value={realisation.gamme_id} label="Gamme" defaultOption={true} sentenceOption="Veuillez choisir une gamme" options={gamme} name="gamme_id"/>
            </div>
            <div className="col-sm-4">
                <InputLabel label="Date de réalisation" value={realisation.date_rea} change={handleChange} type="date" name="date_rea"/>
            </div>
            <div className="col-sm-2">
                <button className="btn btn-primary">Ajouter une réalisation</button>
            </div>
        </form>
    );
}

export default FormRea;