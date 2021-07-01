import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import FournisseurEl from "../components/fournisseur/fournisseurEl";
import {toast} from "react-toastify";
import {getAllClient} from "../api/client";
import ClientEl from "../components/client/clientEl";

function Client(props) {

    const [clients, setClients] = useState([]);

    useEffect(async () => {
        try{
            const data = await getAllClient()
            setClients(data)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);


    return (
        <div className="container">
            <h2>Liste des clients</h2>
            <Link to="/add_client" className="btn btn-primary">Ajouter un client</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nom du client</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Ville</th>
                    <th scope="col">Code postal</th>
                    <th scope="col">Email</th>
                    <th scope="tel">Téléphone</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {clients.map((data,index)=>{
                    return <ClientEl data={data} key={index} />
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Client;