import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signUp = (username, password, email) =>
  api.post("/sign-up", { username, password, email });

export const logIn = async (username, password) => {
  const res = await api.post("/log-in", { username, password });
  localStorage.setItem("token", res.data.token);
  return res;
};

export const getHomePosts = () => api.get("/");
export const getPost = (postid) => api.get(`/${postid}`);
export const getPostsFromUser = (user) => api.get(`/${user}/posts`);
export const getCommentsFromUser = (user) => api.get(`/${user}/comments`);
export const getRequests = (user) => api.get(`/${user}/requests`);

export const createPost = (title, description, pay, location) =>
  api.post("/create-post", { title, description, pay, location });

export const createComment = (postid, username, text) =>
  api.post(`/${postid}/${username}/create-comment`, { text });

export const requestJob = (postid, username) =>
  api.post(`/${postid}/${username}/request-job`);

export const acceptJob = (requestid) => api.post(`/${requestid}/accept`);

export const followUser = (userid) => api.post(`/${userid}/follow`);
