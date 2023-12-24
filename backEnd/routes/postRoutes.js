import express from "express";
import {
  getAllPostsController,
  createPostController,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/posts", getAllPostsController);
router.post("/posts", createPostController);

export default router;
