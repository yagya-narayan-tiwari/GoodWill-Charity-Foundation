import axios from "axios";
import { BASE_URL } from "../Constants/ApiRoutes";
import { getToken } from "./TokenService";

const DONOR_URL =`${BASE_URL}/donor`;

export function donorLogin(loginCredentials){
    return axios.post(`${DONOR_URL}/login`,loginCredentials,{headers: {
            'Content-Type': 'application/json',
        }});
}
export function addDonor(Credentials){
    return axios.post(`${DONOR_URL}`,Credentials,{headers: {
            'Content-Type': 'multipart/form-data',
        }});
}
export function fetchDonorData(Donorid){
    return axios.get(`${DONOR_URL}/${Donorid}`,{headers:{'Authorization':`Bearer ${getToken()}`}})
}
export function updatedDonorData(donorId,donorData){
    return axios.put(`${DONOR_URL}/${donorId}`,donorData,{headers:{'Authorization':`Bearer ${getToken()}`,'Content-Type': 'multipart/form-data',}})
}

export function deleteDonor(donorId){
    return axios.delete(`${DONOR_URL}/${donorId}`,{headers:{'Authorization':`Bearer ${getToken()}`}})    
}