import React, {useEffect, useState} from 'react';
import {getAllPlan, getOperation, insertOperation, updateOperation} from "../api/operation";
import {toast} from "react-toastify";
import {formHandleChange} from "../services/formService";
import InputLabel from "../components/form/inputLabel";
import SelectLabel from "../components/form/selectLabel";

function UpdateOperation(props) {
    const [posteMachine, setPosteMachine] = useState([]);
    const [operation, setOperation] = useState({duree:0,plan_machine_id:'',id:''});

    useEffect( async() => {
        try{
            const apiPosteMachine = await getAllPlan()
            const arrayPosteMachine = []
            apiPosteMachine.map((data,index)=>{
                arrayPosteMachine.push({id:data.planmachineid, name:`machine: ${data.label_machine} / poste de travail: ${data.label_travail}`})
            })
            setPosteMachine(arrayPosteMachine)

            setOperation(await getOperation(props.id))
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
            await updateOperation(operation)
            toast.success("L'opération est bien modifier.")
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
            <h2>Modifier une opération</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel label="durée (en mn)" change={handleChange} type="number" value={operation.duree} name="duree" placeholder="Durée (en mn)"/>
                <SelectLabel label="Poste machine" value={operation.plan_machine_id} defaultOption={true} sentenceOption="Veuillez choisir un poste lié a une machine" options={posteMachine} name="plan_machine_id" change={handleChange}/>
                <button className="btn btn-primary">Modifier</button>
            </form>
        </div>
    );
}

export default UpdateOperation;