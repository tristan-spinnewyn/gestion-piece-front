import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getAllAchat} from "../api/achat";
import AchatEl from "../components/achat/achatEl";
import {Link} from "react-router-dom";

function Achat(props) {
    const [achats,setAchats] = useState([])
    useEffect(async()=>{
        try{
            setAchats(await getAllAchat())
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])
    return (
        <div className="container">
            <h2>Liste des achats</h2>
            <Link to="/add_achat" className="btn btn-primary">Ajouter une commande fournisseur</Link>
            <table className="table">
                <thead>
                <th>Fournisseur</th>
                <th>Montant</th>
                <th>Date d'achat</th>
                <th>Date de livraison prévu</th>
                <th>Date de livraison réel</th>
                <th></th>
                </thead>
                <tbody>
                {achats.map((data,key)=>{
                    return <AchatEl data={data} key={key}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Achat;