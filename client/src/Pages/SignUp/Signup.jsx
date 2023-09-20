import { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate, Link } from "react-router-dom";
export const Signup=()=>{

    const[gender, setGender]=useState();
    const[name, setName]=useState();
    const[age, setAge]=useState();
    const[email, setEmail]=useState();
    const[password, setPassword]=useState();
const Navigate=useNavigate();
    const genderButtonHandler=(e)=>{
setGender(e.target.value);
    }


    const signupHandler=async()=>{
try {
    const response=await axios("http://localhost:3007/api/users/signup", {
method: "POST",
data:{name, age, email, password, gender}

}
)

// console.log("response.data", response.data);


setName("");
setAge("");
setEmail("");
setGender("");
setPassword("");

alert("Account created successfully");
Navigate("/login");
    
} catch (error) {
   console.log("error", error.message); 
}
    }


    return(
        <div className="signup-page">
<h1>Sign Up</h1>

<input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
<input type="text" placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)}/>
<label className="title-gender">Gender:</label>


<div className="gender">

<div className="gender-type">
  <label>Female</label>  
<input type="radio" name="gender" value="female" onChange={(e)=>genderButtonHandler(e)}/> 
</div>

<div className="gender-type">
<label>Male</label>
<input type="radio" name="gender" value="male" onChange={(e)=>genderButtonHandler(e)}/> 
</div>
</div>

<input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
<input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
<button onClick={signupHandler}>Submit</button>
<Link to="/login"><p>Back to Login</p></Link>


        </div>
    )
}