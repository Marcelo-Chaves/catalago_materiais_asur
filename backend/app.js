import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { errorHandler } from "./src/middlewares/errorMiddleware.js";

import authRoutes from "./src/routes/authRoutes.js";
import categoriaRoutes from "./src/routes/categoriaRoutes.js";
import produtoRoutes from "./src/routes/produtoRoutes.js";

import { specs, swaggerUi } from "./src/docs/swagger.js";
import { autenticarToken } from "./src/middlewares/authMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

// Arquivos estáticos
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// Rotas
app.use("/auth", authRoutes);
app.use("/categorias", categoriaRoutes);
app.use("/produtos", produtoRoutes);

// Rota pública
app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando"
  });
});

// Rota protegida
app.get(
  "/perfil",
  autenticarToken,
  (req, res) => {
    res.json({
      mensagem: "Acesso autorizado",
      usuario: req.usuario
    });
  }
);

// Middleware de erros
app.use(errorHandler);

export default app;