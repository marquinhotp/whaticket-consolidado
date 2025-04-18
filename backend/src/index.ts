// backend/src/index.ts
import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import sequelize from "./config/database";
import redisClient from "./config/redis";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco de dados conectado com sucesso.");
    await redisClient.connect();
    console.log("Redis conectado com sucesso.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
  }
})();