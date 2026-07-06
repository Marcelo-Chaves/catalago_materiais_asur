import { Router } from "express";

import {
  create,
  findAll,
  findById,
  update,
  remove,
  uploadImagem
} from "../controllers/produtoController.js";

import { upload }
from "../middlewares/uploadMiddleware.js";

import {
  autenticarToken
} from "../middlewares/authMiddleware.js";

import {
  autorizar
} from "../middlewares/roleMiddleware.js";

const router = Router();

/**
 * @swagger
 * /produtos/upload:
 *   post:
 *     summary: Upload de imagem do produto
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagem:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 */
router.post(
  "/upload",
  autenticarToken,
  autorizar("admin"),
  upload.single("imagem"),
  uploadImagem
);

// Apenas admin pode criar
router.post(
  "/",
  autenticarToken,
  autorizar("admin"),
  upload.single("imagem"),
  create
);

// Público
router.get("/", findAll);

// Público
router.get("/:id", findById);

// Apenas admin pode alterar
router.put(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  update
);

// Apenas admin pode excluir
router.delete(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  remove
);

// Apenas admin pode excluir
router.delete(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  remove
);

export default router;