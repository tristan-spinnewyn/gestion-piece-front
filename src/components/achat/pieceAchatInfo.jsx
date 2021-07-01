import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getLigneAchat} from "../../api/achat";

function PieceAchatInfo(props) {
    const [ligneAchats, setLignesAchats] = useState([])
    useEffect(async()=>{
        try{
            setLignesAchats(await getLigneAchat(props.id))
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[props.change])

    return (
        <table className="table">
            <thead>
            <th>Piece/matière première</th>
            <th>quantité</th>
            <th>prix</th>
            </thead>
            <tbody>
            {ligneAchats.map((data,index)=>{
                let name = ''
                if(data.lib_piece != null){
                    name = data.lib_piece
                }else{
                    name = data.lib_mat
                }
                return(
                    <tr key={index}>
                        <td>{name}</td>
                        <td>{data.quantiteachat}</td>
                        <td>{data.prixachat}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PieceAchatInfo;