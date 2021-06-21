import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {getAll} from "../api/plan_travail";
import PlanTravailEl from "../components/plan_travail/planTravailEl";

function PlanTravail(props) {
    const [planTravails, setPlanTravail] = useState([]);

    useEffect(async () => {
        try{
            const result = await getAll()
            setPlanTravail(result)
        }catch (e){
            toast.error("Une erreur est survenu.")
        }
    }, []);

    return (
        <div className="container">
            <Link to="/add_plan" className="btn btn-primary">Ajouter un poste de travail</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {planTravails.map((data,index)=>{
                    return <PlanTravailEl data={data} key={index} />
                })}
                </tbody>
            </table>
        </div>
    )
}

export default PlanTravail;