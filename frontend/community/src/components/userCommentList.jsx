import Comment from "./comment"
export default function CommentList(comments) {
    return (
        <div>
            {comments.map((comment)=>{
                return <Comment comment={comment} />
            })}
        </div>
    )
}