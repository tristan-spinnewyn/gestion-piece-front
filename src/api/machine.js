import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllMachine(){
    const url = `${URL}/machine`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addMachine(data){
    const url = `${URL}/machine`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function getMachine(id){
    const url = `${URL}/machine/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function updateMachine(data){
    const url = `${URL}/machine`
    const response = await axios.put(url,data,HEADER)
    return response
}

export async function getPoste(id){
    const url = `${URL}/machine/${id}/poste`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addPoste(data){
    const url = `${URL}/post_machine`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function delPosteIn(machine_id,poste_id){
    const url = `${URL}/machine/${machine_id}/poste/${poste_id}`
    const response = await axios.delete(url,HEADER)
    return response
}