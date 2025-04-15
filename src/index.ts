import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import vehicleRoutes from "./routes/vehicles.routes";
import cors from "cors";

dotenv.config();

if (!process.env.DB_PASSWORD) {
  console.error("Erro: A variável DB_PASSWORD não foi encontrada no .env");
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!`);
});
