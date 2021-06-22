import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {getAllPiece} from "../api/piece";
import PieceEl from "../components/piece/pieceEl";

function Piece(props) {
    const [pieces, setPieces] = useState([]);

    useEffect( async() => {
        try{
            setPieces(await getAllPiece())
        }catch (e) {
            toast.error("Une erreur est survenue.")
            console.log(e)
        }
    }, []);


    return (
        <div className="container">
            <h2>Liste des piece</h2>
            <Link to="/add_piece" className="btn btn-primary">Ajouter une pièce</Link>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Nom de la piece</th>
                    <th scope="col">Prix achat</th>
                    <th scope="col">Prix vente</th>
                    <th scope="tel">fournisseur</th>
                    <th scope="col">Type de piece</th>
                    <th scope="col">Quantite</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {pieces.map((data,index)=>{
                    console.log(data)
                    return <PieceEl data={data} key={index}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Piece;