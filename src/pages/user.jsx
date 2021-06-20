import React, {useEffect, useState} from 'react'
import {toast} from "react-toastify";
import {getAllUser} from "../api/user";
import UserEl from "../components/user/userEl";
import {Link} from "react-router-dom";

export default function User() {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        try{
            const result = await getAllUser()
            setUsers(result)
        }catch (e){
            toast.error("Une erreur est survenu.")
        }
    }, []);
    
    return (
        <div className="container">
            <Link to="/add_user" className="btn btn-primary">Ajouter un utilisateur</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Roles</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user,index)=>{
                    return <UserEl user={user} key={index}/>
                })}
                </tbody>
            </table>
        </div>
    )
}
