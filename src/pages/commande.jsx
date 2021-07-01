import React, {useEffect, useState} from 'react';
import {getAllDevis, getLigneDevis} from "../api/devis";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {getAllCommande, getCommande, getLigneCommande} from "../api/commande";
import CommandeEl from "../components/commande/commandeEl";

function Commande(props) {
    const [commande,setCommande] = useState([])


    useEffect(async()=>{
        try{
            const commandeApi = await getAllCommande()
            for(let i =0;i < commandeApi.length; i++){
                const ligneCommande = await getLigneCommande(commandeApi[i].idcommande)
                let montant = 0
                ligneCommande.map((dataLigne)=>{
                    montant = montant + (dataLigne.prix*dataLigne.qte)
                })
                let status = 'En cours de completion'
                if(commandeApi[i].status == 2){
                    status = 'Terminer'
                }
                commandeApi[i].montant_tot = montant
                commandeApi[i].status = status
            }
            setCommande(commandeApi)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])
    return (
        <div className="container">
            <h2>Liste des commande</h2>
            <Link to="/add_commande" className="btn btn-primary">Ajouter une commande</Link>
            <table className="table">
                <thead>
                <th>Client</th>
                <th>Montant</th>
                <th>Date de ma commande</th>
                <th>Status</th>
                <th></th>
                </thead>
                <tbody>
                {commande.map((data,key)=>{
                    return <CommandeEl data={data} key={key}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Commande;