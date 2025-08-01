import { useEffect, useState } from "react";
import { getHomePosts } from "../api";
import NavBar from "../components/navbar";
import PostCard from "../components/navbar";

export default function Home({user}){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async () => {
            try{
                const {data} = await getHomePosts();
                setPosts(data);
            }
            catch(err){
                console.err("Failed to fetch posts");
            }
        };
        fetchPosts();
    },[]);
    return (
        <div>
            <NavBar />
            {
                posts.map((post)=>{
                    return <PostCard post={post} />
                })
            }
        </div>
    )
}