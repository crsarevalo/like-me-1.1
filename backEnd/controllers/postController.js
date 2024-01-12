import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} from "../models/postModels.js";

import ERRORS from "../helpers/errors.js";
import { json } from "express";

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error en el controlador", error);
    res.status(500).send("Error interno del servidor");
  }
};

const createPostController = async (req, res) => {
  const { titulo, url, descripcion, likes } = req.body;

  try {
    const newPost = await createPost(titulo, url, descripcion, likes);
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (error) {
    const specificError = ERRORS.filter((e) => e.code === error.code);
    return res
      .status(specificError[0].status)
      .json({ error: specificError[0].message });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await updatePost(id, req.body);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await deletePost(id);
    res.status(200).json({
      message: `Post con ID ${id} eliminado correctamente`,
      deletedPost,
    });
  } catch (error) {
    console.error("Error en la solicitud:", error);
  }
};
export {
  getAllPostsController,
  createPostController,
  updatePostController,
  deletePostController,
};
