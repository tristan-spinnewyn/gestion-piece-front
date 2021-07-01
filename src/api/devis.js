import {HEADER, URL} from "./conf";
import axios from "axios";
//devis
export async function getAllDevis(){
    const url = `${URL}/devis`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addDevis(data){
    const url = `${URL}/devis`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function getDevis(id){
    const url = `${URL}/devis/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function terminateDevis(id){
    const url = `${URL}/devis/${id}/terminate`
    const response = await axios.post(url,'',HEADER)
    return response.data
}

//ligne devis

export async function getLigneDevis(id){
    const url = `${URL}/devis/${id}/ligne_devis`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addLigneDevis(data){
    const url = `${URL}/ligne_devis`
    const response = await axios.post(url,data,HEADER)
    return response.data
}