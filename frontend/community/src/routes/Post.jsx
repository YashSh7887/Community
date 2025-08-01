import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api";
import Comment from "../components/comment";

export default function Post() {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    const {postid} = useParams();
    useEffect(()=>{
        const fetchPost = async (postid) => {
            const {post, comments}=getPost(postid);
            setPost(post);
            setComments(comments);
        }
        fetchPost(postid);
    },[]);
    return (
        <div>
            <h1>{post.title}</h1>
            <h2>{post.location}</h2>
            <h2>{post.pay}</h2>
            <h3>{post.author}</h3>
            <p>{post.description}</p>
            <button>Request Job</button>
            <form action="post">
                <input type="text" name="comment" id="comment" placeholder="Type comment..." />
                <button>Submit</button>
            </form>
            {comments.map((comment)=>{
                return <Comment comment = {comment} />
            })}
        </div>
    )
}