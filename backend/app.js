/**
 * ============================================================
 * app.js
 * ------------------------------------------------------------
 * Arquivo responsável pela configuração da aplicação Express.
 *
 * Responsabilidades:
 * • Configurar os middlewares globais.
 * • Registrar as rotas da API.
 * • Disponibilizar a documentação Swagger.
 * • Configurar arquivos estáticos.
 * • Definir rotas públicas e protegidas.
 * • Centralizar o tratamento de erros.
 *
 * Fluxo da aplicação:
 *
 * Cliente
 *    │
 *    ▼
 * Middlewares
 *    │
 *    ▼
 * Rotas
 *    │
 *    ▼
 * Controllers
 *    │
 *    ▼
 * Models
 *    │
 *    ▼
 * Banco de Dados
 * ============================================================
 */
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

/**
 * Cria a instância principal da aplicação Express.
 */
const app = express();

/**
 * Obtém o diretório atual da aplicação.
 *
 * Como o projeto utiliza ES Modules, __dirname não existe
 * nativamente e precisa ser recriado.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ============================================================
 * Middlewares Globais
 * ============================================================
 */

/**
 * Permite que aplicações externas consumam a API.
 */
app.use(cors());
/**
 * Converte automaticamente requisições JSON em objetos JavaScript.
 */
app.use(express.json());
/**
 * Registra todas as requisições HTTP no console.
 *
 * Exemplo:
 * GET /produtos 200
 */
app.use(morgan("dev"));
/**
 * Adiciona cabeçalhos HTTP de segurança.
 *
 * A política "cross-origin" permite que imagens hospedadas
 * em serviços externos (Supabase Storage) sejam carregadas.
 */

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin"
    }
  })
);
/* ============================================================
 * Documentação da API
 * ============================================================
 */

/**
 * Disponibiliza a documentação Swagger.
 *
 * URL:
 * http://localhost:3000/docs
 */
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);
/* ============================================================
 * Arquivos Estáticos
 * ============================================================
 */

/**
 * Disponibiliza arquivos da pasta uploads através da URL:
 *
 * /uploads/nome-do-arquivo.ext
 */
app.use(
  "/uploads",
  express.static(
    path.resolve("uploads")
  )
);
/* ============================================================
 * Rotas da Aplicação
 * ============================================================
 */

/**
 * Rotas de autenticação.
 */
app.use("/auth", authRoutes);
/**
 * Rotas de categorias.
 */
app.use("/categorias", categoriaRoutes);
/**
 * Rotas de produtos.
 */
app.use("/produtos", produtoRoutes);

/* ============================================================
 * Rotas Gerais
 * ============================================================
 */

/**
 * Rota pública utilizada para verificar se a API está online.
 */
app.get("/", (req, res) => {
  res.json({
    mensagem: "API funcionando"
  });
});
/**
 * Exemplo de rota protegida.
 *
 * O acesso somente é permitido para usuários autenticados
 * através de um token JWT válido.
 */
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
/* ============================================================
 * Tratamento Global de Erros
 * ============================================================
 */

/**
 * Middleware responsável por capturar e tratar erros
 * gerados durante o processamento das requisições.
 */
app.use(errorHandler);
/**
 * Exporta a aplicação para ser inicializada em server.js.
 */
export default app;