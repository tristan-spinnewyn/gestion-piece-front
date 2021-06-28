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