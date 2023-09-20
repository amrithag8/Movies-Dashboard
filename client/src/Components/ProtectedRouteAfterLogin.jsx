import { Outlet, useNavigate } from "react-router-dom"



export const ProtectedRouteAfterLogin=({children})=>{
    const navigate=useNavigate();
    if(!localStorage.getItem("token")){
       return <Outlet/>
    }

    return navigate("/movies-dashboard");
}