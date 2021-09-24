import express from "express";
import postController from "../controllers/postController";

const posts = express();

posts.get("/", postController.allPosts);

posts.get("/:id", postController.postInfo);

posts.post("/", postController.createPost);
posts.get("/:id/comments", postController.getPostComments);
posts.post("/:id/comments", postController.createPostComment);

posts.get("/:id/upvotes", postController.getPostUpvotes);
posts.post("/:id/upvotes", postController.createPostUpvote);
posts.delete("/:id/upvotes", postController.deletePostUpvote);
export default posts;
