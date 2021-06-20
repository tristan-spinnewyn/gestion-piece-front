import {getToken} from "../services/authService";

export const URL = 'http://localhost:3333'
export const HEADER = {
    headers: {
        authorization: "Bearer " + getToken()
    }
}