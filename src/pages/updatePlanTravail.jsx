import React, {useEffect, useState} from 'react';
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {getPlan, insertPlan, updatePlan} from "../api/plan_travail";
import InputLabel from "../components/form/inputLabel";
import Qualification from "../components/plan_travail/qualification";

function UpdatePlanTravail(props) {
    const [plan, setPlan] = useState({label_travail: '',id:''});

    const handleChange = (event) => {
        formHandleChange(event,plan,setPlan)
    }

    useEffect( async() => {
        try{
            const plan = await getPlan(props.id)
            setPlan({label_travail: plan.label_travail, id: plan.id})
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);

    const handleSubmit = async (event) =>{
        event.preventDefault()
        if(plan.label_travail === ''){
            toast.warn("Veuillez saisir tout les éléments.")
            return
        }
        try{
            const data = {
                label_travail : plan.label_travail,
                id:plan.id
            }
            await updatePlan(data)
            toast.success("Le plan de travail a bien été modifié.")
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu.")
        }
    }

    return (
        <div className="container">
            <h2>Modification du poste de travail</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel name="label_travail" value={plan.label_travail} change={handleChange} type="text" label="Label poste de travail" placeholder="Label plan de travail"/>
                <button className="btn btn-primary">Modifier</button>
            </form>
            <Qualification id={props.id}/>
        </div>
    );
}

export default UpdatePlanTravail;