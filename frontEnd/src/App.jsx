import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000/api";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    console.log("Realizando solicitud a:", urlBaseServer + "/posts");
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts]);
  };

  const agregarPost = async () => {
    if (!titulo || !imgSrc || !descripcion) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    const post = { titulo, url: imgSrc, descripcion };

    try {
      await axios.post(urlBaseServer + "/posts", post);
      console.log("Post agregado exitosamente");

      getPosts();
    } catch (error) {
      console.error("Error al agregar el post:", error);
    }
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    console.log("Post con eliminado correctamente");
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post key={i} post={post} like={like} eliminarPost={eliminarPost} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
