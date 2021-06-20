import React, {useEffect, useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import SelectLabel from "../components/form/selectLabel";
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {addUser, getRights, getUser, updateUser} from "../api/user";
import RightTab from "../components/user/rightTab";

function UpdateUser(props) {
    const [login, setLogin] = useState({firstname:'',lastname:'', email: '', pwd: '',id:''})


    useEffect( async() => {
        try{
            const user = await getUser(props.id)
            setLogin({firstname: user.firstname, lastname: user.lastname, email: user.email, id:user.id,pwd:''})
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);


    const handleChange = (event) => {
        formHandleChange(event,login,setLogin)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        if(login.email === ''  || login.firstname === '' || login.lastname === ''){
            toast.warn("Veuillez saisir tout les éléments.")
            return
        }
        try{
            const data = {
                email : login.email,
                pwd: login.pwd,
                firstname: login.firstname,
                lastname: login.lastname,
                id:login.id
            }

            await updateUser(data)

            toast.success("L'utilisateur a bien été mis à jour.")

        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu.")
        }
    }



    return (
        <div className="container">
            <h2>Modifier un utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel name="email" value={login.email} change={handleChange} type="Email" label="Email" placeholder="adresse email"/>
                <InputLabel name="firstname" value={login.firstname} change={handleChange} type="text" label="Nom" placeholder="Nom"/>
                <InputLabel name="lastname" value={login.lastname} change={handleChange} type="text" label="Prenom" placeholder="Prénom"/>
                <InputLabel name="pwd" value={login.pwd} change={handleChange} type="password" label="Mot de passe" placeholder="Mot de passe"/>
                <button className="btn btn-primary mb-3">Modifier</button>
            </form>
            <RightTab id={props.id}/>
        </div>
    );
}

export default UpdateUser;