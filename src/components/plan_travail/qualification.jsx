import React, {useEffect, useState} from 'react';
import SelectLabel from "../form/selectLabel";
import {formHandleChange} from "../../services/formService";
import {toast} from "react-toastify";
import {addQualification, delQualification, getUsers} from "../../api/plan_travail";
import {delRightUser, getOuvrier} from "../../api/user";

function Qualification(props) {
    const [users, setUsers] = useState([]);
    const [userSelect, setUserSelect] = useState({user_id:''});
    const [usersLst, setUsersLst] = useState([]);
    const [change, setChange] = useState(0);

    const handleChange = (event) => {
        formHandleChange(event,userSelect,setUserSelect)
    }

    useEffect(async () => {
        try{
            const usersApi = await getOuvrier()
            const lstUsers = []
            usersApi.map((user,index)=>{
                lstUsers.push({id:user.id,name:user.email})
            })
            setUsers(lstUsers)

            const usersApiIn = await getUsers(props.id)
            const lstUsersIn = []
            usersApiIn.map((user,index)=>{
                lstUsersIn.push({id:user.id,firstname:user.firstname,lastname:user.lastname,email:user.email})
            })
            setUsersLst(lstUsersIn)
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }, [change]);

    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(userSelect.user_id === ''){
            toast.warn("Veuillez choisir un utilisateur.")
            return
        }
        try{
            const data = {
                plan_de_travail_id : props.id,
                user_id: userSelect.user_id,
            }

            await addQualification(data)
            setChange(change +1)

            toast.success("L'utilisateur est désormé qualifié pour ce poste!")

        }catch (e) {
            console.log(e)
            toast.error("Une erreur est survenu. Veuillez vérifier que l'utilisateur n'est pas déjà qualifier pour ce poste.")
        }
    }

    const delUser = async (id)=>{
        try{
            if(window.confirm("Voulez vous vraiment supprimer cet utilisateur de ce poste ?")){
                await delQualification(id,props.id)
                toast.success("L'utilisateur n'est plus qualifié pour ce poste.")
                setChange(change +1)
            }
        }catch (e){
            console.log(e)
            toast.error("Une erreur est survenue.")
        }
    }


    return (
        <div>
            <h2>Utilisateur qualifié</h2>
            <form onSubmit={handleSubmit} className="row gx-3 gy-2 align-items-center">
                <div className="col-sm-6">
                    <SelectLabel sentenceOption="Veuillez selectionner un utilisateur" change={handleChange} label="utilisateur" multiple={false} name="user_id" value={userSelect.user_id} options={users} defaultOption={true}/>
                </div>
                <div className="col-sm-6">
                    <button className="btn btn-primary">Ajouter l'utilisateur</button>
                </div>
            </form>
            <table>
                <thead>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Action</th>
                </thead>
                <tbody>
                {usersLst.map((user,index)=>{
                    return (<tr>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td><button onClick={async ()=>{await delUser(user.id)}} className="btn btn-danger">Supprimer l'utilisateur</button></td>
                    </tr>)
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Qualification;