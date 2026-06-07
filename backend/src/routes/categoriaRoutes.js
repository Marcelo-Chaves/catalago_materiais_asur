import { Router } from "express";

import {
  create,
  findAll,
  findById,
  update,
  remove
} from "../controllers/categoriaController.js";

import {
  autenticarToken
} from "../middlewares/authMiddleware.js";

import {
  autorizar
} from "../middlewares/roleMiddleware.js";

const router = Router();

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Cria uma categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Informática
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */

router.post(
  "/",
  autenticarToken,
  autorizar("admin"),
  create
);

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 */

router.get(
  "/",
  autenticarToken,
  findAll
);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Busca uma categoria por ID
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria encontrada
 */

router.get(
  "/:id",
  autenticarToken,
  findById
);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Atualiza uma categoria
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada
 */

router.put(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  update
);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria removida
 */

router.delete(
  "/:id",
  autenticarToken,
  autorizar("admin"),
  remove
);

export default router;