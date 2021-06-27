import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getGamme} from "../../api/operation";

function InfoGamme(props) {

    const [gamme,setGammes] = useState({})
    useEffect(async ()=>{
        try{
            setGammes(await getGamme(props.id))
            console.log(gamme)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])
    return (
        <table className="table">
            <thead>
            <th>Pièce lié</th>
            <th>Réponsable</th>
            </thead>
            <tbody>
            <td>{gamme.lib_piece}</td>
            <td>{gamme.email}</td>
            </tbody>
        </table>
    );
}

export default InfoGamme;