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
  try {
    const result = await pool.query(
      "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, img, descripcion, likes]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error en la consulta", error);
    throw error;
  }
};

export { getAllPosts, createPost };
