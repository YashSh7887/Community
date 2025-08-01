import PostCard from "./postcard"
export default function PostList(posts) {
    return <div>
        {posts.map((post)=>{
            return <PostCard post={post} />
        })}
    </div>
}