import React, { useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {addUser} from "../api/user";

function AddUser(props) {
    const [login, setLogin] = useState({firstname:'',lastname:'', email: '', pwd: '' })

    const handleChange = (event) => {
        formHandleChange(event,login,setLogin)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        if(login.email === '' || login.pwd === '' || login.firstname === '' || login.lastname === ''){
            toast.warn("Veuillez saisir tout les éléments.")
            return
        }
        try{
            const data = {
                email : login.email,
                pwd: login.pwd,
                firstname: login.firstname,
                lastname: login.lastname
            }
            await addUser(data)
            props.history.push("/utilisateur")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu.")
        }
    }


    return (
        <div className="container">
            <h2>Ajouter un utilisateur</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel name="email" value={login.email} change={handleChange} type="Email" label="Email" placeholder="adresse email"/>
                <InputLabel name="firstname" value={login.firstname} change={handleChange} type="text" label="Nom" placeholder="Nom"/>
                <InputLabel name="lastname" value={login.lastname} change={handleChange} type="text" label="Prenom" placeholder="Prénom"/>
                <InputLabel name="pwd" value={login.pwd} change={handleChange} type="password" label="Mot de passe" placeholder="Mot de passe"/>
                <button className="btn btn-primary mb-3">Ajouter</button>
            </form>
        </div>
    );
}

export default AddUser;