import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {getAllMachine} from "../api/machine";
import MachineEl from "../components/machine/machineEl";

function Machine(props) {

    const [machines, setMachines] = useState([]);

    useEffect(async () => {
        try{
            const result = await getAllMachine()
            setMachines(result)
        }catch (e){
            toast.error("Une erreur est survenu.")
        }
    }, []);

    return (
        <div className="container">
            <Link to="/add_machine" className="btn btn-primary">Ajouter une machine</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {machines.map((data,index)=>{
                    return <MachineEl data={data} key={index}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Machine;