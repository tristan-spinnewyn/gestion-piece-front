import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllCompo(id){
    const url = `${URL}/piece/${id}/composition`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addCompo(data){
    const url = `${URL}/composition`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function getComposition(id){
    const url = `${URL}/composition/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getPieceCompo(){
    const url = `${URL}/piece_for_composition`
    const response = await axios.get(url,HEADER)
    return response.data
}
export async function deleteComposition(compo_id){
    const url = `${URL}/composition/${compo_id}`
    const response = await axios.delete(url,HEADER)
    return response.data
}