import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllMat(){
    const url = `${URL}/mat_prem`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addMat(data){
    const url = `${URL}/mat_prem`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function updateMat(data){
    const url = `${URL}/mat_prem`
    const response = await axios.put(url,data,HEADER)
    return response
}

export async function getMat(id){
    const url = `${URL}/mat_prem/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}