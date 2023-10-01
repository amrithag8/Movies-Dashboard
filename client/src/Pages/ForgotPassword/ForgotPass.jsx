import { useState } from "react";
import "./ForgotPass.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { OnetimePassword } from "../OnetimePassword/OnetimePassword";
export const ForgotPass=({setVerifiedEmail, setotp})=>{

    const[userEmail, setUserEmail]=useState("");
    
    const Navigate=useNavigate();
    
const verificationHandler=async(userEmail)=>{
    
    // alert("A mail sent" + " "+ userEmail);

    try {
        
        const response=await axios("http://localhost:3007/api/users/forgot-password",{
        method: "POST",
        data:{userEmail}
    })
    alert(response.data.message);
    setotp(response.data.otp);
    setVerifiedEmail(response.data.email);

    Navigate("/verify-otp");
    } catch (error) {
       alert(error.response.data.message); 
    }
    

}

    return(
        <>
        
<div className="Forgot-page">
<h3>Forgot Your Password</h3>
<input type="email" placeholder="Enter your registered Email here" value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>

<button onClick={()=>verificationHandler(userEmail)}>Continue</button>
<h4>New Password will be sent to your registered Email ID</h4>

<Link to="/movies-dashboard"><p>Back to Home</p></Link>
        </div>
        </>
    )
}