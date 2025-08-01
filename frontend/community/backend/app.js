const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("./db/pool");
const {
    createUser,
    getAllPosts,
    getCommentsForPost,
    createJob,
    getPostsFromUser,
    getCommentsFromUser,
    createComment,
    createRequest,
    acceptRequest,
    followUser,
    getReceivedRequests,
    getSentRequests,
} = require("./db/queries");

const jwtSecret = "supersecret";
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function requireJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];
    try {
        const user = jwt.verify(token, jwtSecret);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid Token" });
    }
}

app.post("/sign-up", async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(username, hashedPassword, email);
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.post("/log-in", async (req, res) => {
    const { username, password } = req.body;
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: "2h" });
    res.json({ token });
});

app.get("/posts", requireJWT, async (req, res) => {
    const posts = await getAllPosts();
    res.json(posts);
});

app.get("/posts/:postid", requireJWT, async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM job WHERE id = $1", [req.params.postid]);
    const post = rows[0];
    const comments = await getCommentsForPost(post.id);
    res.json({ post, comments });
});

app.post("/create-post", requireJWT, async (req, res) => {
    await createJob(req.body.title, req.body.description, req.body.pay, req.user.username, req.body.location);
    res.json({ success: true });
});

app.get("/users/:user/posts", requireJWT, async (req, res) => {
    const posts = await getPostsFromUser(req.params.user);
    res.json(posts);
});

app.get("/users/:user/comments", requireJWT, async (req, res) => {
    const comments = await getCommentsFromUser(req.params.user);
    res.json(comments);
});

app.post("/posts/:postid/comments", requireJWT, async (req, res) => {
    await createComment(req.params.postid, req.user.username, req.body.text);
    res.json({ success: true });
});

app.post("/posts/:postid/request", requireJWT, async (req, res) => {
    const { rows } = await pool.query("SELECT * FROM job WHERE id = $1", [req.params.postid]);
    const post = rows[0];
    await createRequest(req.user.username, post.author, post.id);
    res.json({ success: true });
});

app.post("/requests/:requestid/accept", requireJWT, async (req, res) => {
    await acceptRequest(req.params.requestid);
    res.json({ success: true });
});
app.post("/users/:user/follow", requireJWT, async (req, res) => {
  try {
    const targetUsername = req.params.user;
    const followerUsername = req.user.username;

    await followUser(targetUsername, followerUsername);
    res.status(200).json({ message: "Followed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to follow user" });
  }
});

app.get("/users/:user/requests", requireJWT, async (req, res) => {
    const received = await getReceivedRequests(req.params.user);
    const sent = await getSentRequests(req.params.user);
    res.json({ sent, received });
});

app.listen(3000, () => {
    console.log("JWT-based server running at http://localhost:3000");
});
