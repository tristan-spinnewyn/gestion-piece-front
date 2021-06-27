import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {getGammes} from "../api/operation";
import GammeEl from "../components/gamme/gammeEl";


function Gamme(props) {

    const [gammes, setGammes] = useState([]);

    useEffect( async() => {
        setGammes(await getGammes())
    }, []);

    return (
        <div className="container">
            <h2>Liste des gammes</h2>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Pièce lié</th>
                    <th scope="col">Responsable</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {gammes.map((data,index)=>{
                    return <GammeEl data={data} key={index}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Gamme;