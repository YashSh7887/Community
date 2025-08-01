const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
}
async function getUserIdByUsername(username) {
  const result = await pool.query("SELECT id FROM users WHERE username = $1", [username]);
  if (result.rows.length === 0) throw new Error("User not found");
  return result.rows[0].id;
}

async function createUser(username, hashedPassword, email) {
    await pool.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
        [username, hashedPassword, email]
    );
}

async function followUser(targetUsername, followerUsername) {
  const userid = await getUserIdByUsername(targetUsername);
  const followerid = await getUserIdByUsername(followerUsername);

  await pool.query(
    "INSERT INTO followers (userid, followerid) VALUES ($1, $2)",
    [userid, followerid]
  );
}


async function createJob(title, description, pay, author, location) {
    await pool.query(
        "INSERT INTO job (title, description, pay, author, location) VALUES ($1, $2, $3, $4, $5)",
        [title, description, pay, author, location]
    );
}

async function getAllPosts() {
    const { rows } = await pool.query("SELECT * FROM job");
    return rows;
}

async function getPostsFromUser(username) {
    const { rows } = await pool.query("SELECT * FROM job WHERE author = $1", [username]);
    return rows;
}

async function createComment(postId, author, text) {
    await pool.query(
        "INSERT INTO comment (postid, author, text) VALUES ($1, $2, $3)",
        [postId, author, text]
    );
}

async function getCommentsForPost(postId) {
    const { rows } = await pool.query("SELECT * FROM comment WHERE postid = $1", [postId]);
    return rows;
}

async function getCommentsFromUser(username) {
    const { rows } = await pool.query("SELECT * FROM comment WHERE author = $1", [username]);
    return rows;
}

async function createRequest(sender, receiver, postId) {
    await pool.query(
        "INSERT INTO jobrequest (sentby, sentto, accepted, jobid) VALUES ($1, $2, $3, $4)",
        [sender, receiver, false, postId]
    );
}

async function acceptRequest(requestId) {
    await pool.query("UPDATE jobrequest SET accepted = true WHERE id = $1", [requestId]);
}

async function getReceivedRequests(username) {
    const { rows } = await pool.query("SELECT * FROM jobrequest WHERE sentto = $1", [username]);
    return rows;
}

async function getSentRequests(username) {
    const { rows } = await pool.query("SELECT * FROM jobrequest WHERE sentby = $1", [username]);
    return rows;
}

module.exports = {
    getAllUsernames,
    createUser,
    followUser,
    createJob,
    getAllPosts,
    getPostsFromUser,
    createComment,
    getCommentsForPost,
    getCommentsFromUser,
    createRequest,
    getReceivedRequests,
    getSentRequests,
    acceptRequest,
};
