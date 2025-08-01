import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { logIn } from "../api";
export default function LogIn({setUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await logIn(username, password);
            const token = localStorage.getItem("token");
            const user = JSON.parse(atob(token.split(".")[1]));
            setUser(user);
            navigate("/");
        }
        catch(err){
            alert("log-in failed")
        }
        
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button type="submit">Log-in</button>
            </form>
        </div>
    )
}