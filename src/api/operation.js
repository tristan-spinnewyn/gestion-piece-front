import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllOperation(){
    const url = `${URL}/operation`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getAllPlan(){
    const url = `${URL}/plan_machine`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function insertOperation(data){
    const url = `${URL}/operation`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function updateOperation(data){
    const url = `${URL}/operation`
    const response = await axios.put(url,data,HEADER)
    return response.data
}

export async function getOperation(id){
    const url = `${URL}/operation/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getGammes(){
    const url = `${URL}/gamme`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getGamme(id){
    const url = `${URL}/gamme/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getOperationGamme(gamme_id){
    const url = `${URL}/gamme/${gamme_id}/operation`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function insertOppGamme(data){
    const url = `${URL}/gamme_operation`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function deleteGammeOpp(gamme_id,opp_id){
    const url = `${URL}/gamme/${gamme_id}/operation/${opp_id}`
    const response = await axios.delete(url,HEADER)
    return response.data
}