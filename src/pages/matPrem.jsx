import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {getAllMat} from "../api/mat_premapi";
import MatPremEl from "../components/matprem/matPremEl";

function MatPrem(props) {
    const [mat_prems,setMatPrems] = useState([])

    useEffect(async()=>{
        try{
            setMatPrems(await getAllMat())
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])
    return (
        <div className="container">
            <Link to="/add_mat_prem" className="btn btn-primary">Ajouter une matière première</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">prix d'achat</th>
                    <th>Quantite</th>
                    <th scope="col">action</th>
                </tr>
                </thead>
                <tbody>
                {mat_prems.map((data,index)=>{
                    return <MatPremEl data={data} key={index} />
                })}
                </tbody>
            </table>
        </div>
    )
}

export default MatPrem;