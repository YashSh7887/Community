import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import CreatePost from "./components/create-post";
import LogIn from "./components/log-in";
import SignUp from "./components/sign-up";
import Home from "./routes/Home";
import Post from "./routes/Post";
import User from "./routes/User";

function App(){
  const [user,setUser] = useState(null);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token){
      const user = JSON.parse(atob(token.split(".")[1]));
      setUser(user);
    }
    else setUser(null);
  },[]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home user={user}/>} />
      <Route path="/post/:postid" element={<Post />}  />
      <Route path="/:user" element={<User />} />
      <Route path="/:user/create-post" element={<CreatePost />} />
      <Route path="/log-in" element={<LogIn setUser={setUser} />} />
        <Route path="/sign-up" element={<SignUp />} />
    </Routes>
    </BrowserRouter>
  )
}
export default App
