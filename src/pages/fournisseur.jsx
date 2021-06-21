import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import FournisseurEl from "../components/fournisseur/fournisseurEl";
import {toast} from "react-toastify";
import {getAllFournisseur} from "../api/founisseur";

function Fournisseur(props) {

    const [fournisseurs, setFournisseurs] = useState([]);

    useEffect(async () => {
        try{
            const data = await getAllFournisseur()
            setFournisseurs(data)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);


    return (
        <div className="container">
            <h2>Liste des fournisseurs</h2>
            <Link to="/add_fournisseur" className="btn btn-primary">Ajouter un fournisseur</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nom du fournisseur</th>
                    <th scope="col">Adresse</th>
                    <th scope="col">Email</th>
                    <th scope="tel">Téléphone</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {fournisseurs.map((data,index)=>{
                    return <FournisseurEl data={data} key={index} />
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Fournisseur;