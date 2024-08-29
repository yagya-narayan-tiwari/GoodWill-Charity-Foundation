import axios from "axios"
import { CHARITY_NEWS_API } from "../../Constants/OtherAPIs/NewsAPI"

export const getnewsData = () =>{
    return axios.get(CHARITY_NEWS_API);
}