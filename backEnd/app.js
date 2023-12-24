import express from "express";
import cors from "cors";
import postsRoutes from "./routes/postRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use("/api", postsRoutes);

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto http://localhost:${PORT}`);
});
