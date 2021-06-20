import { getInStore, removeInStore, setInStore, TOKEN, ROLES_KEY } from "./store"

export const setUserLocalStorage = (data)=>{
   setInStore(ROLES_KEY,data.rights)
   setInStore(TOKEN,data.token)
}

export const isConnected = ()=>{
    const token = getInStore(TOKEN)
    if(token){
        return true
    }
    return false
}

export const getRoles = ()=>{
    return getInStore(ROLES_KEY)
}

export const getToken = ()=>{
    return getInStore(TOKEN)
}

export const logout = ()=>{
    removeInStore(ROLES_KEY)
    removeInStore(TOKEN)
}