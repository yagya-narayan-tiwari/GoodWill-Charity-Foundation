import axios from "axios";
import { BASE_URL } from "../Constants/ApiRoutes";
import { getToken } from "./TokenService";

const CHARITY_URL =`${BASE_URL}/charity`;


// export function addNgo(Credentials){
//     return axios.post(`${NGO_URL}`,Credentials,{headers: {
//             'Content-Type': 'multipart/form-data',
//         }});
// }
export function fetchAllCharityByNgoId(ngoId){
    return axios.get(`${CHARITY_URL}/charity_by_ngo/${ngoId}`)
}

export function addCharity(data){
    return axios.post(`${CHARITY_URL}`,data,{headers: {
        'Content-Type': 'multipart/form-data','Authorization':`Bearer ${getToken()}`
    }});
}