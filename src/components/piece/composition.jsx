import React, {useEffect, useState} from 'react';
import {toast} from "react-toastify";
import {deleteComposition, getAllCompo} from "../../api/composition";
import CompositionForm from "./compositionForm";

function Composition(props) {
    const [compositions,setCompositions] = useState([])
    const [change,setChange] = useState(0)

    useEffect(async()=>{
        try{
            setCompositions(await getAllCompo(props.id))
        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    },[change])

    const handleDelete = async(id)=>{
        try{
            if(window.confirm("Voulez vous vraiment cette composition de la pièce ? ?")){
                await deleteComposition(id)
                toast.success("Suppression effectuer.")
                setChange(change +1)
            }
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }
    return (
        <div>
            <h3>Composition de la pièce</h3>
            <CompositionForm id={props.id} change={change} setChange={setChange}/>
            <table className="table">
                <thead>
                <th>Pièce/matière première</th>
                <th>Quantité</th>
                <th>Action</th>
                </thead>
                <tbody>
                {compositions.map((data,index)=>{
                    return(
                        <tr>
                            <td>{data.lib_mat} {data.lib_piece}</td>
                            <td>{data.compoqte}</td>
                            <td>
                                <button onClick={async ()=>{ await handleDelete(data.compoid)}} className="btn btn-danger">Supprimer</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Composition;