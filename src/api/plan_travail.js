import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAll(){
    const url = `${URL}/plan_travail`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function insertPlan(data){
    const url = `${URL}/plan_travail`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function getPlan(id){
    const url = `${URL}/plan_travail/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function updatePlan(data){
    const url = `${URL}/plan_travail`
    const response = await axios.put(url,data,HEADER)
    return response
}

export async function getUsers(id){
    const url = `${URL}/plan_travail/${id}/users`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addQualification(data){
    const url = `${URL}/user_qualification`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function delQualification(user_id,plan_id){
    const url = `${URL}/plan_travail/${plan_id}/user/${user_id}`
    const response = await axios.delete(url,HEADER)
    return response
}