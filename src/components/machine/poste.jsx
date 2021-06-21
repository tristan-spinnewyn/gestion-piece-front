import React, {useEffect, useState} from 'react';
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";
import {getAll} from "../../api/plan_travail";
import {toast} from "react-toastify";
import {addPoste, delPosteIn, getPoste} from "../../api/machine";


function Poste(props) {
    const [postes, setPostes] = useState([]);
    const [posteSelect, setPosteSelect] = useState({plan_de_travail_id:''});
    const [posteLst, setPosteLst] = useState([]);
    const [change, setChange] = useState(0);

    const handleChange = (event) => {
        formHandleChange(event,posteSelect,setPosteSelect)
    }

    const delPoste = async (id)=>{
        try{
            if(window.confirm("Voulez vous vraiment supprimer ce poste de travail ?")){
                await delPosteIn(props.id,id)
                toast.success("Le poste a bien été supprimé.")
                setChange(change +1)
            }
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(posteSelect.plan_de_travail_id === ''){
            toast.warn("Veuillez choisir un poste.")
            return
        }
        try{
            const data = {
                plan_de_travail_id : posteSelect.plan_de_travail_id,
                machine_id: props.id,
            }

            await addPoste(data)
            setChange(change +1)

            toast.success("Le poste a bien été ajouter!")

        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu. Veuillez vérifier que ce poste n'a pas deja été défini pour cette machine.")
        }
    }

    useEffect(async () => {
        try{
            const posteApi = await getAll()
            const lstPoste = []
            posteApi.map((poste,index)=>{
                lstPoste.push({id:poste.id,name:poste.label_travail})
            })
            setPostes(lstPoste)

            const posteIn = await getPoste(props.id)
            const lstPosteIn = []
            posteIn.map((poste,index)=>{
                lstPosteIn.push({id:poste.plan_de_travail_id,label_travail:poste.label_travail})
            })
            setPosteLst(lstPosteIn)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, [change]);


    return (
        <div>
            <h2>Poste de travail</h2>
            <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
                <div className="col-sm-6">
                    <SelectLabel sentenceOption="Veuillez sélectionner un poste." change={handleChange} label="Poste de travail" multiple={false} name="plan_de_travail_id" value={posteSelect.plan_de_travail_id} options={postes} defaultOption={true}/>
                </div>
                <div className="col-sm-6">
                    <button className="btn btn-primary">Ajouter le poste</button>
                </div>
            </form>
            <table>
                <thead>
                <th>Nom</th>
                <th>Action</th>
                </thead>
                <tbody>
                {posteLst.map((poste,index)=>{
                    return (<tr key={index}>
                        <td>{poste.label_travail}</td>
                        <td><button onClick={async ()=>{await delPoste(poste.id)}} className="btn btn-danger">Supprimer le poste</button></td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Poste;