import {HEADER, URL} from "./conf";
import axios from "axios";
//achat
export async function getAllAchat(){
    const url = `${URL}/achat`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addAchat(data){
    const url = `${URL}/achat`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function getAchat(id){
    const url = `${URL}/achat/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function updateAchat(data){
    const url = `${URL}/achat`
    const response = await axios.put(url,data,HEADER)
    return response.data
}

//ligne achats

export async function getLigneAchat(id){
    const url = `${URL}/achat/${id}/ligne_achat`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addLigne(data){
    const url = `${URL}/ligne_achat`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

//get ressources

export async function getMatPremFournisseur(id){
    const url = `${URL}/mat_prem/fournisseur/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getPieceFournisseur(id){
    const url = `${URL}/piece/fournisseur/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}