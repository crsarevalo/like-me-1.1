import { getAllPosts, createPost } from "../models/postModels.js";

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
    console.log("hola", url);
    const newPost = await createPost(titulo, url, descripcion, likes);
    res.status(200).json(newPost);
  } catch (error) {
    console.error("Error en el controlador", error);
    res.status(500).send("Error interno del servidor");
  }
};

export { getAllPostsController, createPostController };
