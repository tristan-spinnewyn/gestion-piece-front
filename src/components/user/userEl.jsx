import React, {useEffect, useState} from 'react';
import Rights from "./rights";
import {toast} from "react-toastify";
import {getRights} from "../../api/user";
import {Link} from "react-router-dom";

function UserEl(props) {
    const [rights, setRights] = useState([]);
    useEffect(async () => {
        try{
            const result = await getRights(props.user.id)
            setRights(result)
        }catch (e){
            toast.error("Une erreur est survenu.")
        }
    }, []);

    return (
        <tr>
            <td>{props.user.id}</td>
            <td>{props.user.email}</td>
            <td>{props.user.firstname}</td>
            <td>{props.user.lastname}</td>
            <Rights rights={rights}/>
            <td>
                <div>
                    <Link to={`/utilisateur/${props.user.id}`} className="btn btn-primary">Modifier</Link>
                </div>
            </td>
        </tr>
    );
}

export default UserEl;