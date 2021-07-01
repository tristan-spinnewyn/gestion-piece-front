import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllClient(){
    const url = `${URL}/client`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addClient(data){
    const url = `${URL}/client`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function updateClient(data){
    const url = `${URL}/client`
    const response = await axios.put(url,data,HEADER)
    return response
}

export async function getClient(id){
    const url = `${URL}/client/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}