import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getRealisation} from "../../api/realisation";

function InfoRealisation(props) {
    const [realisation,setRealisation] = useState({})
    useEffect(async ()=>{
        try{
            setRealisation(await getRealisation(props.id))
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])
    return (
        <div>
            <table className="table">
                <thead>
                <th>gamme lié</th>
                <th>date</th>
                </thead>
                <tbody>
                <td>{realisation.lib_piece}</td>
                <td>{(new Date(realisation.date_rea)).toLocaleString('fr-FR', {year: 'numeric', month: 'numeric', day: 'numeric'})}</td>
                </tbody>
            </table>
        </div>
    )
}

export default InfoRealisation;