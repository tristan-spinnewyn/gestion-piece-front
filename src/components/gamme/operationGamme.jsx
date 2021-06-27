import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {deleteGammeOpp, getAllOperation, getOperationGamme, insertOppGamme} from "../../api/operation";
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";
import InputLabel from "../form/inputLabel";

function OperationGamme(props) {
    const [operations,setOperation] = useState([])
    const [operation_gamme,setOppGamme] = useState({operation_id:'',gamme_id:props.id,ordre:''})
    const [gammeOpp,setGammeOpp] = useState([])
    const [change,setChange] = useState(0)

    useEffect(async()=>{
        try{
            const opps= await getAllOperation()
            const lst = []
            opps.map((opp,index)=>{
                console.log(opp)
                lst.push({id:opp.opid,name:`${opp.label_machine}/${opp.label_travail}`})
            })
            setOperation(lst)
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[])

    useEffect(async()=>{
        try{
            setGammeOpp(await getOperationGamme(props.id))
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[change])

    const handleChange = (event)=>{
        formHandleChange(event,operation_gamme,setOppGamme)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            if(operation_gamme.operation_id === '' || operation_gamme.ordre === ''){
                toast.warn("Veuillez remplir tout les champs")
                return
            }
            await insertOppGamme(operation_gamme)
            setChange(change +1 )
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }

    const handleDelete = async(id)=>{
        try{
            if(window.confirm("Etes vous sur de vouloir supprimer cette opération de cette gamme ?")) {
                await deleteGammeOpp(props.id, id)
                setChange(change + 1)
                toast.success("L'opération est bien supprimé de cette gamme.")
            }
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
                <div className="col-sm-6">
                    <SelectLabel label="Opération" change={handleChange} defaultOption={true} sentenceOption="Veuillez choisir une opération" name="operation_id" value={operation_gamme.operation_id} options={operations}/>
                </div>
                <div className="col-sm-3">
                    <InputLabel label="Ordre" change={handleChange} type="number" value={operation_gamme.ordre} name="ordre" placeholder="Ordre"/>
                </div>
                <div className="col-sm-3">
                    <button className="btn btn-primary">Ajouter</button>
                </div>
            </form>
            <table className="table">
                <thead>
                <th>Operation</th>
                <th>Ordre</th>
                <th>Action</th>
                </thead>
                <tbody>
                {gammeOpp.map((data,index)=>{
                    return(
                        <tr>
                            <td>{data.label_travail} / {data.label_machine} / {data.duree} mn</td>
                            <td>{data.ordre}</td>
                            <td>
                                <button onClick={async ()=>{ await handleDelete(data.operation_id)}} className="btn btn-primary">Supprimer</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

export default OperationGamme;