import {Link, useNavigate} from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Login=()=>{

    const[loginEmail, setloginEmail]=useState();
    const[loginPass, setloginPass]=useState();
    const[users, setUsers]=useState([]);
    const Navigate=useNavigate();


    const loginHandler=async()=>{

        try {

            const response=await axios("http://localhost:3007/api/users/login", {
    method: "POST", 
    data:{username:loginEmail, password:loginPass}
})

toast.success("success");
setUsers(response.data);


localStorage.setItem("token", response?.data?.AccessToken);
localStorage.setItem("name", response?.data?.name)
Navigate("/movies-dashboard");
            
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
    return(
        
        <div className="login-page">
<h1>Login</h1>
<input type="email" placeholder="Email"  onChange={(e)=>setloginEmail(e.target.value)}/>
<input type="password" placeholder="Password" onChange={(e)=>setloginPass(e.target.value)}/>
<button onClick={loginHandler}>Submit</button>
<p><Link to="/signup">Not registered yet? Sign Up</Link></p>
<p><Link to="/forgot-password">Forgot Password</Link></p>
<Link to="/movies-dashboard"><p>Back to Home</p></Link>
        </div>
        
    )
}