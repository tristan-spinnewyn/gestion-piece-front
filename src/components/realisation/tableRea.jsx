import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {getAllRealisation} from "../../api/realisation";
import {Link} from "react-router-dom";

function TableRea(props) {
    const [realisation,setRealisation] = useState([])
    useEffect(async()=>{
        try{
            setRealisation(await getAllRealisation())
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[props.change])
    return (
        <table className="table">
            <thead>
            <th>Id</th>
            <th>Gamme</th>
            <th>Date</th>
            <th>Action</th>
            </thead>
            <tbody>
            {realisation.map((data,index)=>{
                const date = new Date(data.date_rea)
                return(
                    <tr key={index}>
                        <td>{data.reaid}</td>
                        <td>Gamme de {data.lib_piece}</td>
                        <td>{date.toLocaleString('fr-FR',{year: 'numeric', month: 'numeric', day: 'numeric' })}</td>
                        <td><Link to={`/realisation/${data.reaid}`} className="btn btn-primary">Modifier</Link></td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default TableRea;