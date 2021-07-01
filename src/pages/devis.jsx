import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {getAllDevis, getLigneDevis} from "../api/devis";
import DevisEl from "../components/devis/devisEl";

function Devis(props) {
    const [devis,setDevis] = useState([])


    useEffect(async()=>{
        try{
            const devisApi = await getAllDevis()
            for(let i =0;i < devisApi.length; i++){
                const ligneDevis = await getLigneDevis(devisApi[i].iddevis)
                let montant = 0
                ligneDevis.map((dataLigne)=>{
                    montant = montant + (dataLigne.prix*dataLigne.qte)
                })
                let status = 'En cours de completion'
                if(devisApi[i].status == 2){
                    status = 'Terminer'
                }
                devisApi[i].montant_tot = montant
                devisApi[i].status = status
            }
            setDevis(devisApi)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])
    return (
        <div className="container">
            <h2>Liste des devis</h2>
            <Link to="/add_devis" className="btn btn-primary">Ajouter un devis</Link>
            <table className="table">
                <thead>
                <th>Client</th>
                <th>Montant</th>
                <th>Date du devis</th>
                <th>Date limite</th>
                <th>Status</th>
                <th></th>
                </thead>
                <tbody>
                {devis.map((data,key)=>{
                    return <DevisEl data={data} key={key}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Devis;