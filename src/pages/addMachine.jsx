import React, {useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {addMachine} from "../api/machine";

function AddMachine(props) {

    const [machine, setMachine] = useState({label_machine:''});

    const handleChange = (event)=>{
        formHandleChange(event,machine,setMachine)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(machine.label_machine === ''){
            toast.warn("Veuillez saisir le nom de la machine")
            return
        }
        try{
            const data = {
                label_machine:machine.label_machine
            }
            await addMachine(data)
            props.history.push("/machine")
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <InputLabel name="label_machine" value={machine.label_machine} change={handleChange} type="text" label="Label machine" placeholder="Label machine"/>
                <button className="btn btn-primary">Ajouter</button>
            </form>
        </div>
    );
}

export default AddMachine;