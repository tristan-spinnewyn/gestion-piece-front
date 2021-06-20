import React, { useState,useContext } from 'react'
import InputLabel from '../components/form/inputLabel'
import {formHandleChange} from '../services/formService'
import {setUserLocalStorage} from '../services/authService'
import { AuthContext } from '../App'
import { loginApi } from '../api/user'
import { toast } from 'react-toastify'

export default function Login(props) {
    const [login, setLogin] = useState({ email: '', pwd: '' })
    const context = useContext(AuthContext)



    const handleChange = (event) => {
        formHandleChange(event,login,setLogin)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try{
            const data = await loginApi(login.email,login.pwd)
            setUserLocalStorage(data)
            context.setConnected(true)
            document.location.href = '/'
        }catch(e){
            context.setConnected(false)
            if(e == "Error: Request failed with status code 401"){
                toast.error("Login ou mot de passe incorrect.")
            }else{
                toast.error("Une erreur est survenu.")
            }
        }        
    }

    return (
        <div className="container">
            <h1>Connexion</h1>
            <div className="row align-items-start">
                <div className="col align-items-center">
                    <p>Pour utiliser cette application, vous devez être connecter.</p> 
                    <p>Si vous n'avez pas vos identifiants ou si vous avez oublié vos accés, veuillez contacter le service informatique.</p>
                </div>
                <div className="col">
                    <form onSubmit={handleSubmit}>
                        <InputLabel name="email" value={login.email} change={handleChange} type="Email" label="Email" placeholder="votre adresse email" />
                        <InputLabel name="pwd" value={login.pwd} change={handleChange} type="password" label="Mot de passe" placeholder="votre mot de passe" />
                        <button className="btn btn-primary mb-3">Connexion</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
