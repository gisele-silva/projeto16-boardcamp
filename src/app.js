import express from "express";
import cors from "cors";
import gamesRouter from "./routes/games.routes.js";
import clientsRouter from "./routes/clients.routes.js";
import dotenv from "dotenv"
import rentsRouter from "./routes/rents.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(gamesRouter)
app.use(clientsRouter)
app.use(rentsRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))