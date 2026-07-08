import { Router } from "express";

import {
  create,
  findAll,
  findById,
  update,
  remove,
  uploadImagem
} from "../controllers/produtoController.js";

import { upload } from "../middlewares/uploadMiddleware.js";

import {
  autenticarToken
} from "../middlewares/authMiddleware.js";

import {
  autorizar
} from "../middlewares/roleMiddleware.js";

const router = Router();


/**
 * Upload separado de imagem
 */
router.post(
  "/upload",
  autenticarToken,
  autorizar("admin"),
  upload.single("imagem"),
  uploadImagem
);


// Criar produto
router.post(
  "/",
  autenticarToken,
  autorizar("admin"),
  upload.single("imagem"),
  create
);


// Listar produtos (público)
router.get(
  "/",
  findAll
);


// Buscar produto por ID (público)
router.get(
  "/:id",
  findById
);


// Atualizar produto
router.put(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  upload.single("imagem"),
  update
);


// Excluir produto
router.delete(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  remove
);


export default router;