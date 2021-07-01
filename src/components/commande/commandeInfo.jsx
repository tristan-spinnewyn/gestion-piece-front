import React, {useEffect, useState} from 'react';
import { terminateDevis} from "../../api/devis";
import {toast} from "react-toastify";
import {getCommande, getLigneCommande, terminateCommande} from "../../api/commande";

function CommandeInfo(props) {
    const [commande,setCommande] = useState({})
    const [montant,setMontant] = useState(0)

    useEffect(async()=>{
        try{
            const commandeApi = await getCommande(props.id)
            setCommande(commandeApi)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    },[])

    useEffect(async()=>{
        try{
            const ligneCommande = await getLigneCommande(props.id)
            let montant = 0
            ligneCommande.map((dataLigne)=>{
                montant = montant + (dataLigne.prix*dataLigne.qte)
            })
            setMontant(montant)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[props.change])

    const handleTerminateCommande = async()=>{
        try{
            if(window.confirm("Attention, une fois la commande terminer, il ne sera plus possible de la modifier. Voulez vous confirmer ?")){
                await terminateCommande(props.id)
                document.location.href = '/commande'
            }
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue")
        }
    }

    return (
        <div>
            <h2>Information du devis</h2>
            <table className="table">
                <thead>
                <th>Client</th>
                <th>Montant</th>
                <th>Date de ma commande</th>
                <th>Status</th>
                <th></th>
                </thead>
                <tbody>
                <tr>
                    <td>{commande.name_cli}</td>
                    <td>{montant}</td>
                    <td>{(new Date(commande.date_commande).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
                    <td>{commande.status == 1 ? 'En cours' : 'terminer'}</td>
                    <td className={commande.status == 1 ? '': 'none'}>
                        <button onClick={async ()=>{handleTerminateCommande()}} className="btn btn-primary">Terminer</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CommandeInfo;