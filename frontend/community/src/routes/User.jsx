import { useEffect, useState } from "react";
import { getCommentsFromUser, getPostsFromUser } from "../api";
import UserNav from "../components/usernav";

export default function User({user}){
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            const currentUser = JSON.parse(atob(token.split(".")[1]));
            setCurrentUser(currentUser);
            const fetchComments = async (user) => {
                const {comments} = await getCommentsFromUser(user.username);
                setComments(comments);
            }
            fetchComments();
            const fetchPosts = async (user) => {
                const {posts} = await getPostsFromUser(user.username);
                setPosts(posts);
            }
            fetchPosts();
        }
        else{
            setCurrentUser(null);
        };
    },[]);
    return (
        <div>
            <h1>{user.username}</h1>
            {user.username!==currentUser.username?(<button>Follow</button>):null}
            <UserNav />
            
        </div>
    )

}