import axios from "axios";
import "./OnetimePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OnetimePassword=({otp, verifiedEmail})=>{

    const[receivedotp, setReceivedotp]=useState("");
    const Navigate=useNavigate();

    const resetPassHandler=async()=>{
        try {
            const response=await axios("http://localhost:3007/api/users/verify-otp", {
            method:"POST",
            data:{otp,email:verifiedEmail, receivedotp }
        })

        alert(response.data.message);
        Navigate("/reset-password");
            
        } catch (error) {
           alert(error.response.data.message); 
        }
        
    }
    return(
        <>
       
        <div className="otp-page">
<h1>OTP</h1>
<input type="text" placeholder="Enter your OTP here" value={receivedotp} onChange={(e)=>setReceivedotp(e.target.value)}/>

<button onClick={resetPassHandler}>Verify OTP</button>
</div>
</>
    )
}