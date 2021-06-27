import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {getAllOperation} from "../api/operation";
import OperationEl from "../components/operation/operationEl";

function Operation(props) {
    const [operations, setOperations] = useState([]);

    useEffect(async() => {
        try{
            setOperations(await getAllOperation())
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);


    return (
        <div className="container">
            <h2>Liste des opérations</h2>
            <Link to="/add_operation" className="btn btn-primary">Ajouter une opération</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nom de la machine</th>
                    <th scope="col">Nom du poste</th>
                    <th scope="col">Durée</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {operations.map((data,index)=>{
                    return <OperationEl data={data} key={index}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Operation;