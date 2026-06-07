import {
  criarCategoria,
  listarCategorias,
  buscarCategoriaPorId,
  atualizarCategoria,
  excluirCategoria
} from "../services/categoriaService.js";

import {
  categoriaSchema
} from "../validations/categoriaValidation.js";

export async function create(req, res) {
  try {

    categoriaSchema.parse(req.body);

    const {
      nome,
      descricao
    } = req.body;

    const categoria =
      await criarCategoria(
        nome,
        descricao
      );

    return res
      .status(201)
      .json(categoria);

  } catch (error) {

    return res
      .status(400)
      .json({
        erro: error.message
      });

  }
}

export async function findAll(req, res) {
  try {

    const categorias =
      await listarCategorias();

    return res.json(categorias);

  } catch (error) {

    return res
      .status(500)
      .json({
        erro: error.message
      });

  }
}

export async function findById(req, res) {
  try {

    const categoria =
      await buscarCategoriaPorId(
        req.params.id
      );

    if (!categoria) {
      return res.status(404).json({
        erro: "Categoria não encontrada"
      });
    }

    return res.json(categoria);

  } catch (error) {

    return res
      .status(500)
      .json({
        erro: error.message
      });

  }
}

export async function update(req, res) {
  try {

    categoriaSchema.parse(req.body);  

    const {
      nome,
      descricao
    } = req.body;

    const categoria =
      await atualizarCategoria(
        req.params.id,
        nome,
        descricao
      );

    return res.json(categoria);

  } catch (error) {

    return res
      .status(400)
      .json({
        erro: error.message
      });

  }
}

export async function remove(req, res) {
  try {

    await excluirCategoria(
      req.params.id
    );

    return res.json({
      mensagem:
        "Categoria removida com sucesso"
    });

  } catch (error) {

    return res
      .status(500)
      .json({
        erro: error.message
      });

  }
}