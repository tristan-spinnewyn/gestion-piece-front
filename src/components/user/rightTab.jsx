import React, {useEffect, useState} from 'react';
import {addRight, delRightUser, getAllRights, getRights, getUser} from "../../api/user";
import {toast} from "react-toastify";
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";

function RightTab(props) {
    const [rights, setRight] = useState([]);
    const [rightSelect, setRightSelect] = useState({right:3});
    const [rightsLst, setRightsLst] = useState([]);
    const [change, setChange] = useState(0);

    const handleChange = (event) => {
        formHandleChange(event,rightSelect,setRightSelect)
    }

    useEffect( async() => {
        try{
            const rights = await getRights(props.id)
            const rightsId = []
            rights.map((right,index)=>{
                rightsId.push({id:right.id,label_right:right.label_right})
            })
            setRight(rightsId)

            const rightsApi = await getAllRights()
            const lstRights = []
            rightsApi.map((right,index)=>{
                lstRights.push({id:right.id,name:right.label_right})
            })
            setRightsLst(lstRights)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, [change]);

    const handleSubmitRight = async (event) =>{
        event.preventDefault()
        if(rightSelect.right === ''){
            toast.warn("Veuillez saisir tout les éléments.")
            return
        }
        try{
            const data = {
                right_id : rightSelect.right,
                user_id: props.id,
            }

            await addRight(data)

            setChange(change +1)

            toast.success("Le droit a bien été ajouté !")

        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu.")
        }
    }

    const delRight = async (id)=>{
        try{
            if(window.confirm("Voulez vous vraiment supprimer ce droit ?")){
                await delRightUser(props.id,id)
                toast.success("Le droit a bien été supprimé")
                setChange(change +1)
            }
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }
    return (
        <div>
            <h2>Droit de l'utilisateur</h2>
            <form className="row gx-3 gy-2 align-items-center" onSubmit={handleSubmitRight}>
                <div className="col-sm-6">
                    <SelectLabel change={handleChange} label="" multiple={false} name="right" value={rightSelect.right} options={rightsLst} />
                </div>
                <div className="col-sm-6">
                    <button className="btn btn-primary">Ajouter le droit</button>
                </div>
            </form>
            <table>
                <thead>
                <th>Droit</th>
                <th>Action</th>
                </thead>
                <tbody>
                {rights.map((right,index)=>{
                    return (<tr>
                        <td>{right.label_right}</td>
                        <td><button onClick={async ()=>{await delRight(right.id)}} className="btn btn-danger">Supprimer le droit</button></td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>

    );
}

export default RightTab;