import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getLigneCommande} from "../../api/commande";

function LigneCommandeInfo(props) {
    const [ligneCommande, setLigneCommande] = useState([])
    useEffect(async()=>{
        try{
            setLigneCommande(await getLigneCommande(props.id))
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
            </thead>
            <tbody>
            {ligneCommande.map((data,index)=>{
                return(
                    <tr key={index}>
                        <td>{data.lib_piece}</td>
                        <td>{data.qte}</td>
                        <td>{data.prix}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default LigneCommandeInfo;