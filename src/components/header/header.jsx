import React, {useContext} from 'react'
import {AuthContext} from '../../App'
import {getRoles} from '../../services/authService'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import MenuLi from './menuLi';


export default function Header() {

    const menu = []

    const context = useContext(AuthContext)

    if(context.isConnected){
        const roles = getRoles()
        let ouvrier = false
        let compta = false
        roles.forEach(role => {
            if(role.label_right === "Admin"){
                menu.push({nom:"Utilisateur",url: "/utilisateur"})
            }
            if((role.label_right === "Ouvrier" || role.label_right === "Admin") && !ouvrier){
                menu.push({nom:"gestion des espaces de travails",url:'/espace'})
                ouvrier = true
            }
            if((role.label_right === "Gestion" || role.label_right === "Admin") && !compta){
                menu.push({nom:"Comptabilité",url:'/'})
                compta = true
            }
        });
        menu.push({nom : "Logout", url: "/logout"})
       
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Accueil</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav mr-auto">
                    {menu.map((linkData,index) => <MenuLi key={index} nom={linkData.nom} url={linkData.url} />)}
                </ul>
            </div>
            
        </nav>
    )
}
