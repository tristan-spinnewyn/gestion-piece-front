import React, {useEffect, useState} from 'react';
import InputLabel from "../form/inputLabel";
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";
import {getOuvrier} from "../../api/user";
import {getGammeByPiece, updateGamme} from "../../api/piece";
import {toast} from "react-toastify";

function GammePiece(props) {
    const [gamme, setGamme] = useState({lib_gamme:'',user_id:'',id:''});
    const [user, setUser] = useState([]);

    const handleChange = (event)=>{
        formHandleChange(event,gamme,setGamme)
    }

    useEffect(async () => {
        const usersData = await getOuvrier()
        const arrayUsers = []
        usersData.map((user,index)=>{
            arrayUsers.push({id:user.id,name:`${user.firstname} ${user.lastname}`})
        })
        setUser(arrayUsers)

            try{
                setGamme(await getGammeByPiece(props.id))
            }catch (e) {
                console.log(e)
                if(props.type_id == 2 || props.type_id == 3){
                    toast.error("une erreur est survenu.")
                }

            }

    }, []);

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(gamme.user_id === '' || gamme.lib_gamme === ''){
                toast.warn("Veuillez remplir les champs correspondant à la gamme.")
                return
            }
            await updateGamme(gamme)
            toast.success("La gamme a bien été mise a jour !")
        }catch (e) {
            toast.error("une erreur est survenu.")
            console.log(e)
        }
    }

    return (
        <>
            <h3>Gamme</h3>
            <form onSubmit={handleSubmit}>
                <InputLabel label="Nom de la gamme" value={gamme.lib_gamme} change={handleChange} type="text" name="lib_gamme" placeholder="Nom de la gamme"/>
                <SelectLabel label="Responsable de gamme" value={gamme.user_id} defaultOption={true} sentenceOption="Veuillez choisir un responsable" options={user} name="user_id" change={handleChange}/>
                <button className="btn btn-primary">Modifier la gamme</button>
            </form>
        </>

    )
}

export default GammePiece;