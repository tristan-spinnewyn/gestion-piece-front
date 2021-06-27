import React, {useEffect, useState} from 'react';
import {getAllPlan, insertOperation} from "../api/operation";
import {formHandleChange} from "../services/formService";
import InputLabel from "../components/form/inputLabel";
import SelectLabel from "../components/form/selectLabel";
import {toast} from "react-toastify";

function AddOperation(props) {
    const [posteMachine, setPosteMachine] = useState([]);
    const [operation, setOperation] = useState({duree:0,plan_machine_id:'',});

    useEffect( async() => {
        try{
            const apiPosteMachine = await getAllPlan()
            const arrayPosteMachine = []
            apiPosteMachine.map((data,index)=>{
                arrayPosteMachine.push({id:data.planmachineid, name:`machine: ${data.label_machine} / poste de travail: ${data.label_travail}`})
            })
            setPosteMachine(arrayPosteMachine)
        }catch (e) {
            console.log(e)
        }
    }, []);

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(operation.duree === 0 || operation.plan_machine_id === ''){
            toast.warn("Veuillez saisir tout les champs")
        }
        try{
            await insertOperation(operation)
            props.history.push("/operation")
        }catch (e) {
            console.log(e)
            toast.error("une erreur est survenue.")
        }
    }

    const handleChange = (event)=>{
        formHandleChange(event,operation,setOperation)
    }
    return (
        <div className="container">
            <h2>Ajouter une opération</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel label="durée (en mn)" change={handleChange} type="number" value={operation.duree} name="duree" placeholder="Durée (en mn)"/>
                <SelectLabel label="Poste machine" value={operation.plan_machine_id} defaultOption={true} sentenceOption="Veuillez choisir un poste lié a une machine" options={posteMachine} name="plan_machine_id" change={handleChange}/>
                <button className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}

export default AddOperation;