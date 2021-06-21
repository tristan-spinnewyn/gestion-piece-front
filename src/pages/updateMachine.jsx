import React, {useEffect, useState} from 'react';
import InputLabel from "../components/form/inputLabel";
import {formHandleChange} from "../services/formService";
import {toast} from "react-toastify";
import {getMachine, updateMachine} from "../api/machine";
import Poste from "../components/machine/poste";

function UpdateMachine(props) {
    const [machine, setMachine] = useState({label_machine:''});

    const handleChange = (event)=>{
        formHandleChange(event,machine,setMachine)
    }
    useEffect( async() => {
        try{
            const machine = await getMachine(props.id)
            setMachine({label_machine: machine.label_machine, id: machine.id})
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, []);

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(machine.label_machine === ''){
            toast.warn("Veuillez saisir le nom de la machine")
            return
        }
        try{
            await updateMachine(machine)
            toast.success("Mise à jour effective.")
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <InputLabel name="label_machine" value={machine.label_machine} change={handleChange} type="text"
                            label="Label machine" placeholder="Label machine"/>
                <button className="btn btn-primary">Modifier</button>
            </form>
            <Poste id={props.id}/>
        </div>
    );
}

export default UpdateMachine;