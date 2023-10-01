import { useState } from "react";
import "./ResetPass.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const ResetPass=({verifiedEmail})=>{

    const navigate=useNavigate();

    const[newPassword, setNewPassword]=useState("");
    const[confirmPassword, setConfirmPassword]=useState("");

    const resetPassHandler=async()=>{
if(newPassword===confirmPassword){
    const response=await axios("http://localhost:3007/api/users/reset-pass", {
        method: "POST",
        data:{verifiedEmail,newPassword }
    })
    alert(response.data.message);
    setNewPassword("");
    setConfirmPassword("");
    navigate("/login");
}

else{
    alert("Passwords dont match");
}
    }

    return(
        <div className="reset-page">
<h1>Reset Password</h1>
<input type="password" placeholder="New Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
<input type="password" placeholder="Confirm new Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

<button onClick={resetPassHandler}>Reset Password</button>
</div>
    )
}