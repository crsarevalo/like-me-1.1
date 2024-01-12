import express from "express";
import {
  getAllPostsController,
  createPostController,
  updatePostController,
  deletePostController,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/posts", getAllPostsController);
router.post("/posts", createPostController);
router.put("/posts/:id", updatePostController);
router.delete("/posts/:id", deletePostController);

export default router;
