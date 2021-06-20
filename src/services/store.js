export const ROLES_KEY = 'roles'
export const TOKEN = 'jwt'
const localStorage = window.localStorage

export function setInStore(key,value){
    const stringData = JSON.stringify(value)
    localStorage.setItem(key,stringData)

    return true
}

export function getInStore(key){
    const stringData = localStorage.getItem(key)
    if(stringData){
        return JSON.parse(stringData)
    }
    return false
}

export function removeInStore(key){
    localStorage.removeItem(key)

    return true
}