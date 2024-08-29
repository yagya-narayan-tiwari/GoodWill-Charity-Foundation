import axios from "axios";
import { BASE_URL } from "../Constants/ApiRoutes";
import { getToken } from "./TokenService";

const NGO_URL =`${BASE_URL}/ngo`;

export function ngoLogin(loginCredentials){
    return axios.post(`${NGO_URL}/login`,loginCredentials,{headers: {
            'Content-Type': 'application/json',
        }});
}
export function addNgo(Credentials){
    return axios.post(`${NGO_URL}`,Credentials,{headers: {
            'Content-Type': 'multipart/form-data',
        }});
}
export function fetchAllNgo(){
    return axios.get(`${NGO_URL}`)
}
export function fetchNgoData(ngoId){
    return axios.get(`${NGO_URL}/${ngoId}`,{headers:{'Authorization':`Bearer ${getToken()}`}})
}
export function fetchNgoDataForPage(ngoId){
    return axios.get(`${NGO_URL}/ngopage/${ngoId}`)
}
export function updatedNgoData(ngoId,ngoData){
    return axios.put(`${NGO_URL}/${ngoId}`,ngoData,{headers:{'Authorization':`Bearer ${getToken()}` , 'Content-Type': 'multipart/form-data'}})
}

export function deleteNgo(ngoId){
    return axios.delete(`${NGO_URL}/${ngoId}`,{headers:{'Authorization':`Bearer ${getToken()}`}})    
}