export default function Comment(comment) {
    return (
        <div>
            <h5>{comment.author}</h5>
            <p>{comment.text}</p>
        </div>
    )
}