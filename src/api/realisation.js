import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllRealisation(){
    const url = `${URL}/realisation`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addRealisation(data){
    const url = `${URL}/realisation`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function getRealisation(id){
    const url = `${URL}/realisation/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getRealisationOperation(id){
    const url = `${URL}/realisation/${id}/operation`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function deleteRealisationOperation(id,id_operation){
    const url = `${URL}/realisation/${id}/operation/${id_operation}`
    const response = await axios.delete(url,HEADER)
    return response.data
}

export async function addOperationRealisation(data){
    const url = `${URL}/realisation_operation`
    const response = await axios.post(url,data,HEADER)
    return response
}