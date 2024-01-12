import pool from "../DataBase/likeMeDB.js";

const getAllPosts = async () => {
  try {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
  } catch (error) {
    console.error("Error en la consulta", error);
    throw error;
  }
};

const createPost = async (titulo, img, descripcion, likes) => {
  const result = await pool.query(
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
    [titulo, img, descripcion, likes]
  );
  return result.rows[0];
};

const updatePost = async (id, { titulo, img, descripcion, likes }) => {
  const result = await pool.query(
    "UPDATE posts SET titulo = COALESCE($1, titulo), img = COALESCE($2, img), descripcion = COALESCE($3, descripcion), likes = COALESCE(likes, 0) + 1 WHERE id = $4 RETURNING *",
    [titulo, img, descripcion, id]
  );
  return result.rows[0];
};

const deletePost = async (id) => {
  const result = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export { getAllPosts, createPost, updatePost, deletePost };
