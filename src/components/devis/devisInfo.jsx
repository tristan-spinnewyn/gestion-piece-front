import React, {useEffect, useState} from 'react';
import {getDevis, getLigneDevis, terminateDevis} from "../../api/devis";
import {toast} from "react-toastify";

function DevisInfo(props) {
    const [devis,setDevis] = useState({})
    const [montant,setMontant] = useState(0)

    useEffect(async()=>{
        try{
            const achatApi = await getDevis(props.id)
            setDevis(achatApi)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }

    },[])

    useEffect(async()=>{
        try{
            const ligneDevis = await getLigneDevis(props.id)
            let montant = 0
            ligneDevis.map((dataLigne)=>{
                montant = montant + (dataLigne.prix*dataLigne.qte)
            })
            setMontant(montant)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[props.change])

    const handleTerminateDevis = async()=>{
        try{
            if(window.confirm("Attention, une fois le devis terminer, il ne sera plus possible de le modifier. Voulez vous confirmer ?")){
                await terminateDevis(props.id)
                document.location.href = '/devis'
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
                <th>Date du devis</th>
                <th>Date limite</th>
                <th>Status</th>
                <th></th>
                </thead>
                <tbody>
                <tr>
                    <td>{devis.name_cli}</td>
                    <td>{montant}</td>
                    <td>{(new Date(devis.date_devis).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
                    <td>{(new Date(devis.date_limite).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'}))}</td>
                    <td>{devis.status == 1 ? 'En cours' : 'terminer'}</td>
                    <td className={devis.status == 1 ? '': 'none'}>
                        <button onClick={async ()=>{handleTerminateDevis()}} className="btn btn-primary">Terminer</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DevisInfo;