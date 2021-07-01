import React, {useEffect, useState} from 'react';
import {getLigneAchat} from "../../api/achat";
import {toast} from "react-toastify";
import {getLigneDevis} from "../../api/devis";

function LigneDevisInfo(props) {
    const [ligneDevis, setLigneDevis] = useState([])
    useEffect(async()=>{
        try{
            setLigneDevis(await getLigneDevis(props.id))
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[props.change])

    return (
        <table className="table">
            <thead>
            <th>Piece</th>
            <th>quantité</th>
            <th>prix</th>
            <th>Commande</th>
            </thead>
            <tbody>
            {ligneDevis.map((data,index)=>{
                return(
                    <tr key={index}>
                        <td>{data.lib_piece}</td>
                        <td>{data.qte}</td>
                        <td>{data.prix}</td>
                        <td>{data.commande_id}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default LigneDevisInfo;