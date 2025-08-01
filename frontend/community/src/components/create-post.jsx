import { useState } from "react"
import { createPost } from "../api";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [pay, setPay] = useState(0);
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createPost(title, description, pay, location);
        }
        catch(err){
            alert("Couldnt create the post");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" onChange={(e)=>setTitle(e.target.value)} />
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" onChange={(e)=>setDescription(e.target.value)}/>
                <label htmlFor="pay">Pay:</label>
                <input type="number" id="pay" name="pay" onChange={(e)=>setPay(e.target.value)}/>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" onChange={(e)=>setLocation(e.target.value)}/>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}