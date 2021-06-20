import React, {useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {addUser} from "../api/user";
import {insertPlan} from "../api/plan_travail";

function AddPlanTravail(props) {
    const [planTravail, setPlanTravail] = useState({label_travail:''});

    const handleChange = (event)=>{
        formHandleChange(event,planTravail,setPlanTravail)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault()
        if(planTravail.label_travail === ''){
            toast.warn("Veuillez saisir tout les éléments.")
            return
        }
        try{
            const data = {
                label_travail : planTravail.label_travail
            }
            await insertPlan(data)
            props.history.push("/plan_travail")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu.")
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <InputLabel name="label_travail" value={planTravail.label_travail} change={handleChange} type="text" label="Label plan de travail" placeholder="Label plan de travail"/>
                <button className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}

export default AddPlanTravail;