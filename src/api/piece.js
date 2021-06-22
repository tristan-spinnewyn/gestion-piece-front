import {HEADER, URL} from "./conf";
import axios from "axios";

export async function getAllPiece(){
    const url = `${URL}/piece`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getAllType(){
    const url = `${URL}/type_piece`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addPiece(data){
    const url = `${URL}/piece`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function getPiece(id){
    const url = `${URL}/piece/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export  async function getGammeByPiece(id){
    const url = `${URL}/piece/${id}/gamme`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function updatePiece(data){
    const url = `${URL}/piece`
    const response = await axios.put(url,data,HEADER)
    return response.data
}

export async function updateGamme(data){
    const url = `${URL}/gamme`
    const response = await axios.put(url,data,HEADER)
    return response.data
}