import axios from "axios";


export const axiosInstance=axios.create({
    baseURL: "http://localhost:3007/api/users",
})


axiosInstance.interceptors.request.use((request)=>{
const token=localStorage.getItem("token");
if(token){
    request.headers.Authorization=token;
}
return request;
}, 
(error)=>error)