import {HEADER, URL} from "./conf";
import axios from "axios";
//commande
export async function getAllCommande(){
    const url = `${URL}/commande`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addCommande(data){
    const url = `${URL}/commande`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function getCommande(id){
    const url = `${URL}/commande/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function terminateCommande(id){
    const url = `${URL}/commande/${id}/terminate`
    const response = await axios.post(url,'',HEADER)
    return response.data
}

//ligne commande

export async function getLigneCommande(id){
    const url = `${URL}/commande/${id}/ligne_devis`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getLigneDevisForSet(client_id){
    const url = `${URL}/ligne_commande/${client_id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addLigneDevisInCommande(data){
    const url = `${URL}/ligne_commande`
    const response = await axios.post(url,data,HEADER)
    return response.data
}