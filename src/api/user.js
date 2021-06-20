import { URL, HEADER } from "./conf";
import axios from "axios";


export async function loginApi(email,pwd){
    const url = `${URL}/user/authenticate`
    const data = {
        login:email,
        password:pwd
    }
    
    const response = await axios.post(url,data)
    console.log(response.data)
    return response.data
}

export async function getAllUser(){
    const url = `${URL}/users`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getRights(id){
    const url = `${URL}/user/${id}/right`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function getAllRights(){
    const url = `${URL}/rights`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function addUser(data){
    const url = `${URL}/user`
    const response = await axios.post(url,data,HEADER)
    return response
}

export async function getUser(id){
    const url = `${URL}/user/${id}`
    const response = await axios.get(url,HEADER)
    return response.data
}

export async function delRightUser(user_id,right_id){
    const url = `${URL}/user/${user_id}/right/${right_id}`
    const response = await axios.delete(url,HEADER)
    return response.data
}

export async function addRight(data){
    const url = `${URL}/user/${data.user_id}/right`
    const response = await axios.post(url,data,HEADER)
    return response.data
}

export async function updateUser(data){
    const url = `${URL}/user`
    const response = await axios.put(url,data,HEADER)
    return response.data
}