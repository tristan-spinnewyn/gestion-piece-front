import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllFournisseur(){
    const url = `${URL}/fournisseur`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addFournisseur(data){
    const url = `${URL}/fournisseur`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function updateFournisseur(data){
    const url = `${URL}/fournisseur`
    const response = await axios.put(url,data,HEADER)
    return response
}

export async function getFournisseur(id){
    const url = `${URL}/fournisseur/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}