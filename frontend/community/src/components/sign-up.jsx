import { useState } from "react";
import { signUp } from "../api";
import {useNavigate} from 'react-router-dom'
export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signUp(username,password,email);
            navigate('/log-in');
        }
        catch(err){
            alert("Sign up failed");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} />
                <button type="submit">Sign-up</button>
            </form>
        </div>
    )
}