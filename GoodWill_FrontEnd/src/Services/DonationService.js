import axios from "axios";
import { BASE_URL } from "../Constants/ApiRoutes";
import { getToken } from "./TokenService";

const DONATION_URL =`${BASE_URL}/donation`;

export function addDonation(data){
    return axios.post(`${DONATION_URL}`,data,{headers: {
        'Content-Type': 'multipart/form-data','Authorization':`Bearer ${getToken()}`
    }});
}
export function fetchAllDonationByNgoId(ngoId){
    return axios.get(`${DONATION_URL}/donation_list/${ngoId}`,{headers: {
        'Authorization':`Bearer ${getToken()}`
    }})}
export function donationHistory(id){
    return axios.get(`${DONATION_URL}/donation_history/${id}`,{headers: {
        'Authorization':`Bearer ${getToken()}`
    }})
}