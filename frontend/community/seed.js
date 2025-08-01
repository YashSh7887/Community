const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const pool = require("./backend/db/pool");

const NUM_USERS = 10;
const NUM_POSTS = 15;
const PASSWORD = "test123"; // Same for all test users

async function seed() {
  try {
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);

    // Create users
    const usernames = [];
    for (let i = 0; i < NUM_USERS; i++) {
      const username = faker.internet.userName().toLowerCase();
      const email = faker.internet.email();
      usernames.push(username);

      await pool.query(
        "INSERT INTO users (username, password, email) VALUES ($1, $2, $3)",
        [username, hashedPassword, email]
      );
    }

    // Create posts
    for (let i = 0; i < NUM_POSTS; i++) {
      const author = faker.helpers.arrayElement(usernames);
      const title = faker.lorem.words(3);
      const description = faker.lorem.sentences(2);
      const pay = faker.number.int({ min: 500, max: 5000 });
      const location = faker.location.city();

      await pool.query(
        "INSERT INTO job (title, description, pay, author, location) VALUES ($1, $2, $3, $4, $5)",
        [title, description, pay, author, location]
      );
    }

    // Create follows
    for (let i = 0; i < 20; i++) {
      const follower = faker.helpers.arrayElement(usernames);
      let followee = faker.helpers.arrayElement(usernames);
      while (followee === follower) {
        followee = faker.helpers.arrayElement(usernames);
      }

      const followerRes = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [follower]
      );
      const followeeRes = await pool.query(
        "SELECT id FROM users WHERE username = $1",
        [followee]
      );

      await pool.query(
        "INSERT INTO followers (userid, followerid) VALUES ($1, $2)",
        [followeeRes.rows[0].id, followerRes.rows[0].id]
      );
    }
      // Create comments
const NUM_COMMENTS = 30;

const postRes = await pool.query("SELECT id FROM job");
const postIds = postRes.rows.map(row => row.id);

for (let i = 0; i < NUM_COMMENTS; i++) {
  const postId = faker.helpers.arrayElement(postIds);
  const author = faker.helpers.arrayElement(usernames);
  const text = faker.lorem.sentences({ min: 1, max: 2 });

  await pool.query(
    "INSERT INTO comment (postid, author, text) VALUES ($1, $2, $3)",
    [postId, author, text]
  );
}

    console.log("✅ Test data seeded successfully");

  } catch (err) {
    console.error("❌ Failed to seed data:", err);
  } finally {
    pool.end();
  }

}



seed();
